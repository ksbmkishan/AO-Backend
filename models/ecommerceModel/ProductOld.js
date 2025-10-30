const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
    },
    productName: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ""
    },
    bannerImages: {
        type: [String],
        default: null
    },
    mrp: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    purchasePrice: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    inventory: {
        type: Number,
        default: 0
    },
    expiryDate: {
        type: Date,
        default: null
    },
    manufactureDate: {
        type: Date,
        default: null
    },
    refundRequetDay: {
        type: Number,
        default: 0
    }
},
    { collection: "Product", timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;