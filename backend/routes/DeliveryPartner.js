// const express = require('express');
// const app = express();


// app.get('/api/delivery-partners', async (req, res) => {
//   try {
//     const partners = await DeliveryPartner.find({ isAvailable: true });
//     res.json(partners);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
// app.post('/api/seed/delivery-partners', async (req, res) => {
//   try {
//     const samplePartners = [
//       { name: 'Rahul Kumar', phone: '+91-9876543210', rating: 4.8 },
//       { name: 'Priya Sharma', phone: '+91-8765432109', rating: 4.9 },
//       { name: 'Amit Singh', phone: '+91-7654321098', rating: 4.7 }
//     ];

//     await DeliveryPartner.insertMany(samplePartners);
//     res.json({ message: 'Sample delivery partners added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

const express = require('express');
const router = express.Router();
const DeliveryPartner = require('../models/DeliveryPartner');
const authenticateToken = require('../middleware/auth');

// Get all delivery partners
router.get('/', async (req, res) => {
  try {
    const partners = await DeliveryPartner.find();
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create delivery partner
router.post('/', authenticateToken, async (req, res) => {
  try {
    const partner = new DeliveryPartner(req.body);
    await partner.save();
    res.status(201).json({ message: 'Delivery partner added', partner });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update delivery partner
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedPartner = await DeliveryPartner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Delivery partner updated', updatedPartner });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
