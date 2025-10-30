const mongoose = require('mongoose');

const blogsCategorySchema = new mongoose.Schema(
  {
    blog_category: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, collection: 'BlogsCategory' }
);

const BlogsCategory = mongoose.model('BlogsCategory', blogsCategorySchema);

module.exports = BlogsCategory;
