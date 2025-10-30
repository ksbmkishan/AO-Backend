const mongoose = require('mongoose');

const rechargeOperaterSchema = new mongoose.Schema({
   city: {
      type: String
   },
   servicesType: {
      type:mongoose.Schema.Types.ObjectId,
      rfe: 'operatorService'
   },
   OperatorCode: {
      type: String,
      required: true,
      unique: true
   },
   minAmount: {
      type: Number,
      default: 0
   },
   maxAmount: {
      type: Number,
      default: 0
   },
   OperatorName: {
      type: String,
      required: true
   },
   operatorImage:{
      type: String,
   }
}, { timestamps: true })

module.exports = mongoose.model('rechargeOperater', rechargeOperaterSchema)