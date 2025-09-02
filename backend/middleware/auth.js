// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).json({ message: 'Access token required' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
//     const user = await User.findById(decoded.userId).select('-password');
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded._id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next(); // pass control to next middleware or route
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};

module.exports = authenticateToken;
