const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  astrologer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Astrologer' // Reference to Astrologer model
  },
  description: String,
}, { collection: 'Message', timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
