const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SignUp = require('../models/SignUp');
const Transaction = require('../models/stocktransac');
const Investment = require('../models/mutualinvest');
const IPOInvestment = require('../models/ipoinvest');
const Watchlist = require('../models/Watchlist');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; // assuming you're using cookies
    console.log("Token:", token); 
    if (!token) return res.status(401).json("You're not authenticated!");
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json("Token is not valid!");
        req.user = user;
        next();
    });
};

//Sign Up
router.post('/signup', async (req, res) => {
    // console.log('Request Body:', req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new SignUp({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthdate: req.body.birthdate,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:  error.message});
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const user = await SignUp.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json('User not found!');
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password,
        );
        if (!validPassword) {
            return res.status(400).json('Wrong Password');
        }
        const accessToken = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );
        const { password, ...others } = user._doc;
        res.cookie("access_token", accessToken, { httpOnly: true, secure: false }).status(200).json(others);
    } catch (error) {
        res.status(500).json({message:  error.message});   
    } 
});

router.get('/user', verifyToken, async (req, res) => {
    console.log("User route hit");
    try {
        // Fetch user data based on the JWT payload (user ID)
        const user = await SignUp.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Return user details, excluding password
        const { password, ...userData } = user._doc;
        res.status(200).json(userData); // Sending back the user info without password
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/payment", verifyToken, async (req, res) => {
    const { stockName, quantity, price } = req.body;
    const userId = req.user.id;
  
    if (!stockName || !quantity || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    if (quantity <= 0 || price <= 0) {
      return res.status(400).json({ error: "Quantity and price must be positive numbers" });
    }

    if (isNaN(quantity) || isNaN(price)) {
      return res.status(400).json({ error: "Quantity and price must be valid numbers" });
    }

    const user = await SignUp.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const totalAmount = quantity * price;

    if (user.balance < totalAmount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }else{
      user.balance-=totalAmount;
      await user.save();
    }
    
  
    try {
      const transaction = new Transaction({ 
        userId,
        details:{
            stockName, 
            quantity, 
            totalAmount },
      });
      await transaction.save();
      res.status(200).json({ message: "Payment successful!" });
    } catch (error) {
      res.status(500).json({ error: "Payment failed, try again later." });
    }
  });

router.post("/sell", verifyToken, async (req, res) => {
    const { stockName, quantity, price } = req.body;
    const userId = req.user.id;
    if (!stockName || !quantity || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (quantity <= 0 || price <= 0) {
      return res.status(400).json({ error: "Quantity and price must be positive numbers" });
    }
    if (isNaN(quantity) || isNaN(price)) {
      return res.status(400).json({ error: "Quantity and price must be valid numbers" });
    }
    const stocks = await Transaction.find({ userId });
    const stock = stocks.find((stock) => stock.details.stockName === stockName);
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    if (stock.details.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient quantity" });
    }
    stock.details.quantity -= quantity;
    await stock.save();
    if(stock.details.quantity===0){
        await Transaction.findByIdAndDelete(stock._id);
    }

    const user = await SignUp.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const totalAmount = quantity * price;
    user.balance+=totalAmount;
    await user.save();
    res.status(200).json({ message: "Transaction successful!" });
    if (user.balance < totalAmount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
});

router.post("/investment",verifyToken, async (req, res) => {
    try {
      const {investmentType, amount, sipDay } = req.body;
      const userId = req.user.id;
  
      if (investmentType === "sip" && (!sipDay || sipDay < 1 || sipDay > 28)) {
        return res
          .status(400)
          .json({ error: "SIP day must be between 1 and 28 for SIP investments." });
      }

      if (investmentType !== "one-time" && investmentType !== "sip") {
        return res.status(400).json({ error: "Invalid investment type." });
      }
  
      if (investmentType === "one-time" && sipDay) {
        return res
          .status(400)
          .json({ error: "SIP day should not be provided for one-time investments." });
      }
  
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Amount must be a positive number." });
      }

      const user = await SignUp.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (user.balance < amount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }
      
      user.balance -= amount;
      await user.save();

      const investment = new Investment({ userId, investmentType, amount, sipDay });
      await investment.save();
  
      res.status(201).json({ message: "Investment saved successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
    });

router.get("/mutuals", verifyToken, async (req, res) => {
    try {
      const userId = req.user.id; // Use query parameters for userId
      if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
      }
      const mutuals = await Investment.find({ userId });
      res.status(200).json(mutuals);

    } catch (error) {
        console.error("Error fetching mutuals:", error);
        res.status(500).json({ message: "Error fetching mutuals", error: error.message });
    }
})

 router.post("/ipo", verifyToken, async (req, res) => {
    
    const { ipoName, quantity, pricePerQuantity, totalAmount} = req.body;
    const userId = req.user.id;
      
    if (!quantity || !pricePerQuantity || !totalAmount || !userId) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (quantity <= 0 || pricePerQuantity <= 0 || totalAmount <= 0) {
        return res.status(400).json({ error: "Quantity, price per quantity, and total amount must be positive numbers" });
    }
    
    if (isNaN(quantity) || isNaN(pricePerQuantity) || isNaN(totalAmount)) {
        return res.status(400).json({ error: "Quantity, price per quantity, and total amount must be valid numbers" });
    }
    
    const user = await SignUp.findById(userId);
    
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    
    if (user.balance < totalAmount) {
        return res.status(400).json({ error: "Insufficient balance" });
    }

    user.balance -= totalAmount;
    await user.save();
      
    try {
        const investment = new IPOInvestment({
            userId,
            details:{
                ipoName,
                quantity,
                pricePerQuantity,
                totalAmount,
                userId,
            }
        });
      
        await investment.save();
        res.status(201).json({ message: "IPO investment successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
    });

//Logout
router.get('/logout', (req, res) => {
    try {
        res.clearCookie('access_token').status(200).json('User Logged Out');
    } catch (error) {
        res.status(500).json({message:  error.message});
    }
});

// Add stock to watchlist
//Working
router.post('/watchlist/add', async (req, res) => {
    const { stockname, userId, currentPrice } = req.body;
    console.log(stockname,userId,currentPrice);
    // Log the request body for debugging
    console.log("Request body:", req.body);

    if (!stockname || !userId || currentPrice == null) {
      return res.status(400).json({ message: 'Invalid stock data' });
    }

    try {
        const userWatchlist = await Watchlist.findOne({ userId });

        if (!userWatchlist) {
            // Create a new watchlist if one doesn't exist
            const newWatchlist = new Watchlist({
                userId,
                stocks: [{ stockname, currentPrice }],
            });
            await newWatchlist.save();
        } else {
            // Check if the stock already exists
            const stockExists = userWatchlist.stocks.some(
                (stock) => stock.stockname === stockname
            );

            if (stockExists) {
                return res.status(400).json({ message: 'Stock already in watchlist' });
            }

            // Add the new stock to the stocks array
            userWatchlist.stocks.push({ stockname, currentPrice });
            await userWatchlist.save();
        }

        res.status(200).json({ message: 'Stock added to watchlist' });
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        res.status(500).json({ message: 'Error adding to watchlist', error: error.message });
    }
});




// Remove stock from watchlist
//Working
router.post('/watchlist/remove', async (req, res) => {
    const { stockname, userId } = req.body;
  
    if (!stockname || !userId) {
      return res.status(400).json({ message: 'Invalid stock data' });
    }
  
    try {
      const userWatchlist = await Watchlist.findOne({ userId });
  
      if (!userWatchlist) {
        return res.status(404).json({ message: "Watchlist not found" });
      }
  
      // Filter out the stock to be removed, but preserve other stocks
      const updatedStocks = userWatchlist.stocks.filter(
        (stock) => stock.stockname !== stockname
      );
  
      if (updatedStocks.length === userWatchlist.stocks.length) {
        return res.status(404).json({ message: "Stock not found in watchlist" });
      }

      // Only update the stocks array (without triggering full document validation)
      userWatchlist.stocks = updatedStocks;
      await userWatchlist.save({ validateModifiedOnly: true });

      res.status(200).json({ message: "Stock removed from watchlist" });
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      res.status(500).json({ message: 'Error removing from watchlist', error: error.message });
    }
});

//Show Stocks
//Working
router.get('/stocks', async (req, res) => {
    try {
        const stocks = await Transaction.find();
        res.status(200).json(stocks);
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ message: "Error fetching stocks", error: error.message });
    }
});

router.get('/findipos', async (req, res) => {
  try {
      const ipos = await IPOInvestment.find();
      res.status(200).json(ipos);
  } catch (error) {
      console.error('Error fetching stocks:', error);
      res.status(500).json({ message: "Error fetching stocks", error: error.message });
  }
});

// Fetch user's watchlist
//Working
router.get('/watchlist', async (req, res) => {
    try {
        const userId = req.query.userId; // Use query parameters for userId
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
    
        const userWatchlist = await Watchlist.findOne({ userId });
        if (!userWatchlist) {
            return res.status(404).json({ message: "Watchlist not found" });
        }
    
        res.status(200).json({ watchlist: userWatchlist.stocks });
        } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ message: "Error fetching watchlist", error: error.message });
    }
});

router.post('/deposit', verifyToken, async (req, res) => {
    const { amount } = req.body;
    try {
      // Assuming the user is authenticated and their ID is available
      const user = await SignUp.findById(req.user.id); // Use your authentication method
      if (user) {
        user.balance += amount; // Add the deposit amount to the balance
        await user.save();
        res.status(200).send({ message: 'Deposit successful', balance: user.balance });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error depositing funds' });
    }
  });
  
  // Withdraw funds
  router.post('/withdraw', verifyToken, async (req, res) => {
    const { amount } = req.body;
    try {
      const user = await SignUp.findById(req.user.id); // Use your authentication method
      if (user) {
        if (user.balance >= amount) {
          user.balance -= amount; // Deduct the withdrawal amount from the balance
          await user.save();
          res.status(200).send({ message: 'Withdrawal successful', balance: user.balance });
        } else {
          res.status(400).send({ message: 'Insufficient balance' });
        }
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error withdrawing funds' });
    }
  });
  
  // Get the current balance
  router.get('/balance', verifyToken, async (req, res) => {
    try {
      const user = await SignUp.findById(req.user.id); // Use your authentication method
      if (user) {
        res.status(200).send({ balance: user.balance });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error fetching balance' });
    }
  });


module.exports = router;