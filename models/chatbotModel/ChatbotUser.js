const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers'
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  timeOfBirth: {
    type: String,
    required: true
  },
  placeOfBirth: {
    type: String,
    required: true,
    trim: true
  },
  preferredLanguage: {
    type: String,
    enum: ['Hindi', 'English'],
    default: 'English'
  },
  userCategory: {
    type: String,
    enum: ['Job', 'Business', 'Study', 'Marriage', 'Health', 'Finance', 'Spirituality', 'Family'],
    required: true
  },
  kundliData: {
  type: Object, // you can also use Mixed for flexibility
  default: null
},

}, {
  timestamps: true,
  collection:'ChatbotUsers'
});

module.exports = mongoose.model('ChatbotUsers', UserSchema);
