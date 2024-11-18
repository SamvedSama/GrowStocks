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
  
    const totalAmount = quantity * price;
  
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

router.post("/investment",verifyToken, async (req, res) => {
    try {
      const {investmentType, amount, sipDay } = req.body;
      const userId = req.user.id;
  
      if (investmentType === "sip" && (!sipDay || sipDay < 1 || sipDay > 28)) {
        return res
          .status(400)
          .json({ error: "SIP day must be between 1 and 28 for SIP investments." });
      }
  
      const investment = new Investment({ userId, investmentType, amount, sipDay });
      await investment.save();
  
      res.status(201).json({ message: "Investment saved successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
    });

 router.post("/ipo", verifyToken, async (req, res) => {
    const { ipoName, quantity, pricePerQuantity, totalAmount} = req.body;
    const userId = req.user.id;
      
    if (!ipoName || !quantity || !pricePerQuantity || !totalAmount || !userId) {
        return res.status(400).json({ error: "All fields are required" });
    }
      
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

module.exports = router;