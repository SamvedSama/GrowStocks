const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    investmentType: { type: String, enum: ["one-time", "sip"], required: true },
    amount: { type: Number, required: true, min: 500 },
    sipDay: { type: Number, min: 1, max: 28 }, // Only applicable for SIP
});

module.exports = mongoose.model("Investment", investmentSchema);    

