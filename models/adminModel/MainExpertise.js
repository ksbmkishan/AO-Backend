const mongoose = require('mongoose');

const mainExpertiseSchema = new mongoose.Schema({
  mainExpertise: {
    type: String,
    required: true,
    unique: true // Ensures each mainExpertise name is unique
  }
},{ collection: 'MainExpertise', timestamps: true });

const MainExpertise = mongoose.model('MainExpertise', mainExpertiseSchema);

module.exports = MainExpertise;
