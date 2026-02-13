const mongoose = require('mongoose');

const eventWorkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['photography', 'catering', 'decoration', 'other'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: [String], // Array of image URLs or paths
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('EventWork', eventWorkSchema);
