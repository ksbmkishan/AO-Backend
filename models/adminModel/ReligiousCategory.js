// models/ReligiousItem.js
const mongoose = require('mongoose');

const ReligiousCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true, // Ensures the name is unique
    trim: true
  },
  image: {
    type: String,
    required: true,
  },
}, {collection: 'Religious_Category', timestamps: true});

module.exports = mongoose.model('Religious_Category', ReligiousCategorySchema);
