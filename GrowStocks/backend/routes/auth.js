const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SignUp = require('../models/SignUp');

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
        res.cookie("access_token", accessToken).status(200).json({others});
    } catch (error) {
        res.status(500).json({message:  error.message});   
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

module.exports = router;