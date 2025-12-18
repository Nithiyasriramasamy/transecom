import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (location.state && location.state.product) {
            setProduct(location.state.product);
        } else {
            // Redirect if no product passed (optional, or just show empty)
            // navigate('/');
        }
    }, [location, navigate]);

    const handlePlaceOrder = () => {
        alert('Order Placed Successfully! (Simulation)');
        navigate('/');
    };

    if (!product) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">No item selected for checkout.</h2>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Return to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
                </div>

                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-full md:w-1/3 flex justify-center bg-gray-50 p-4 rounded-md">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-48 object-contain"
                            />
                        </div>

                        <div className="flex-grow space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                            <p className="text-gray-600 text-sm">Product category would go here.</p>

                            <div className="border-t border-b border-gray-100 py-4 my-2">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-gray-600">Price</span>
                                    <span className="font-bold">${product.price}</span>
                                </div>
                                {/* Can add quantity, tax, shipping here later */}
                                <div className="flex justify-between items-center text-lg mt-2 font-bold text-red-600">
                                    <span>Total</span>
                                    <span>${product.price}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded shadow-md transition-colors text-lg"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
