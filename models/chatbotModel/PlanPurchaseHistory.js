const mongoose = require('mongoose')

const purchaseHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  chatBotUserId: { type: mongoose.Schema.Types.ObjectId, ref:'chatBotUsers'},
  messagesPurchased: { type: Number, required: true },
  amountSpent: { type: Number, required: true },
  purchasedAt: { type: Date, default: Date.now }
}, {collection: 'ChatPlanPurchaseHistory'});


module.exports = mongoose.model('ChatPlanPurchaseHistory', purchaseHistorySchema);
