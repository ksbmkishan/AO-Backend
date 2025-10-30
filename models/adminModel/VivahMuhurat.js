const mongoose = require('mongoose');

const vivahMuhuratSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    vivahMuhurat_image: {
        type: String,
        required: false,
    }
}, { collection: 'VivahMuhurat ', timestamps: true });

const VivahMuhurat  = mongoose.model('VivahMuhurat ', vivahMuhuratSchema);

module.exports = VivahMuhurat ;
