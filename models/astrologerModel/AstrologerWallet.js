const mongoose = require('mongoose');

const astrologerWalletSchema = new mongoose.Schema({
    astrologerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astrologer'
    },
    referenceId: { 
        type: String,
        refPath: 'referenceModel'
    },
    referenceModel: {
        type: String,
        enum: ['ChatHistory', 'CallHistory', 'LiveCalls', 'Gift']  // These are the names of the models that referenceId can refer to
    },
    invoiceId: {
        type: String,
        default: ''
    },
    gst: {
        type: Number,
        default: 0
    },
    recieptNumber: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        default: ''
    },
    transactionType: {
        type: String,
        enum: ['DEBIT', 'CREDIT']
    },
    type: {
        type: String,
        enum: ['CHAT', 'CALL', 'GIFT', 'LIVE_VEDIO_CALL', 'WALLET_DEBIT'],
        default: ''
    },
}, { collection: 'AstrologerWallet', timestamps: true });

const AstrologerWallet = mongoose.model('AstrologerWallet', astrologerWalletSchema);

module.exports = AstrologerWallet;


