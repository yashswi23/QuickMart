
import React, { useState, useEffect } from "react";
import { apiService } from "./services/api";
import sampleProducts from "./components/data/sampleProducts";
import deliveryPartners from "./components/data/deliveryPartners";
// Cart Context
import { CartProvider,useCart } from "./hooks/useCart";
// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
import TrackOrderPage from "./pages/TrackOrder";
import OrderSuccessPage from "./pages/OrderSucess";
import SupportPage from "./pages/SupportPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
const [chatEnabled, setChatEnabled] = useState(false);
const [currentMessage, setCurrentMessage] = useState("");


  // ✅ Get cart functions from context
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const deliveryTime = selectedOrder?.quickDelivery ? 120 : 180;
  // Load user + products
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    loadProducts();
    loadRazorpayScript();
  }, []);

  const loadProducts = async () => {
  try {
    const data = await apiService.getProducts();
    console.log("Products data from API:", data);
    setProducts(data.products || data || sampleProducts);
  } catch (err) {
    console.log("Using sample data:", err.message);
    setProducts(sampleProducts);
  }
};

  const initializeChat = (order) => {
  setChatMessages([]);
  setChatEnabled(false);
  setCurrentMessage("");
  setSelectedOrder(order); // Save the current order for context
};


  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  // 🔐 Auth
  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      setError("");
      const data = await apiService.login(credentials);
      setUser(data.user);
      setCurrentPage("home");
      localStorage.setItem("user", JSON.stringify(data.user));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    try {
      setLoading(true);
      setError("");
      const data = await apiService.register(userData);
      setUser(data.user);
      setCurrentPage("home");
      localStorage.setItem("user", JSON.stringify(data.user));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    apiService.logout();
    localStorage.removeItem("user");
    setUser(null);
    clearCart();
    setOrders([]);
    setCurrentPage("home");
  };

const handleConcernClick = (concern) => {
  const concernMap = {
    delivery: "Can you help me with my delivery?",
    payment: "I have an issue with payment.",
    product: "There's a problem with the product quality.",
    other: "I need help with something else.",
  };

  const concernMessage = concernMap[concern] || "I need assistance.";

  // ✅ Get order info
  const orderId = selectedOrder?.id || "N/A";
  const itemNames = selectedOrder?.items?.map(item => item.name).join(", ") || "your items";
  const userName = user?.name || "User";

  const welcomeMessage = `Hi ${userName}, thank you for your order! Your Order ID is #${orderId}. You ordered: ${itemNames}.`;

  // ✅ Set messages
  setChatMessages([
    { type: "bot", message: welcomeMessage },
    { type: "user", message: concernMessage },
    { type: "admin", message: "Thanks for reaching out! How can I assist you further?" }
  ]);

  setChatEnabled(true);
};


const sendMessage = () => {
  if (!currentMessage.trim()) return;

  const userMsg = { type: "user", message: currentMessage };
  const autoReply = {
    type: "admin",
    message: "Thanks for your message! Our team will get back to you shortly.",
  };

  setChatMessages(prev => [...prev, userMsg, autoReply]);
  setCurrentMessage("");
};


  // ✅ Render pages
  return (
    <div>
      {currentPage === "login" && (
        <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "register" && (
        <RegisterPage onRegister={handleRegister} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "home" && (
        <HomePage
          products={products}
          cart={cart}
          addToCart={addToCart}
          user={user}
          handleLogout={handleLogout}
          setCurrentPage={setCurrentPage}
          error={error}
        />
      )}
      {currentPage === "cart" && (
  <CartPage
    user={user}
    removeFromCart={removeFromCart}
    setCurrentPage={setCurrentPage}
    clearCart={clearCart}
    setSelectedOrder={setSelectedOrder} // <---- ADD THIS
  />
)}
      {currentPage === "orderSuccess" && (
        <OrderSuccessPage
          selectedOrder={selectedOrder}
          setCurrentPage={setCurrentPage}
          setSelectedOrder={setSelectedOrder}
          totalDeliveryTime={deliveryTime}
        />
      )}
     {currentPage === "trackOrder" && (
  <TrackOrderPage
    selectedOrder={selectedOrder}
    setCurrentPage={setCurrentPage}
    initializeChat={initializeChat}
    setChatEnabled={setChatEnabled}
    setChatMessages={setChatMessages}
  />
)}


{currentPage === "support" && (
  <SupportPage
    setCurrentPage={setCurrentPage}
    chatMessages={chatMessages}
    chatEnabled={chatEnabled}
    currentMessage={currentMessage}
    setCurrentMessage={setCurrentMessage}
    handleConcernClick={handleConcernClick}
    sendMessage={sendMessage}
    setChatEnabled={setChatEnabled}
    setChatMessages={setChatMessages}
  />
)}
{currentPage === "orderHistory" && (
  <OrderHistoryPage
    setCurrentPage={setCurrentPage}
    setSelectedOrder={setSelectedOrder}
  />
)}

    </div>
  );
};

// ✅ Wrap everything in CartProvider
const App = () => (
  <CartProvider>
    <AppContent />
  </CartProvider>
);

export default App;
