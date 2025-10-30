const mongoose = require('mongoose');

const phonepeWalletSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },
    orderId: {
        type: String,
        default: ''
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
}, { collection: 'PhonepeWallet', timestamps: true });

const PhonepeWallet = mongoose.model('PhonepeWallet', phonepeWalletSchema);

module.exports = PhonepeWallet;