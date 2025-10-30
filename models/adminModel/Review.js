const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers',
  },
  astrologer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Astrologer',
  },
  ratings: {
    type: Number,
    required: false,
    min: 1,
    max: 5 
  },
  comments: {
    type: String,
    maxlength: 500
  },
  app_ratings: {
    type: Number,
    required: false,
    min: 1,
    max: 5 
  },
  app_comments: {
    type: String,
    maxlength: 500
  },
  is_verified: {
    type: Boolean,
    default: false
  }
}, { collection: 'Review', timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
