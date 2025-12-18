// API utility - handles all backend requests
const API_URL = 'https://transecom-2.onrender.com/api';


// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Register new user
export const register = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Login user
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Get all products
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

// Create new product (requires authentication)
export const createProduct = async (productData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  return response.json();
};

// Get single product by ID
export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`); // Note: Backend needs to support this if not already
  // Actually, standard GET /products usually returns list. I might need to filter client side if backend doesn't support /:id
  // But usually REST API supports /:id. The backend routes showed:
  // router.get('/', getProducts);
  // It does NOT have router.get('/:id').
  // I should check backend/routes/productRoutes.js again.
  // Wait, I only added delete /:id.
  // The backend productController.js likely needs getProductById too if I want to use it.
  // OR I can pass the product object via location state in navigation.
  // The user requirement said: "Add Buy Product button... Navigate to /buy/:id... Create /buy/:id page... Fetch product by ID".
  // So I MUST add getProductById to backend or filter on frontend.
  // Adding to backend is better.
  return response.json();
};

// Delete product (admin only)
export const deleteProduct = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
