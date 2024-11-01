const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    }catch(error){
        console.log(error);
    }
}

dotenv.config();

const app = express();

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack")
})

app.listen(process.env.PORT, () => {
    connectDB();
    console.log('Server started on port '+process.env.PORT);
});