const mongoose = require('mongoose');

const deliveryPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  rating: { type: Number, default: 4.5 },
  isAvailable: { type: Boolean, default: true },
  currentOrders: { type: Number, default: 0 },
  maxOrders: { type: Number, default: 10 },
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DeliveryPartner', deliveryPartnerSchema);
