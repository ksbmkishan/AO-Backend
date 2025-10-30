const mongoose = require('mongoose');

const RechargeHistory = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        required: true
    },
    number: {
        type: String,
        default: ''
    },
    mobile: {
        type:Number,
        default: ''
    },
    operator_reference: {
        type: String,
        default: ''
    },  
    operatorId:{
        type: String,
        default: ''
    },
    productName: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0
    },
    razorpayOrderId: {
        type: String,
        default: ''
    },
    rechargeOrderId: {
        type: String,
        default: ''
    },
    transactionId: {
        type: String,
        default: ''
    },
    request_id: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['SUCCESS', 'PENDING', 'FAILURE', 'REFUND','CANCEL'],
        default: 'SUCCESS'
    },
    billType: {
        type: String,
        enum: ['FASTAG', 'ELECTRICITY', 'MOBILE RECHARGE', 'GAS', 'DTH', 'METRO CARD']
    },
    refund: {
        type: String,  // Non || Requested || Done || Pending
        enum: ['NONE', 'REQUESTED', 'DONE', 'PENDING'],
        default: 'NONE'
    },
    message: {
        type: String,
        default: ''
    }
}, { timestamps: true })

module.exports = mongoose.model('rechargeData', RechargeHistory)
