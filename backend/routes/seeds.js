// const express = require('express');
// const app = express();


// app.post('/api/seed/products', async (req, res) => {
//   try {
//     const sampleProducts = [
//       { name: 'Wireless Headphones', price: 2999, category: 'Electronics', stock: 50 },
//       { name: 'Cotton T-Shirt', price: 799, category: 'Fashion', stock: 100 },
//       { name: 'Coffee Mug', price: 299, category: 'Home', stock: 75 },
//       { name: 'Smartphone', price: 15999, category: 'Electronics', stock: 25 },
//       { name: 'Sneakers', price: 3499, category: 'Fashion', stock: 40 },
//       { name: 'Book', price: 499, category: 'Books', stock: 60 }
//     ];

//     await Product.insertMany(sampleProducts);
//     res.json({ message: 'Sample products added successfully' });
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
const Product = require('../models/Product');
const Discount = require('../models/discount');
const DeliveryPartner = require('../models/DeliveryPartner');
const authenticateToken = require('../middleware/auth');

// Seed some products
router.post('/products', authenticateToken, async (req, res) => {
  try {
    const products = await Product.insertMany(req.body.products);
    res.json({ message: 'Products seeded', products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Seed discounts
router.post('/discounts', authenticateToken, async (req, res) => {
  try {
    const discounts = await Discount.insertMany(req.body.discounts);
    res.json({ message: 'Discounts seeded', discounts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Seed delivery partners
router.post('/delivery-partners', authenticateToken, async (req, res) => {
  try {
    const partners = await DeliveryPartner.insertMany(req.body.partners);
    res.json({ message: 'Delivery partners seeded', partners });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
