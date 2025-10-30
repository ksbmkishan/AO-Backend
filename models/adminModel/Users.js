const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String
    },
    login_type: {
        type: String,
    },
    ip_address: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    last_login: Date,
    active_status: {
        type: Boolean,
        default: true
    },
    company: String,
    gender: String,
    wallet: Number,
    permissions: {
        type: [String],
        default: []
    },
    isBlock: {
        type: Boolean,
        default: false
    }
},{ collection: 'Users', timestamps: true });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
