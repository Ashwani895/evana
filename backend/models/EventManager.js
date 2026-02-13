const mongoose = require('mongoose');

const EventManagerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['individual', 'company'],
    required: true
  },
  bio: String,
  experience: String,
  services: [String],
  location: String,

  // These are only required if type is 'company'
  companyName: {
    type: String,
    required: function() { return this.type === 'company'; }
  },
  officeAddress: {
    type: String,
    required: function() { return this.type === 'company'; }
  },

  approved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('EventManager', EventManagerSchema);
