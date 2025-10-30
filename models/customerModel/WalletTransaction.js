const mongoose = require("mongoose");

const WalletTransactionSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customers", required: true },
    type: { type: String, enum: ["Credit", "Debit"], required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const WalletTransaction = mongoose.model('WalletTransaction', WalletTransactionSchema);

module.exports = WalletTransaction;