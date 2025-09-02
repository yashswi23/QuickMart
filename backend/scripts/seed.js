const mongoose = require('mongoose');
require('dotenv').config();

// Import your models (you'll need to create separate model files)
const Product = require('../models/Product');
const Discount = require('../models/discount');
const DeliveryPartner = require('../models/DeliveryPartner');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Product.deleteMany({});
    await Discount.deleteMany({});
    await DeliveryPartner.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Seed Products
    const products = [
  {
    name: "Fresh Bananas (1 kg)",
    description: "Sweet and ripe bananas, perfect for snacking",
    price: 60,
    category: "Fruits & Vegetables",
    stock: 100,
    image: "https://www.dole.com/sites/default/files/media/bananen-richtig-lagern.jpg"
  },
  {
    name: "Organic Whole Milk (1L)",
    description: "Fresh organic whole milk, farm-fresh taste",
    price: 65,
    category: "Dairy",
    stock: 80,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBvEFHJ20pd2zlwkbYUFQtYXGcOq45S0f2rA&s"
  },
  {
    name: "Brown Bread (400g)",
    description: "Healthy whole wheat brown bread loaf",
    price: 40,
    category: "Bakery",
    stock: 50,
    image: "https://laamericanagourmet.com/cdn/shop/articles/brown_bread_blog.jpg?v=1684495303"
  },
  {
    name: "Fresh Tomatoes (1 kg)",
    description: "Juicy and fresh tomatoes, perfect for cooking",
    price: 45,
    category: "Fruits & Vegetables",
    stock: 90,
    image: "https://media.istockphoto.com/id/1159189277/photo/fresh-tomatoes-isolated-on-wooden-background-harvesting-tomatoes-tomato-with-droplets-of-water.jpg?s=612x612&w=0&k=20&c=aSMuh8GwY_7cr9FFdCis5nw4lgOM8QPzmCmHEw6fAL0="
  },
  {
    name: "Eggs (12 pcs)",
    description: "Farm fresh eggs, rich in protein",
    price: 70,
    category: "Dairy",
    stock: 200,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhp2P3AcfawriWn7Lxj3eFcemSXBGXin9hQ&s"
  },
  {
    name: "Basmati Rice (5 kg)",
    description: "Aromatic basmati rice with long grains",
    price: 450,
    category: "Staples",
    stock: 40,
    image: "https://m.media-amazon.com/images/I/71xqTSRdbML._UF894,1000_QL80_.jpg"
  },
  {
    name: "Toor Dal (1 kg)",
    description: "High-quality pigeon peas for dals and curries",
    price: 110,
    category: "Staples",
    stock: 60,
    image: "https://5.imimg.com/data5/SELLER/Default/2024/1/378483414/PJ/NV/WF/5854474/yellow-toor-dal-500x500.jpg"
  },
  {
    name: "Olive Oil (1L)",
    description: "Pure extra virgin olive oil, healthy cooking",
    price: 500,
    category: "Cooking Oils",
    stock: 30,
    image: "https://www.tatasimplybetter.com/cdn/shop/files/DSC09606_2048x.jpg?v=1734608321"
  },
  {
    name: "Salt (1 kg)",
    description: "Fine iodized salt for everyday use",
    price: 25,
    category: "Staples",
    stock: 100,
    image: "https://m.media-amazon.com/images/I/614mm2hYHyL.jpg"
  },
  {
    name: "Sugar (1 kg)",
    description: "Pure white refined sugar",
    price: 45,
    category: "Staples",
    stock: 120,
    image: "https://vrmshoppe.com/wp-content/uploads/2021/05/white-sugar-500x500-1.jpg"
  }
];

    
    await Product.insertMany(products);
    console.log('Products seeded');
    
    // Seed Discounts
    const discounts = [
      {
        code: 'SAVE10',
        type: 'percentage',
        value: 10,
        minOrderValue: 1000,
        maxDiscount: 500,
        usageLimit: 100
      },
      {
        code: 'SAVE20',
        type: 'percentage',
        value: 20,
        minOrderValue: 2000,
        maxDiscount: 1000,
        usageLimit: 50
      },
      {
        code: 'FLAT100',
        type: 'flat',
        value: 100,
        minOrderValue: 500,
        usageLimit: 200
      },
      {
        code: 'WELCOME',
        type: 'percentage',
        value: 15,
        minOrderValue: 750,
        maxDiscount: 300,
        usageLimit: 1000
      }
    ];
    
    await Discount.insertMany(discounts);
    console.log('Discounts seeded');
    
    // Seed Delivery Partners
    const deliveryPartners = [
      {
        name: 'Rahul Kumar',
        phone: '+91-9876543210',
        email: 'rahul@delivery.com',
        rating: 4.8,
        maxOrders: 10
      },
      {
        name: 'Priya Sharma',
        phone: '+91-8765432109',
        email: 'priya@delivery.com',
        rating: 4.9,
        maxOrders: 12
      },
      {
        name: 'Amit Singh',
        phone: '+91-7654321098',
        email: 'amit@delivery.com',
        rating: 4.7,
        maxOrders: 8
      },
      {
        name: 'Sneha Patel',
        phone: '+91-7654321087',
        email: 'sneha@delivery.com',
        rating: 4.6,
        maxOrders: 15
      },
      {
        name: 'Vikash Gupta',
        phone: '+91-8765432198',
        email: 'vikash@delivery.com',
        rating: 4.8,
        maxOrders: 9
      }
    ];
    
    await DeliveryPartner.insertMany(deliveryPartners);
    console.log('Delivery partners seeded');
    
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();