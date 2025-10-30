const mongoose = require('mongoose');

// Cart schema
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true }, // Reference to product
    quantity: { type: Number, required: true, min: 1 }, // Quantity of the product
    price: { type: Number, required: true }, // Price of the product at the time of adding to cart
    date: {type: Date, default: null},
    time: {type: Date, default: null},
  }],
  totalAmount: { type: Number, default: 0 }, // Total cost of all items in the cart
}, { collection: 'Cart', timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
