const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const CustomersTransaction = mongoose.model('CustomersTransaction', paymentSchema);

module.exports = CustomersTransaction;