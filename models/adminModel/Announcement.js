const mongoose = require('mongoose');
const announcementSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    astrologerId: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Astrologer', }],
        default: []
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;