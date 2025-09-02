import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import DeliveryPartnerCard from "./DeliveryPartnerCard";

const STATUS_STEPS = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const OrderSuccessPage = ({
  selectedOrder,
  setCurrentPage,
  setSelectedOrder,
  totalDeliveryTime = 180, // default 3 minutes for demo
}) => {
  // Use safe fallback for orderTime if selectedOrder not ready
  const orderTime = selectedOrder ? new Date(selectedOrder.orderTime).getTime() : Date.now();

  const STEP_TIME = totalDeliveryTime / (STATUS_STEPS.length - 1);

  const now = Date.now();
  const elapsedSeconds = Math.floor((now - orderTime) / 1000);

  // Hooks called unconditionally
  const [timeLeft, setTimeLeft] = useState(() => Math.max(totalDeliveryTime - elapsedSeconds, 0));
  const [currentStep, setCurrentStep] = useState(() =>
    Math.min(Math.floor(elapsedSeconds / STEP_TIME), STATUS_STEPS.length - 1)
  );

  useEffect(() => {
    if (!selectedOrder) return; // early exit if no order

    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - orderTime) / 1000);

      setTimeLeft(Math.max(totalDeliveryTime - elapsedSeconds, 0));
      setCurrentStep(Math.min(Math.floor(elapsedSeconds / STEP_TIME), STATUS_STEPS.length - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [orderTime, timeLeft, totalDeliveryTime, STEP_TIME, selectedOrder]);

  // Early return after hooks
  if (!selectedOrder) return null;

  // Format countdown timer mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-700 mb-6">
          Your order ID is: <span className="font-mono">{selectedOrder.id}</span>
        </p>

        <DeliveryPartnerCard deliveryPartner={selectedOrder.deliveryPartner} />

        <div className="my-6">
          <h2 className="text-lg font-semibold mb-2">Estimated Delivery</h2>
          {timeLeft > 0 ? (
            <p className="text-4xl font-bold text-green-600">{formatTime(timeLeft)}</p>
          ) : (
            <p className="text-xl font-semibold text-red-600">Order Delivered!</p>
          )}
          <p className="text-gray-500 mt-1">
            Order will arrive in approximately {Math.ceil(timeLeft / 60)} minutes
          </p>
        </div>

        <div className="text-left mb-6">
          <h3 className="font-semibold mb-2">Order Status</h3>
          <ol className="list-decimal list-inside space-y-1">
            {STATUS_STEPS.map((step, index) => (
              <li
                key={step}
                className={`${
                  index <= currentStep ? "text-green-600 font-semibold" : "text-gray-400"
                }`}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setCurrentPage("trackOrder");
              setSelectedOrder(selectedOrder);
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Track Order
          </button>
          <button
            onClick={() => setCurrentPage("home")}
            className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
