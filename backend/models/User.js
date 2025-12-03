const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid: String,
  email: String,
  displayName: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
