const mongoose = require('mongoose');

const teerthDhamSchema = new mongoose.Schema({
  title: {
        type: String,
        default: ''
  },
  bannerImage: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
},{ collection: 'TeerthDhamBanners', timestamps: true });

const TeerthDhamBanners = mongoose.model('TeerthDhamBanners', teerthDhamSchema);

module.exports = TeerthDhamBanners;

