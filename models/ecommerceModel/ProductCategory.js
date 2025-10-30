const mongoose = require('mongoose');
const ProductCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        default: ""
    },
    image: { 
        type: String,
        default: ""
    },
}, { collection: "ProductCategory", timestamps: true });

const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);

module.exports = ProductCategory;