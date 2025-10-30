const mongoose = require('mongoose');

const AaddressCartSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
    },
    name: {
        type: String,
        
    },
    phone: {
        type: Number,
       
    },
    pincode: {
        type: Number,
       
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    house: {
        type: Number,
    },
    area: {
        type: String,
    },
    select: {
        type: String
    },
}, { collection: 'AddressCarts', timestamps: true });

const AddressCarts = mongoose.model('AddressCarts', AaddressCartSchema);

module.exports = AddressCarts;