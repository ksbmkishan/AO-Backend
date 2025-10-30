const mongoose = require('mongoose');
const EcommerceOrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
    },
    cartId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        default: "AddressCarts"
    },
    amount: {
        type: Number,
        default: 0
    },
    orderId: {
        type: String,
        default: null
    }
}, { collection: "EcommerceOrder", timestamps: true });

const EcommerceOrder = mongoose.model('EcommerceOrder', EcommerceOrderSchema);

module.exports = EcommerceOrder;