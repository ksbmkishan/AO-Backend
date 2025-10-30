const mongoose = require("mongoose");

const WalletRequestSchema = new mongoose.Schema({
    requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "Customers", required: true },
    responderId: { type: mongoose.Schema.Types.ObjectId, ref: "Customers", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    rejectionMessage: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
});


const WalletRequest = mongoose.model('WalletRequest', WalletRequestSchema);

module.exports = WalletRequest;