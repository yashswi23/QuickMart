import { useState, useEffect } from "react";
import { Clock, MessageCircle } from "lucide-react";

const STATUS_STEPS = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const TrackOrderPage = ({
  selectedOrder,
  setCurrentPage,
  initializeChat,
  setChatEnabled,
  setChatMessages,
  totalDeliveryTime = 180, // default 3 minutes like OrderSuccessPage
}) => {

  // Parse orderTime and constants
  const orderTime = new Date(selectedOrder.orderTime).getTime();
  const STEP_TIME = totalDeliveryTime / (STATUS_STEPS.length - 1);

  // State hooks must come first
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(totalDeliveryTime);

  // Effect hook for timer and updating steps
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - orderTime) / 1000);

      setCurrentStep(Math.min(Math.floor(elapsedSeconds / STEP_TIME), STATUS_STEPS.length - 1));
      setTimeLeft(Math.max(totalDeliveryTime - elapsedSeconds, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [orderTime, STEP_TIME, totalDeliveryTime]);
   // Early return if no selectedOrder
  if (!selectedOrder) return null;
  // Format countdown timer mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentPage("home")}
            className="text-blue-600 hover:text-blue-700 mr-4 font-semibold"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Track Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-5 border-b pb-3">Order Details</h2>
            <p className="text-gray-700 mb-2 font-medium">
              Order ID: <span className="text-gray-900">{selectedOrder.id}</span>
            </p>
            <p className="text-gray-700 mb-6">
              Order Date:{" "}
              <span className="text-gray-900">
                {new Date(orderTime).toLocaleDateString()}{" "}
                {new Date(orderTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </p>

            {/* Order Items */}
            <div className="space-y-4">
              {selectedOrder.items.map((item) => (
                <div
                  key={item.id || item._id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center space-x-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t">
                <span>Total:</span>
                <span>₹{selectedOrder.total}</span>
              </div>
            </div>

            {/* Delivery Partner */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-lg mb-2">Delivery Partner</h3>
              <p className="font-medium text-gray-900">{selectedOrder.deliveryPartner.name}</p>
              <p className="text-gray-600">{selectedOrder.deliveryPartner.phone}</p>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">Order Status</h2>

            <ol className="list-decimal list-inside space-y-2">
              {STATUS_STEPS.map((step, index) => (
                <li
                  key={index}
                  className={`${
                    index <= currentStep ? "text-green-600 font-semibold" : "text-gray-400"
                  }`}
                >
                  {step}
                </li>
              ))}
            </ol>

            {/* ETA and Countdown */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg flex items-center space-x-3">
              <Clock className="w-6 h-6 text-green-600" />
              <div>
                {timeLeft > 0 ? (
                  <>
                    <p className="font-semibold text-green-700">Estimated Delivery In</p>
                    <p className="text-green-800 text-lg">{formatTime(timeLeft)}</p>
                    <p className="text-green-600 text-sm">Your order is arriving soon!</p>
                  </>
                ) : (
                  <p className="font-semibold text-red-600">Order Delivered!</p>
                )}
              </div>
            </div>

            {/* Help & Support Button */}
            <button
              onClick={() => {
                setCurrentPage("support");
                initializeChat(selectedOrder);
                setChatEnabled(false);
                setChatMessages([]);
              }}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Help & Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
