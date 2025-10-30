const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  redirectionUrl: {
        type: String,
        required: true
      },

  title: {
        type: String,
        default: ''
  },

  bannerFor: {
    type: String,
    default: 'app'
  },

  redirectTo: {
      type: String
  },
  
  bannerImage: {
    type: String,
  },
  priorityPage: {
    type: Number,
    default: 0
  },  
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
},{ collection: 'Banners', timestamps: true });

const Banners = mongoose.model('Banners', bannerSchema);

module.exports = Banners;

