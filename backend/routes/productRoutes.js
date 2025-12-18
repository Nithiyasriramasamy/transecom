import express from 'express';
import { getProducts, createProduct, deleteProduct, getProductById } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// GET /api/products - public route
router.get('/', getProducts);

// GET /api/products/:id - public route
router.get('/:id', getProductById);

// POST /api/products - protected route (any logged in user can add)
router.post('/', authMiddleware, createProduct);

// DELETE /api/products/:id - protected route (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

export default router;
