const mongoose = require('mongoose');

const PurusharthaWalletSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },
    price: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['Add','Deduct'],
        default: 'Add'
    }
}, { collection: 'PurusharthaWallet', timestamps: true });

const PurusharthaWallet = mongoose.model('PurusharthaWallet', PurusharthaWalletSchema);

module.exports = PurusharthaWallet;
