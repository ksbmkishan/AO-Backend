const mongoose = require('mongoose');

const TranactionsSchema = mongoose.Schema({
    astrologerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Astrologer' 
    },
    status: {
        type: Number,
        default: 0 // (0=failed, 1=pending, 2=completed)
    },
    amount: {
        type: String
    },
    bank_account: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BankAccount' 
    },
    tnx_type: {
        type : number
    },
    reason : {
        type: string
    },
    file: {
        type: String
    }
}, { collection: 'Tranactions', timestamps: true });

const Tranactions = mongoose.model('Tranactions', TranactionsSchema);

module.exports = Tranactions;
