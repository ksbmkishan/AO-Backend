const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true,
    unique: true // Ensures each skill name is unique
  },
  image: {
    type: String,
    required: false // Assuming the image is mandatory
  }
},{ collection: 'Skills', timestamps: true });

const Skills = mongoose.model('Skills', skillSchema);

module.exports = Skills;
