const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const auth = require('./routes/auth');

dotenv.config();
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
};

// Middleware - ensure express.json() is loaded before routes
app.use(express.json());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route setup after middleware
app.use("/api/auth", auth);

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack")
})

app.listen(process.env.PORT, () => {
    connectDB();
    console.log('Server started on port '+process.env.PORT);
});