const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['percentage', 'flat'], required: true },
  value: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  maxDiscount: Number,
  isActive: { type: Boolean, default: true },
  expiryDate: Date,
  usageLimit: Number,
  usedCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Discount', discountSchema);
