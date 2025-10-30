const mongoose = require('mongoose');

const mundanMuhuratSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    mundanMuhurat_image: {
        type: String,
        required: false,
    }
}, { collection: 'MundanMuhurat ', timestamps: true });

const MundanMuhurat  = mongoose.model('MundanMuhurat ', mundanMuhuratSchema);

module.exports = MundanMuhurat ;
