const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phoneNumber: { type: String, unique: true, sparse: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;