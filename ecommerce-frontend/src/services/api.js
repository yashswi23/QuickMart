
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Helper method for making HTTP requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      ...options,
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Auth Methods
  async register(userData) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.token = data.token;
    }
    
    return data;
  }

  async login(credentials) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.token = data.token;
    }
    
    return data;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.token = null;
  }

  // Product Methods
  async getProducts(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    // return await this.request(`/products?${queryParams}`);
    const endpoint = queryParams ? `/products?${queryParams}` : '/products';
    return await this.request(endpoint);
  }

  async getProduct(id) {
    return await this.request(`/products/${id}`);
  }

  // Discount Methods
  async validateDiscount(code, orderValue) {
    return await this.request(`/discounts/validate/${code}?orderValue=${orderValue}`);
  }

  // Order Methods
  async createOrder(orderData) {
    return await this.request('/orders', {
      method: 'POST',
      body: orderData,
    });
  }

  async getOrders() {
    return await this.request('/orders');
  }

  async getOrder(id) {
    return await this.request(`/orders/${id}`);
  }

  async verifyPayment(paymentData) {
    return await this.request('/payments/verify', {
      method: 'POST',
      body: paymentData,
    });
  }

  // Support Methods
  async getSupportInfo(orderId) {
    return await this.request(`/support/order/${orderId}`);
  }

  // Razorpay Integration
  async initiateRazorpayPayment(amount, orderId) {
    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error('Razorpay SDK not loaded'));
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'QuickMart',
        description: `Order #${orderId}`,
        order_id: orderId,
        handler: async (response) => {
          try {
            const verificationResult = await this.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: orderId,
            });
            resolve(verificationResult);
          } catch (error) {
            reject(error);
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem('user') || '{}').name || '',
          email: JSON.parse(localStorage.getItem('user') || '{}').email || '',
        },
        theme: {
          color: '#2563EB',
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment cancelled by user'));
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    });
  }
}

export const apiService = new ApiService();
