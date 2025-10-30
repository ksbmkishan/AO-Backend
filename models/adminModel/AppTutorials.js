const mongoose = require('mongoose');

const appTutorialsSchema = new mongoose.Schema({
    image: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['Video', 'Photo'],
        default: 'Photo'
    },
    description: {
        type: String,
        default: ''
    }
}, { collection: 'AppTutorials', timestamps: true });

const AppTutorials = mongoose.model('AppTutorials', appTutorialsSchema);

module.exports = AppTutorials;
