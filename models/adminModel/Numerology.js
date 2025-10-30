const mongoose = require('mongoose');

const numerologySchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    numerology_image: {
        type: String,
        required: false,
    }
}, { collection: 'Numerology ', timestamps: true });

const Numerology  = mongoose.model('Numerology ', numerologySchema);

module.exports = Numerology ;
