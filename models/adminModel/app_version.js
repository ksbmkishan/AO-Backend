const mongoose = require('mongoose')
const appVersionSchema = mongoose.Schema({
    versionName: {
        type: String,
        default: ''
    },
    versionCode: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0
    },
}, { collection: 'AppVersion', timestamps: true })

const UserModel = mongoose.model('AppVersion', appVersionSchema)

module.exports = UserModel