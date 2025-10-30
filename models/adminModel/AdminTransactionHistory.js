const mongoose = require("mongoose");

const astrologerTransactionSchema = mongoose.Schema(
  {
    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
      // required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { _id: false } // Disable creating an _id for each subdocument
);

const adminTransactionSchema = mongoose.Schema(
  {
    transactions: [astrologerTransactionSchema], // Array of subdocuments
    type: {
      type: String, // offline, online, busy
      enum: ['deduct', 'credit'],
      required: true,
    },
  },
  { collection: "AdminTransactionHistory", timestamps: true }
);

const AdminTransaction = mongoose.model("AdminTransactionHistory", adminTransactionSchema);

module.exports = AdminTransaction;
