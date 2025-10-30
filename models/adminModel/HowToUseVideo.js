const mongoose = require('mongoose');

const howToUseVideoSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: true,
        unique: true
      }
},{ collection: 'HowToUseVideo', timestamps: true });

const HowToUseVideo = mongoose.model('HowToUseVideo', howToUseVideoSchema);

module.exports = HowToUseVideo;
