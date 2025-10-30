const mongoose = require('mongoose');
const ProductOrderSchema = new mongoose.Schema({
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true }, // Reference to product
        quantity: { type: Number, required: true, min: 1 }, // Quantity of the product
        price: { type: Number, required: true }, // Price of the product at the time of adding to cart
        date: { type: Date, default: null },
        time: { type: Date, default: null },
    }],
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddressCarts"
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
        enum: ["Pending", "In-Progress", "Complete"],
        default: "Pending"
    }
}, { collection: "ProductOrder", timestamps: true });

const ProductOrder = mongoose.model('ProductOrder', ProductOrderSchema);

module.exports = ProductOrder;