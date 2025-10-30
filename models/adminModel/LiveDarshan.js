const mongoose = require('mongoose');

const LiveDarshan = new mongoose.Schema({
    VideoLink: {
        type: String,
    },
  
    fromTimeOfArti: { 
        type: Date,
        default: null,
    },
    toTimeOfArti: { 
        type: Date,
        default: null,
    },
    TempleName: {
        type: String,
    },
    Description: {
        type: String,
    },
    image: {
        type: String,
        default: null,
    },
    priority: {
        type: Number,
        default: 0,
    }
});


const LiveDarshanLink = mongoose.model('livePuja', LiveDarshan);

module.exports = LiveDarshanLink;
