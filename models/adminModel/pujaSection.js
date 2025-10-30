const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  audio:{
    type:String,
    required:true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pujaSubcategory', 
    required: true,
  },
  description:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);
