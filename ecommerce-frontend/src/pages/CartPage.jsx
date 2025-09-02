
// import React, { useState } from "react";
// import { ShoppingCart, Package } from "lucide-react";
// import { useCart } from "../hooks/useCart";
// export const CartPage = ({ user, setCurrentPage, setSelectedOrder }) => {
//   const {
//     cart,
//     updateQuantity,
//     getCartTotal,
//     clearCart,
//   } = useCart();

//   const [discountCode, setDiscountCode] = useState("");
//   const [appliedDiscount, setAppliedDiscount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // handle discount
//   const applyDiscount = () => {
//   if (!discountCode) return setAppliedDiscount(0);

//   switch (discountCode.toUpperCase()) {
//     case "SAVE10":
//       setAppliedDiscount(getCartTotal() * 0.1);
//       break;
//     case "SAVE20":
//       setAppliedDiscount(getCartTotal() * 0.2);
//       break;
//     case "FLAT100":
//       setAppliedDiscount(100);
//       break;
//     default:
//       setAppliedDiscount(0);
//   }
// };

// const calculateTotal = () => Math.max(0, getCartTotal() - appliedDiscount);
// // const placeOrder = (method) => {
// //   if (!user) {
// //     alert("Please login to place an order");
// //     setCurrentPage("login");
// //     return;
// //   }

// //   alert(`Order placed with ${method}! Total: ₹${calculateTotal()}`);
// //   clearCart();
// //   setDiscountCode("");
// //   setAppliedDiscount(0);
// //   setCurrentPage("home"); // redirect after order
// // };
// const placeOrder = (method) => {
//   if (!user) {
//     alert("Please login to place an order");
//     setCurrentPage("login");
//     return;
//   }

//   // Create order object here
//   const order = {
//   id: Math.floor(Math.random() * 1000000),
//   items: cart,
//   total: calculateTotal(),
//   deliveryPartner: {
//     name: "John Doe",
//     phone: "123-456-7890",
//   },
//   orderTime: Date.now(), // add current time
//   estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
//   trackingSteps: [
//     { status: "Order Placed", completed: true, time: Date.now() },
//     { status: "Packed", completed: false, time: null },
//     { status: "Shipped", completed: false, time: null },
//     { status: "Out for Delivery", completed: false, time: null },
//     { status: "Delivered", completed: false, time: null },
//   ],
// };


//   if (method === "COD") {
//     clearCart();
//     setDiscountCode("");
//     setAppliedDiscount(0);
//     setSelectedOrder(order);  // now order is defined
//     setCurrentPage("orderSuccess");
//   } else {
//     alert(`Order placed with ${method}! Total: ₹${calculateTotal()}`);
//     clearCart();
//     setDiscountCode("");
//     setAppliedDiscount(0);
//     setCurrentPage("home"); // redirect after order
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <button onClick={() => setCurrentPage("home")} className="text-blue-600 mb-4">
//         ← Back to Shop
//       </button>

//       {cart.length === 0 ? (
//         <div className="text-center py-8">
//           <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-600">Your cart is empty</p>
//         </div>
//       ) : (
//         <div className="grid lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 bg-white rounded p-4 shadow">
//             {cart.map((item) => (
//               <div key={item.id || item._id} className="flex justify-between items-center mb-4">
//                 <div className="flex items-center">
//                   <Package className="w-10 h-10 mr-2 text-gray-400" />
//                   <div>
//                     <h3>{item.name}</h3>
//                     <p>₹{item.price}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <button onClick={() => updateQuantity(item.id || item._id, item.quantity - 1)}>-</button>
//                   <span className="mx-2">{item.quantity}</span>
//                   <button onClick={() => updateQuantity(item.id || item._id, item.quantity + 1)}>+</button>
//                   <span className="ml-2 font-bold">₹{item.price * item.quantity}</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white rounded p-4 shadow">
//             <h2 className="font-bold text-lg mb-2">Order Summary</h2>

//             <input
//               type="text"
//               placeholder="Discount code"
//               value={discountCode}
//               onChange={(e) => setDiscountCode(e.target.value)}
//               className="border rounded px-2 py-1 mb-2 w-full"
//             />
//             <button onClick={applyDiscount} className="bg-gray-600 text-white px-4 py-1 rounded mb-4">
//               Apply
//             </button>

//             <p>Subtotal: ₹{getCartTotal()}</p>
//             {appliedDiscount > 0 && <p className="text-green-600">Discount: -₹{appliedDiscount}</p>}
//             <p className="font-bold">Total: ₹{calculateTotal()}</p>

//             {!user && (
//               <p className="text-yellow-600 mt-2">
//                 Please <button onClick={() => setCurrentPage("login")} className="underline">login</button> to place an order
//               </p>
//             )}

//             {user && (
//               <div className="mt-4 space-y-2">
//                 <button onClick={() => placeOrder("Razorpay")} className="bg-blue-600 text-white w-full py-2 rounded">Pay with Razorpay</button>
//                 <button onClick={() => placeOrder("COD")} className="bg-green-600 text-white w-full py-2 rounded">Cash on Delivery</button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
import React, { useState } from "react";
import { ShoppingCart, Package } from "lucide-react";
import { useCart } from "../hooks/useCart";

export const CartPage = ({ user, setCurrentPage, setSelectedOrder }) => {
  const { cart, updateQuantity, getCartTotal, clearCart } = useCart();

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const applyDiscount = () => {
    if (!discountCode) return setAppliedDiscount(0);

    switch (discountCode.toUpperCase()) {
      case "SAVE10":
        setAppliedDiscount(getCartTotal() * 0.1);
        break;
      case "SAVE20":
        setAppliedDiscount(getCartTotal() * 0.2);
        break;
      case "FLAT100":
        setAppliedDiscount(100);
        break;
      default:
        setAppliedDiscount(0);
    }
  };

  const calculateTotal = () => Math.max(0, getCartTotal() - appliedDiscount);

  const placeOrder = (method) => {
    if (!user) {
      alert("Please login to place an order");
      setCurrentPage("login");
      return;
    }

    const order = {
      id: Math.floor(Math.random() * 1000000),
      items: cart,
      total: calculateTotal(),
      deliveryPartner: { name: "John Doe", phone: "123-456-7890", rating: 4.5 },
      orderTime: Date.now(),
      estimatedDelivery: new Date(Date.now() + 5  * 60 * 60 * 1000),
      trackingSteps: [
        { status: "Order Placed", completed: true, time: Date.now() },
        { status: "Packed", completed: false, time: null },
        { status: "Shipped", completed: false, time: null },
        { status: "Out for Delivery", completed: false, time: null },
        { status: "Delivered", completed: false, time: null },
      ],
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    clearCart();
    setDiscountCode("");
    setAppliedDiscount(0);


    if (method === "COD") {
      // setDiscountCode("");
      // setAppliedDiscount(0);
      setSelectedOrder(order);
      setCurrentPage("orderSuccess");
    } else {
      alert(`Order placed with ${method}! Total: ₹${calculateTotal()}`);
      // clearCart();
      // setDiscountCode("");
      // setAppliedDiscount(0);
      setCurrentPage("home");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => setCurrentPage("home")}
        className="text-blue-600 hover:text-blue-800 mb-6 font-semibold"
      >
        ← Back to Shop
      </button>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
            {cart.map((item) => (
              <div
                key={item.id || item._id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-md object-cover border"
                    />
                  ) : (
                    <Package className="w-20 h-20 text-gray-300" />
                  )}

                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      updateQuantity(item.id || item._id, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-xl font-bold select-none"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id || item._id, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-xl font-bold select-none"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <span className="ml-4 font-bold text-lg">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="font-bold text-xl mb-4 border-b pb-2">Order Summary</h2>

            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="border rounded px-3 py-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={applyDiscount}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full mb-6 transition"
            >
              Apply Discount
            </button>

            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{getCartTotal()}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount:</span>
                  <span>-₹{appliedDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {!user && (
              <p className="text-yellow-600 mt-4 text-center">
                Please{" "}
                <button
                  onClick={() => setCurrentPage("login")}
                  className="underline hover:text-yellow-800 font-semibold"
                >
                  login
                </button>{" "}
                to place an order
              </p>
            )}

            {user && (
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => placeOrder("Razorpay")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded transition"
                >
                  Pay with Razorpay
                </button>
                <button
                  onClick={() => placeOrder("COD")}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-3 rounded transition"
                >
                  Cash on Delivery
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
