const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'SignUp', required: true },
  stocks: [
    {
      stockname: { type: String, required: true },
      currentPrice: { type: Number, required: true },  // Added market price field
      addedAt: { type: Date, default: Date.now },     // Optional: Add a timestamp for when the stock was added
    },
  ],
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);
