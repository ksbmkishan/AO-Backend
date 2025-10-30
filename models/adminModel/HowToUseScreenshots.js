const mongoose = require('mongoose');

const howToUseScreenShotSchema = new mongoose.Schema({
      image: {
        type: String,
        required: true // Assuming the image is mandatory
      }
},{ collection: 'HowToUseScreenshots', timestamps: true });

const HowToUseScreenshots = mongoose.model('HowToUseScreenshots', howToUseScreenShotSchema);

module.exports = HowToUseScreenshots;
