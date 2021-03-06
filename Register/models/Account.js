const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  balance: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Account = mongoose.model('account', AccountSchema);
