const express = require('express');
const app = express();
const authenticateToken  = require('../middleware/auth');

app.get('/api/support/order/:orderId', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const supportInfo = {
      orderId: order._id,
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity
      })),
      orderStatus: order.orderStatus,
      deliveryPartner: order.deliveryPartner,
      estimatedDelivery: order.estimatedDelivery
    };

    res.json(supportInfo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});