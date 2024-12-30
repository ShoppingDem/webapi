const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;