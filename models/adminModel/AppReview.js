const mongoose = require('mongoose');

const appReviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers',
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
}, { collection: 'AppReview', timestamps: true });

const AppReview = mongoose.model('AppReview', appReviewSchema);

module.exports = AppReview;
