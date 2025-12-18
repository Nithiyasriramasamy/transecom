import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import CartPreview from '../components/CartPreview';

// Mock Data (Fallback if API fails or for demo)
const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Wireless Noise Cancelling Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    rating: 4.5
  },
  {
    _id: '2',
    name: 'Smart Fitness Watch Series 5',
    price: 199.50,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
    rating: 4.8
  },
  {
    _id: '3',
    name: '4K Ultra HD Action Camera',
    price: 149.00,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop',
    rating: 4.2
  },
  {
    _id: '4',
    name: 'Gaming Mechanical Keyboard',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7
  },
  {
    _id: '5',
    name: 'Portable Bluetooth Speaker',
    price: 59.95,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1936&auto=format&fit=crop',
    rating: 4.0
  },
  {
    _id: '6',
    name: 'Professional DSLR Camera Lens',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=1964&auto=format&fit=crop',
    rating: 4.9
  }
];

function Home() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch products from API (Optional: currently using mock data for UI demo)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProducts(data);
          }
        }
      } catch (error) {
        console.error("Error fetching products, using mock data:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        }];
      }
    });
  };

  const buyNow = (product) => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24">
      {/* Search Bar Placeholder (Optional Visual) */}

      {/* Hero Section */}
      <HeroSlider />

      {/* Product Listing */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-yellow-400 pl-3">Recommended For You</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="h-full">
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                onBuyNow={buyNow}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Cart Preview at Bottom */}
      <CartPreview cartItems={cart} />

    </div>
  );
}

export default Home;
