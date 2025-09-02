const express = require('express');
const router = express.Router();
const Discount = require('../models/discount');
const authenticateToken = require('../middleware/auth');

// Get all discounts
router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create discount (admin)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json({ message: 'Discount created', discount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Validate discount code
router.get('/validate/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const orderValue = parseFloat(req.query.orderValue || 0);

    const discount = await Discount.findOne({ code: code.toUpperCase() });

    if (!discount) {
      return res.status(404).json({ message: 'Discount code not found' });
    }

    if (orderValue < discount.minOrderValue) {
      return res.status(400).json({ message: `Minimum order value for this discount is ₹${discount.minOrderValue}` });
    }

    res.json({ amount: discount.amount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
