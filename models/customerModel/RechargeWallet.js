const mongoose = require('mongoose');

const rechargeWalletSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },
    referenceId: {
        type: String,
        refPath: 'referenceModel'
    }, 
    referenceModel: {
        type: String,
        enum: ['ChatHistory', 'CallHistory', 'LiveCalls', 'Gift'],  // These are the names of the models that referenceId can refer to
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
    discount: {
        type: Number,
        default: 0
    },
    offer: {
        type: String,
        default: ''
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
        enum: ['CHAT', 'CALL', 'GIFT', 'LIVE_VEDIO_CALL',  'WALLET_RECHARGE',  "PRODUCT"],
        default: ''
    }
}, { collection: 'RechargeWallet', timestamps: true });

const RechargeWallet = mongoose.model('RechargeWallet', rechargeWalletSchema);

module.exports = RechargeWallet;