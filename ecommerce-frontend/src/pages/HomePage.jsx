// import React, { useState } from "react";
// import { ShoppingCart, User, Package, Search } from "lucide-react";

// export const HomePage = ({
//   user,
//   cart = [],
//   products = [],
//   error,
//   setCurrentPage,
//   handleLogout,
//   addToCart = () => {}, // ✅ default to prevent "not defined" errors
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   // ✅ Filter products safely
//   const filteredProducts = products.filter((product) =>
//     product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-blue-600">QuickMart</h1>
//           <div className="flex items-center space-x-4">
//             {/* Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:border-blue-500"
//               />
//             </div>

//             {/* Cart */}
//             <button
//               onClick={() => setCurrentPage("cart")}
//               className="relative p-2 text-gray-600 hover:text-blue-600"
//             >
//               <ShoppingCart className="w-6 h-6" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                   {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
//                 </span>
//               )}
//             </button>

//             {/* User / Login */}
//             {user ? (
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm font-medium">Hi, {user.name}</span>
//                 <button
//                   onClick={handleLogout}
//                   className="text-sm text-gray-600 hover:text-gray-800"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setCurrentPage("login")}
//                 className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
//               >
//                 <User className="w-4 h-4" />
//                 <span className="text-sm">Login</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Error */}
//       {error && (
//         <div className="bg-red-50 text-red-600 p-3 mx-4 mt-4 rounded-lg text-sm">
//           {error}
//         </div>
//       )}

//       {/* Products Grid */}
//       <div className="container mx-auto px-4 py-8">
//         <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
//         {filteredProducts.length === 0 ? (
//           <p className="text-gray-500">
//             No products found for "<span className="font-medium">{searchTerm}</span>"
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product._id || product.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 {/* Product Image Placeholder */}
//                 <div className="h-48 bg-gray-200 flex items-center justify-center">
//                   <Package className="w-16 h-16 text-gray-400" />
//                 </div>

//                 {/* Product Details */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
//                   <p className="text-gray-600 mb-2">{product.category}</p>

//                   <div className="flex justify-between items-center">
//                     <span className="text-xl font-bold text-green-600">
//                       ₹{product.price}
//                     </span>
//                     <button
//                       onClick={() => addToCart(product)}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { ShoppingCart, User, Package, Search } from "lucide-react";

export const HomePage = ({
  user,
  cart = [],
  products = [],
  categories = [], // { id, name, image }
  error,
  setCurrentPage,
  handleLogout,
  addToCart = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter products by search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // For Blinkit style banners (hardcoded for demo)
  const banners = [
    {
      id: "pharmacy",
      title: "Pharmacy at your doorstep!",
      subtitle: "Cough syrups, pain relief sprays & more",
      bgColor: "bg-teal-500",
      textColor: "text-white",
      buttonColor: "bg-white text-teal-700",
      image: "https://img.freepik.com/free-photo/high-angle-pill-foils-plastic-containers_23-2148533456.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: "pet-care",
      title: "Pet Care supplies in minutes",
      subtitle: "Food, treats, toys & more",
      bgColor: "bg-yellow-400",
      textColor: "text-black",
      buttonColor: "bg-black text-white",
      image: "https://cdn.shopify.com/s/files/1/0526/9117/3563/files/aboutus-image01.jpg",
    },
    {
      id: "baby-care",
      title: "No time for a diaper run?",
      subtitle: "Get baby care essentials in minutes",
      bgColor: "bg-blue-200",
      textColor: "text-black",
      buttonColor: "bg-black text-white",
      image: "https://media.istockphoto.com/id/864501328/photo/baby-products-symbols-for-newborns.jpg?s=612x612&w=0&k=20&c=6uqZgQOSUxOMsHheFlfrD1VTl8sFpAsYRNUchsIkHsg=",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm border-b z-50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1
            className="text-3xl font-extrabold text-green-600 cursor-pointer select-none"
            onClick={() => setCurrentPage("home")}
          >
            <span className="text-yellow-400">blink</span>
            <span className="text-green-600">it</span>
          </h1>

          {/* Search */}
          <div className="flex-1 mx-6 relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="search"
              placeholder='Search for products like "sugar"'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
              autoComplete="off"
            />
          </div>

          {/* Cart & User */}
          <div className="flex items-center space-x-5">
            <button
              onClick={() => setCurrentPage("cart")}
              className="relative p-2 rounded-full text-green-600 hover:bg-green-100 transition"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold shadow">
                  {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentPage("orderHistory")}
              className="text-blue-600 underline ml-4"
            >
              Order History
</button>


            {user ? (
              <div className="flex items-center space-x-3 text-green-700 font-semibold">
                <User className="w-6 h-6" />
                <span>Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-green-600 hover:text-green-800 underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage("login")}
                className="flex items-center space-x-2 text-green-600 font-semibold hover:text-green-800 transition"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 mx-auto mt-6 max-w-7xl rounded-md shadow-sm border border-red-200">
          {error}
        </div>
      )}

      {/* Blinkit Style Banners */}
      <section className="container mx-auto px-6 mt-6 flex gap-4 overflow-x-auto scrollbar-hide">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`min-w-[280px] rounded-lg p-5 flex items-center gap-4 ${banner.bgColor} ${banner.textColor}`}
          >
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{banner.title}</h3>
              <p className="mb-3">{banner.subtitle}</p>
              <button
                className={`px-4 py-2 rounded ${banner.buttonColor} font-semibold`}
                onClick={() => alert(`Order from ${banner.title}`)}
              >
                Order Now
              </button>
            </div>
            <img
              src={banner.image}
              alt={banner.title}
              className="h-24 object-contain"
            />
          </div>
        ))}
      </section>

      {/* Categories horizontal scroll */}
      {categories.length > 0 && (
        <section className="container mx-auto px-6 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Shop by Category</h2>
            <button
              className="text-green-600 hover:underline"
              onClick={() => setCurrentPage("all-categories")}
            >
              See all
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto scrollbar-hide py-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition
                  ${
                    selectedCategory === cat.id
                      ? "bg-green-100"
                      : "bg-green-50 hover:bg-green-100"
                  }
                `}
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-14 h-14 object-contain mb-1"
                  />
                ) : (
                  <Package className="w-12 h-12 text-green-400 mb-1" />
                )}
                <span className="text-sm font-medium text-green-700 truncate w-16 text-center">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Products Grid */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {selectedCategory
            ? categories.find((c) => c.id === selectedCategory)?.name
            : "Popular Products"}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No products found for{" "}
            <span className="font-semibold text-green-700">"{searchTerm}"</span>
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center p-3"
              >
                <div className="w-full aspect-square bg-green-50 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain max-h-full"
                    />
                  ) : (
                    <Package className="w-10 h-10 text-green-300" />
                  )}
                </div>

                <h3 className="text-sm font-semibold text-gray-800 truncate w-full text-center">
                  {product.name}
                </h3>
                <span className="text-xs text-gray-500 mb-2 capitalize text-center w-full truncate">
                  {categories.find((c) => c.id === product.categoryId)?.name ||
                    product.category}
                </span>
                <div className="w-full flex justify-between items-center">
                  <span className="text-green-600 font-bold text-sm">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

