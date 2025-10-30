const mongoose = require('mongoose');

const religionSpiritualitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    }
}, { collection: 'ReligionSpirituality', timestamps: true });

const ReligionSpirituality = mongoose.model('ReligionSpirituality', religionSpiritualitySchema);

module.exports = ReligionSpirituality;
