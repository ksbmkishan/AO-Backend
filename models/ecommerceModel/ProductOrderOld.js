const mongoose = require('mongoose');
const ProductOrderSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            default: 0
        }
    }],
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
    },

    invoiceId: {
        type: String
    },
    
    amount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["INITIATED", "ACCEPTED", "REJECTED", "PACKED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"],
        default: "INITIATED"
    }
}, { collection: "ProductOrder", timestamps: true });

const ProductOrder = mongoose.model('ProductOrder', ProductOrderSchema);

module.exports = ProductOrder;