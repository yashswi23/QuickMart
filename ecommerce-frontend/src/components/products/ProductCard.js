// components/products/ProductCard.js
import React, { useState } from 'react';
import { Package, ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await onAddToCart(product);
      // Optional: Show success feedback
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Here you could also make an API call to save to wishlist
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="w-full h-full flex items-center justify-center">
          <Package className="w-16 h-16 text-gray-400" />
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            {product.category}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-gray-800 line-clamp-1">
          {product.name}
        </h3>
        
        {product.category && (
          <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        )}

        {/* Product Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price and Actions */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-green-600">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:bg-blue-400"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isAdding ? 'Adding...' : 'Add'}</span>
          </button>
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="mt-2">
            {product.stock > 0 ? (
              <span className="text-xs text-green-600">In Stock ({product.stock} left)</span>
            ) : (
              <span className="text-xs text-red-600">Out of Stock</span>
            )}
          </div>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1">
              ({product.rating}) {product.reviewCount && `• ${product.reviewCount} reviews`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;