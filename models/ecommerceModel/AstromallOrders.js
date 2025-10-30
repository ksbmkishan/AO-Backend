const mongoose = require('mongoose');

const AstromallOrdersSchema = new mongoose.Schema({
    poojaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pooja",
    },
    astrologerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Astrologer",
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
    },
    price: {
        type: Number,
        default: null
    },
    poojaDate: {
        type: Date,
        default: null,
    },
    poojaTime: {
        type: Date,
        default: null,
    },
    images: {
        type: [String],
        default: []
    },
    videos: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['REQUESTED', 'ACCEPTED', "REJECTED", "BOOKED", "COMPLETED", "EXPIRED"],
        default: 'REQUESTED'
    },
    
    mode: {
        type: String,
        enum:['online', 'offline'],
        default:'offline'
    }
}, { collection: 'AstromallOrders', timestamps: true });

const AstromallOrders = mongoose.model('AstromallOrders', AstromallOrdersSchema);

module.exports = AstromallOrders;
