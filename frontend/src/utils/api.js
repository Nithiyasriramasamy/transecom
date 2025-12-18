// src/utils/api.js

const API_URL = 'https://transecom-2.onrender.com/api';

// Get token
const getToken = () => localStorage.getItem('token');

// REGISTER
export const register = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

// LOGIN
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

// PRODUCTS
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

// CREATE PRODUCT (Admin)
export const createProduct = async (productData) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  return res.json();
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
