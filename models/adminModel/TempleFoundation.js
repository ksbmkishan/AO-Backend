const mongoose = require('mongoose');

const templeFoundationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true 
  },
  image: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    default:''
  },
  rating: {
    type: Number,
    default: 5
  }
}, { collection: 'TempleFoundation', timestamps: true });

const TempleFoundation = mongoose.model('TempleFoundation', templeFoundationSchema);

module.exports = TempleFoundation;
