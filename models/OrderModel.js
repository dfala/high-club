var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  quantity: { type: Number, required: true },
  purchaseAmt: { type: Number, required: true },
  shippingAddress: { type: String, required: true },

  purchaseDate: { type: Date, default: Date.now },
  refunded: { type: Boolean, default: false },
  shipped: { type: Boolean, default: false }
});

// TODO: quantity and puchaseAmt will not scale
// need to track that info per option

module.exports = mongoose.model('Order', orderSchema);
