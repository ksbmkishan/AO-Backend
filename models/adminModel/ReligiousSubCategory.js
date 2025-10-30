// models/ReligiousItem.js
const mongoose = require('mongoose');

const ReligiousSubCategorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Religious_Category'
  },

  subCategoryName:{
    type: String,
    unique: true,
    default:''
  },

  image: {
    type: String,
    required: true,
  },

  description:{
    type: String,
    default: ''
  },

  link:{
    type: String,
    default: ''
  }
}, {collection: 'Religious_SubCategory', timestamps: true});

module.exports = mongoose.model('Religious_SubCategory', ReligiousSubCategorySchema);
