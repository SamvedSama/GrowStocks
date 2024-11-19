const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    details:{
        stockName: String,
        quantity: Number,
        totalAmount: Number,
        unrealizedpandl: { type: Number, default:0},
        date: { type: Date, default: Date.now }
    },
  });
  
module.exports = mongoose.model("Transaction", TransactionSchema);