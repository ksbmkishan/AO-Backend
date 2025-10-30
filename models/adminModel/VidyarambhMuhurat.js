const mongoose = require('mongoose');

const vidyarambhMuhuratSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    vidyarambhMuhurat_image: {
        type: String,
        required: false,
    }
}, { collection: 'VidyarambhMuhurat ', timestamps: true });

const VidyarambhMuhurat  = mongoose.model('VidyarambhMuhurat ', vidyarambhMuhuratSchema);

module.exports = VidyarambhMuhurat ;
