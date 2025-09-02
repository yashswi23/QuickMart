// const express = require('express');
// const app = express();
// const authenticateToken  = require('../middleware/auth');

// app.post('/api/orders', authenticateToken, async (req, res) => {
//   try {
//     const { items, totalAmount, discountApplied, discountCode, paymentMethod, shippingAddress } = req.body;

//     // Validate minimum order value
//     if (totalAmount < 500) {
//       return res.status(400).json({ message: 'Minimum order value is ₹500' });
//     }

//     // Get available delivery partner
//     const availablePartner = await DeliveryPartner.findOne({
//       isAvailable: true,
//       currentOrders: { $lt: 10 }
//     });

//     if (!availablePartner) {
//       return res.status(400).json({ message: 'No delivery partners available' });
//     }

//     // Create tracking steps
//     const trackingSteps = [
//       { status: 'Order Placed', timestamp: new Date(), completed: true },
//       { status: 'Order Confirmed', timestamp: new Date(Date.now() + 30 * 60 * 1000), completed: false },
//       { status: 'Shipped', timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000), completed: false },
//       { status: 'Out for Delivery', timestamp: new Date(Date.now() + 48 * 60 * 60 * 1000), completed: false },
//       { status: 'Delivered', timestamp: new Date(Date.now() + 50 * 60 * 60 * 1000), completed: false }
//     ];

//     // Create order
//     const order = new Order({
//       userId: req.user._id,
//       items,
//       totalAmount,
//       discountApplied: discountApplied || 0,
//       discountCode: discountCode || null,
//       paymentMethod,
//       deliveryPartner: {
//         id: availablePartner._id,
//         name: availablePartner.name,
//         phone: availablePartner.phone,
//         rating: availablePartner.rating
//       },
//       trackingSteps,
//       estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
//       shippingAddress
//     });

//     // Handle payment based on method
//     if (paymentMethod === 'razorpay') {
//       try {
//         const razorpayOrder = await razorpay.orders.create({
//           amount: totalAmount * 100, // Amount in paise
//           currency: 'INR',
//           receipt: `order_${order._id}`,
//         });
        
//         order.razorpayOrderId = razorpayOrder.id;
//       } catch (razorpayError) {
//         return res.status(500).json({ message: 'Payment gateway error', error: razorpayError.message });
//       }
//     } else if (paymentMethod === 'cod') {
//       order.paymentStatus = 'pending';
//     }

//     await order.save();

//     // Update delivery partner
//     availablePartner.currentOrders += 1;
//     await availablePartner.save();

//     // Update discount usage
//     if (discountCode) {
//       await Discount.findOneAndUpdate(
//         { code: discountCode.toUpperCase() },
//         { $inc: { usedCount: 1 } }
//       );
//     }

//     res.status(201).json({
//       message: 'Order created successfully',
//       order: {
//         id: order._id,
//         totalAmount: order.totalAmount,
//         paymentMethod: order.paymentMethod,
//         razorpayOrderId: order.razorpayOrderId,
//         deliveryPartner: order.deliveryPartner,
//         estimatedDelivery: order.estimatedDelivery,
//         trackingSteps: order.trackingSteps
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
// app.get('/api/orders', authenticateToken, async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.user._id })
//       .populate('items.productId')
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// app.get('/api/orders/:id', authenticateToken, async (req, res) => {
//   try {
//     const order = await Order.findOne({ 
//       _id: req.params.id, 
//       userId: req.user._id 
//     }).populate('items.productId');

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
// app.post('/api/payments/verify', authenticateToken, async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

//     // Verify payment signature
//     const crypto = require('crypto');
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + '|' + razorpay_payment_id)
//       .digest('hex');

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: 'Invalid payment signature' });
//     }

//     // Update order payment status
//     const order = await Order.findByIdAndUpdate(
//       order_id,
//       {
//         paymentStatus: 'completed',
//         paymentId: razorpay_payment_id,
//         'trackingSteps.1.completed': true,
//         'trackingSteps.1.timestamp': new Date()
//       },
//       { new: true }
//     );

//     res.json({ message: 'Payment verified successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
// app.put('/api/orders/:id/status', authenticateToken, async (req, res) => {
//   try {
//     const { status } = req.body;
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     order.orderStatus = status;
//     order.updatedAt = new Date();

//     // Update tracking steps based on status
//     const statusIndex = {
//       'confirmed': 1,
//       'shipped': 2,
//       'out_for_delivery': 3,
//       'delivered': 4
//     };

//     if (statusIndex[status] !== undefined) {
//       order.trackingSteps[statusIndex[status]].completed = true;
//       order.trackingSteps[statusIndex[status]].timestamp = new Date();

//       if (status === 'delivered') {
//         order.actualDelivery = new Date();
//         // Decrease delivery partner's current orders
//         await DeliveryPartner.findByIdAndUpdate(
//           order.deliveryPartner.id,
//           { $inc: { currentOrders: -1 } }
//         );
//       }
//     }

//     await order.save();
//     res.json({ message: 'Order status updated successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// routes/orders.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Order = require('../models/Order');
const DeliveryPartner = require('../models/DeliveryPartner');
const Discount = require('../models/discount');

// Create a new order
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { items, totalAmount, discountApplied, discountCode, paymentMethod, shippingAddress } = req.body;

    if (totalAmount < 500) {
      return res.status(400).json({ message: 'Minimum order value is ₹500' });
    }

    // Find available delivery partner
    const availablePartner = await DeliveryPartner.findOne({
      isAvailable: true,
      currentOrders: { $lt: 10 }
    });

    if (!availablePartner) {
      return res.status(400).json({ message: 'No delivery partners available' });
    }

    // Tracking steps
    const trackingSteps = [
      { status: 'Order Placed', timestamp: new Date(), completed: true },
      { status: 'Order Confirmed', timestamp: new Date(Date.now() + 30 * 60 * 1000), completed: false },
      { status: 'Shipped', timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000), completed: false },
      { status: 'Out for Delivery', timestamp: new Date(Date.now() + 48 * 60 * 60 * 1000), completed: false },
      { status: 'Delivered', timestamp: new Date(Date.now() + 50 * 60 * 60 * 1000), completed: false }
    ];

    // Create order
    const order = new Order({
      userId: req.user._id,
      items,
      totalAmount,
      discountApplied: discountApplied || 0,
      discountCode: discountCode || null,
      paymentMethod,
      deliveryPartner: {
        id: availablePartner._id,
        name: availablePartner.name,
        phone: availablePartner.phone,
        rating: availablePartner.rating
      },
      trackingSteps,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
      shippingAddress,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'unpaid'
    });

    await order.save();

    // Update delivery partner current orders
    availablePartner.currentOrders += 1;
    await availablePartner.save();

    // Update discount usage
    if (discountCode) {
      await Discount.findOneAndUpdate(
        { code: discountCode.toUpperCase() },
        { $inc: { usedCount: 1 } }
      );
    }

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (err) {
    next(err);
  }
});

// Get all orders for logged-in user
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// Get single order by ID
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user._id })
      .populate('items.productId');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (err) {
    next(err);
  }
});

// Update order status (e.g., confirmed, shipped, delivered)
router.put('/:id/status', authenticateToken, async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.orderStatus = status;
    order.updatedAt = new Date();

    const statusIndex = {
      'confirmed': 1,
      'shipped': 2,
      'out_for_delivery': 3,
      'delivered': 4
    };

    if (statusIndex[status] !== undefined) {
      order.trackingSteps[statusIndex[status]].completed = true;
      order.trackingSteps[statusIndex[status]].timestamp = new Date();

      if (status === 'delivered') {
        order.actualDelivery = new Date();
        await DeliveryPartner.findByIdAndUpdate(order.deliveryPartner.id, { $inc: { currentOrders: -1 } });
      }
    }

    await order.save();
    res.json({ message: 'Order status updated successfully', order });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

