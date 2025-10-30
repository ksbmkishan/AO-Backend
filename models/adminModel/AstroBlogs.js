const mongoose = require('mongoose');

const astroBlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    images: { 
        type: [String],
         default: [] }, 
    blogCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogsCategory'
    },
    created_by: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    description_hi: {
        type: String
    }
}, { timestamps: true }); // Place the timestamps option correctly

const AstroBlogs = mongoose.model('AstroBlogs', astroBlogSchema);

module.exports = AstroBlogs;