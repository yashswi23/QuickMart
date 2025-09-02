import React, { useEffect, useState } from "react";

const OrderHistoryPage = ({ setCurrentPage, setSelectedOrder }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders
          .slice() // clone array to avoid mutating
          .reverse() // newest first
          .map((order) => (
            <div
              key={order.id}
              className="p-4 mb-4 bg-white rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedOrder(order);
                setCurrentPage("trackOrder");
              }}
            >
              <p className="font-semibold">Order ID: {order.id}</p>
              <p>Date: {new Date(order.orderTime).toLocaleString()}</p>
              <p>Total: ₹{order.total}</p>
              <p>Items: {order.items.length}</p>
            </div>
          ))
      )}

      <button
        onClick={() => setCurrentPage("home")}
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Back to Shop
      </button>
    </div>
  );
};

export default OrderHistoryPage;
