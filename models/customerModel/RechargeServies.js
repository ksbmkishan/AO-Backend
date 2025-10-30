const mongoose = require('mongoose');

const RechargeServiceSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },
    orderId: {
        type: String,
        default: ''
    },
    appName: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0
    },
    contact: {
        type: Number,
        default: 0
    },
    customer_number: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        default: ''
    },
    fullAmount: {
        type: Number,
        default: 0
    }, 
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['Pending', 'Complete', 'Failed', 'Process'],
        default: 'Pending'
    },
    number: {
        type: Number,
        default: ''
    },
    pincode: {
        type: Number,
        default: ''
    },
    product_code: {
        type:Number,
        default: ''
    },
    serviceType: {
        type: String,
        default:''
    },
    billType: {
        type: String,
        default: '',
    },
    productName: {
        type: String,
        default:''
    },
    paymentMethod: {
        type: String,
        default:''
    },
    serviceName: {
        type: String,
        default:''
    },
    bill_fetch_ref: {
        type: String,
        default:''
    }
}, { collection: 'RechargePayment', timestamps: true });

const RechargeService = mongoose.model('RechargePayment', RechargeServiceSchema);

module.exports = RechargeService;
