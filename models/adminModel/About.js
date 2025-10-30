const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  description: {
    type: String,
    maxlength: 5000
  }
},{ collection: 'AboutUs', timestamps: true });

const AboutUs = mongoose.model('AboutUs', aboutSchema);

module.exports = AboutUs;
