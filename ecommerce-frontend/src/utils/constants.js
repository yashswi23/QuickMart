export const ORDER_STATUS = {
  PLACED: 'placed',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const PAYMENT_METHODS = {
  RAZORPAY: 'razorpay',
  COD: 'cod',
};

export const DISCOUNT_TYPES = {
  PERCENTAGE: 'percentage',
  FLAT: 'flat',
};

export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home',
  'Books',
  'Sports',
  'Beauty',
  'Grocery',
];

// utils/helpers.js - Helper functions
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateDiscount = (orderValue, discountCode) => {
  const discounts = {
    SAVE10: { type: 'percentage', value: 10, minOrder: 1000 },
    SAVE20: { type: 'percentage', value: 20, minOrder: 2000 },
    FLAT100: { type: 'flat', value: 100, minOrder: 500 },
    WELCOME: { type: 'percentage', value: 15, minOrder: 750, maxDiscount: 300 },
  };

  const discount = discounts[discountCode];
  if (!discount || orderValue < discount.minOrder) {
    return 0;
  }

  let discountAmount = 0;
  if (discount.type === 'percentage') {
    discountAmount = (orderValue * discount.value) / 100;
    if (discount.maxDiscount && discountAmount > discount.maxDiscount) {
      discountAmount = discount.maxDiscount;
    }
  } else {
    discountAmount = discount.value;
  }

  return Math.min(discountAmount, orderValue);
};

export const getOrderStatusColor = (status) => {
  const colors = {
    [ORDER_STATUS.PLACED]: 'text-blue-600',
    [ORDER_STATUS.CONFIRMED]: 'text-yellow-600',
    [ORDER_STATUS.SHIPPED]: 'text-purple-600',
    [ORDER_STATUS.OUT_FOR_DELIVERY]: 'text-orange-600',
    [ORDER_STATUS.DELIVERED]: 'text-green-600',
    [ORDER_STATUS.CANCELLED]: 'text-red-600',
  };
  return colors[status] || 'text-gray-600';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone);
};