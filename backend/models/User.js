const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    default: 'client'  // can be 'client', 'eventManager', or 'admin'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
