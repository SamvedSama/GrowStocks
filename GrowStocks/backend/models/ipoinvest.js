const mongoose = require("mongoose");

const ipoInvestmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  details:{
    ipoName: { type: String, required: true },
    quantity: { type: Number, required: true },
    pricePerQuantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  }
});

module.exports = mongoose.model("IPOInvestment", ipoInvestmentSchema);