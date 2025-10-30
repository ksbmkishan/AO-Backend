const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
    panNumer: {
        type: String,
        default: ''
      },
      accountHolderName: {
        type: String,
        default: ''
      },
      accountNumber: {
        type: String,
        default: '',
      },
      ifscCode:{
        type: String,
        default: ''
      },
      accountType: {
        type: String, 
        default: ''
      },
},{ collection: 'BankAccount', timestamps: true });

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;

