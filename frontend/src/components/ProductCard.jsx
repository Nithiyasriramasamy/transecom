import React from 'react';

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full p-4 flex items-center justify-center bg-gray-50 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          {/* Static Rating Stars */}
          <div className="flex text-yellow-400 text-sm">
            {'★'.repeat(4)}{'☆'.repeat(1)}
          </div>
          <span className="text-xs text-gray-500 ml-1">(120)</span>
        </div>

        <div className="mt-auto">
          <p className="text-xl font-bold text-gray-900 mb-4">${product.price}</p>

          <div className="w-full grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-1 text-sm rounded transition-colors" // Amazon-ish yellow
            >
              Add to Cart
            </button>
            <button
              onClick={() => onBuyNow(product)}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-1 text-sm rounded transition-colors" // Amazon-ish orange
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
