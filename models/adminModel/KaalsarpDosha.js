const mongoose = require('mongoose');

const kaalsarpDoshaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    kaalsarpDosha_image: {
        type: String,
        required: false,
    }
}, { collection: 'KaalsarpDosha ', timestamps: true });

const KaalsarpDosha  = mongoose.model('KaalsarpDosha ', kaalsarpDoshaSchema);

module.exports = KaalsarpDosha ;
