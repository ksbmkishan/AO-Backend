const { required } = require('joi');
const mongoose = require('mongoose');

const astrologerWithdrawRequest = new mongoose.Schema({
    astrologerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astrologer'
    },

    amount:{
        type: Number,
        required: true,
    },

    status:{
        type: String,
        enum:['pending', 'approved'],
        default: 'pending'
    }
    
}, { collection: 'AstrologerWithdrawRequest', timestamps: true });

const AstrologerWallet = mongoose.model('AstrologerWithdrawRequest', astrologerWithdrawRequest);

module.exports = AstrologerWallet;


