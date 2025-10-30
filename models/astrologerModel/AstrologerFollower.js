const mongoose = require('mongoose');

const astrologerFollowerSchema = mongoose.Schema({
    astrologerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Astrologer', required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customers' }],
}, { collection: 'AstrologerFollower', timestamps: true })

const AstrologerFollower = mongoose.model('AstrologerFollower', astrologerFollowerSchema)

module.exports = AstrologerFollower