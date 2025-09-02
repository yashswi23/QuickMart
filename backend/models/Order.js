const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalAmount: { type: Number, required: true },
  discountApplied: { type: Number, default: 0 },
  discountCode: String,
  paymentMethod: { type: String, enum: ['razorpay', 'cod'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentId: String,
  razorpayOrderId: String,
  orderStatus: { 
    type: String, 
    enum: ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'], 
    default: 'placed' 
  },
  deliveryPartner: {
    id: String,
    name: String,
    phone: String,
    rating: Number
  },
  trackingSteps: [{
    status: String,
    timestamp: Date,
    completed: Boolean
  }],
  estimatedDelivery: Date,
  actualDelivery: Date,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
