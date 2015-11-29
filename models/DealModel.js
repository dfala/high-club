var mongoose = require('mongoose');

var DealSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  dealType: { type:String, required: false},
  images: [{
    Location: { type: String },
    ETag: { type: String },
    imageName: { type: String },
    imageExtension: { type: String }
  }],
  isActive: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },

  expectedLaunchDate: { type: Date, required: true },
  launchDate: Date,
  finishDate: Date,
  soldQuantity: { type: Number, default: 0 }
});

module.exports = mongoose.model('Deal', DealSchema);
