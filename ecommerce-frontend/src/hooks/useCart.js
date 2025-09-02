import { useState, useEffect, createContext, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    // Normalize product id to always use "id"
    const productId = product.id || product._id;
    console.log('Adding to cart:', productId, 'quantity:', quantity);

    setCart(prevCart => {
      const existing = prevCart.find(item => (item.id || item._id) === productId);
      if (existing) {
        return prevCart.map(item =>
          (item.id || item._id) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Add product with normalized id and quantity
      return [...prevCart, { ...product, quantity, id: productId }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          (item.id || item._id) === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => cart.reduce((t, item) => t + item.price * item.quantity, 0);

  const getCartItemCount = () => cart.reduce((t, item) => t + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, clearCart, getCartTotal, getCartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
