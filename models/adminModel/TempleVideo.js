const mongoose = require('mongoose');

const TempleVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video: [
      {
        type: String, 
        required: false, 
      },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TempleVideo', TempleVideoSchema);
