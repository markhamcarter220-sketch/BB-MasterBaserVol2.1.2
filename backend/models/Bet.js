const mongoose = require('mongoose');

const BetSchema = new mongoose.Schema({
  userId: String,
  stake: Number,
  odds: Number,
  note: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bet', BetSchema);
