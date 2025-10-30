const mongoose = require('mongoose');

const solarEclipseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    solarEclipse_image: {
        type: String,
        required: false,
    }
}, { collection: 'SolarEclipse  ', timestamps: true });

const SolarEclipse   = mongoose.model('SolarEclipse  ', solarEclipseSchema);

module.exports = SolarEclipse  ;
