const mongoose = require('mongoose');

const grihaPraveshMuhuratSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    grihaPraveshMuhurat_image: {
        type: String,
        required: false,
    }
}, { collection: 'GrihaPraveshMuhurat ', timestamps: true });

const GrihaPraveshMuhurat  = mongoose.model('GrihaPraveshMuhurat ', grihaPraveshMuhuratSchema);

module.exports = GrihaPraveshMuhurat ;
