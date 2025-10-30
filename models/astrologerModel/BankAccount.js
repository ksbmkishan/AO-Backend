const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  astrologer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Astrologer' // Reference to Astrologer model
  },
  accountNumber: {
    type: String,
  },
  accountHolderName: {
    type: String,
  },
  IFSCCode: {
    type: String,
  }
}, { collection: 'BankAccount', timestamps: true });

const BankAccount = mongoose.model('BankAccount', bankSchema);

module.exports = BankAccount;
