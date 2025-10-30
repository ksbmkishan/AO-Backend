const mongoose = require('mongoose');

const aartiSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  audio: {
    type: String,
    default: '',
  },
  video: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: ''
  }
},{ collection: 'Aarti', timestamps: true });

const AartiNotification = mongoose.model('Aarti', aartiSchema);

module.exports = AartiNotification;
