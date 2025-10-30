const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  gift: {
    type: String,
    required: true,
    unique: true 
  },
  giftIcon: {
    type: String,
    required: true 
  },
  amount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount <= 200;
      },
      message: 'Description must contain at most 200 words.'
    }
  }
},{ collection: 'Gift', timestamps: true });

const Gift = mongoose.model('Gift', giftSchema);

module.exports = Gift;
