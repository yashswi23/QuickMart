// components/layout/Header.js
import React from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = ({ onNavigate, searchQuery = '', setSearchQuery }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemCount } = useCart();

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')}
          className="text-2xl font-bold text-blue-600 hover:text-blue-700"
        >
          QuickMart
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          {setSearchQuery ? (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          ) : (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                readOnly
                onClick={() => onNavigate('home')}
              />
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <button 
            onClick={() => onNavigate('cart')}
            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                {getCartItemCount() > 99 ? '99+' : getCartItemCount()}
              </span>
            )}
          </button>

          {/* User Section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Hi, {user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-600 hover:text-gray-800"
                >
                  Logout
                </button>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;