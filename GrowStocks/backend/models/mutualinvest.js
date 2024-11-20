const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    mutualName: { type: String, required: true },
    investmentType: { type: String, enum: ["one-time", "sip"], required: true },
    amount: { type: Number, required: true,},
    sipDay: { type: Number, default: 1, min: 1, max: 28 }, // Only applicable for SIP
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Investment", investmentSchema);  

