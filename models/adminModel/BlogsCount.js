const mongoose = require('mongoose');
const Customers = require('../customerModel/Customers');
const AstroBlogs = require('../adminModel/AstroBlogs');

const blogsCountSchema = new mongoose.Schema({
    blog_id: 
    { type: mongoose.Schema.Types.ObjectId, 
        ref: 'AstroBlogs',
        required: true },

    user_ids: 
    [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customers', required: true }]

}, { timestamps: true }); // Place the timestamps option correctly

const BlogsCount = mongoose.model('BlogsCount', blogsCountSchema);

module.exports = BlogsCount;