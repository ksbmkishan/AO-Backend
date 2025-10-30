const mongoose = require('mongoose');

const expertiseSchema = new mongoose.Schema({
  expertise: {
    type: String,
    required: false,
    unique: true
  }
}, { collection: 'Expertise', timestamps: true });

const Expertise = mongoose.model('Expertise', expertiseSchema);

module.exports = Expertise;
