const mongoose = require('mongoose');

const Darshan = new mongoose.Schema({
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
});

module.exports = mongoose.model('livePuja', Darshan);
