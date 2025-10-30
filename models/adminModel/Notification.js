const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'default_image_url_if_needed',
  },
  astrologerIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Astrologer',
  }],
  customerIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers',
  }],
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
