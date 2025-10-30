const mongoose = require('mongoose');

const TempleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: [
      {
        type: String, 
        required: false, 
      },
  ],
  description:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TempSubSection', TempleSchema);
