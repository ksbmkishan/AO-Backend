const mongoose = require('mongoose');

const birhatHoroscopeSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    }
}, { collection: 'BirhatHoroscope', timestamps: true });

const BirhatHoroscope = mongoose.model('BirhatHoroscope', birhatHoroscopeSchema);

module.exports = BirhatHoroscope;
