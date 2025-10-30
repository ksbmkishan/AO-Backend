const mongoose = require('mongoose');

const DivyaWalletSchema = new mongoose.Schema({
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
    type: {
        type:String,
        default: 'mandir',
        enum: ['mandir', 'vr']
    },
    status: {
        type: String,
        enum: ['Add','Deduct'],
        default: 'Add'
    }
}, { collection: 'DivyaWallet', timestamps: true });

const DivyaWallet = mongoose.model('DivyaWallet', DivyaWalletSchema);

module.exports = DivyaWallet;
