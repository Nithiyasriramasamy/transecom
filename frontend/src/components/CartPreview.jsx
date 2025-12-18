import React from 'react';

const CartPreview = ({ cartItems }) => {
    if (!cartItems || cartItems.length === 0) {
        return null;
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-4 transition-transform duration-300">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Your Cart ({cartItems.length} items)</h3>
                    <span className="text-lg font-bold text-gray-900">Total: ${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400">
                    {cartItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex-shrink-0 w-48 bg-gray-50 border border-gray-200 rounded p-2 flex items-center space-x-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-white rounded" />
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                                <p className="text-xs text-gray-600">
                                    ${item.price} x {item.qty}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CartPreview;
