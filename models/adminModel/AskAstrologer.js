const mongoose = require('mongoose');

const askAstrologerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true 
  }
},{ collection: 'AskAstrologer', timestamps: true });

const AskAstrologer = mongoose.model('AskAstrologer', askAstrologerSchema);

module.exports = AskAstrologer;
