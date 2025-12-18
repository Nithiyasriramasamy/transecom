// Cart page - shows items in cart
// Cart page - updated UI with small rectangles
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const handleRemove = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleBuy = (id) => {
    window.location.href = `/buy/${id}`;
  };

  if (cart.length === 0) {
    return (
      <p className="text-center text-xl mt-10">Your cart is empty</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {/* GRID LIKE AMAZON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-sm hover:shadow-md transition bg-white"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-contain p-4"
            />

            {/* CONTENT */}
            <div className="px-4 pb-4">
              <h2 className="text-sm font-semibold line-clamp-2">
                {item.name}
              </h2>

              {/* RATING (STATIC LIKE AMAZON) */}
              <p className="text-sm text-orange-500 mt-1">
                ★★★★☆ <span className="text-gray-500">(68)</span>
              </p>

              {/* PRICE */}
              <p className="text-xl font-bold mt-2">
                ₹{item.price}
              </p>

              <p className="text-xs text-gray-600 mt-1">
                FREE delivery in 2–3 days
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => handleBuy(item._id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-full text-sm font-semibold"
                >
                  Buy this product
                </button>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
