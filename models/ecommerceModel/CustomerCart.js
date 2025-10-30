const mongoose = require('mongoose');
const CustoemrCartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
    },
    quantity: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
        enum: ["IN_STOCK", "OUT_OF_STOCK"],
        default: "IN_STOCK"
    }
}, { collection: "CustoemrCart", timestamps: true });

const CustoemrCart = mongoose.model('CustoemrCart', CustoemrCartSchema);

module.exports = CustoemrCart;