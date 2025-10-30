const mongoose = require('mongoose');

const termsAndconditionSchema = new mongoose.Schema({
  description: {
    type: String,
    maxlength: 5000
  },

  type: {
    type: String,
    enum: ['Customer', 'Astrologer'],
    required: true
  }
},{ collection: 'TandC', timestamps: true });

const TandC = mongoose.model('TandC', termsAndconditionSchema);

module.exports = TandC;
