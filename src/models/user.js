const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;