const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,    
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("SignUp", SignUpSchema);