const mongoose = require('mongoose');
const EcommerceCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        default: ""
    },
    image: { 
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
     description_hi: {
        type: String,
        default: ""
    },
}, { collection: "EcommerceCategory", timestamps: true });

const EcommerceCategory = mongoose.model('EcommerceCategory', EcommerceCategorySchema);

module.exports = EcommerceCategory;