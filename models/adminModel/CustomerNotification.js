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
  customerIds: [{
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    notificationRead: {
      type: Boolean,
      default: false,
    },
  }],
  sentAt: {
    type: Date,
    default: Date.now,
  },
}, {timestamps: true});

const CustomerNotification = mongoose.model('CustomerNotification', notificationSchema);

module.exports = CustomerNotification;
