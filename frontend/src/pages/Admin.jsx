import { useState, useEffect } from 'react';
import { createProduct, getProducts, deleteProduct } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    });
    const navigate = useNavigate();

    // Basic admin check
    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!token || !isAdmin) {
            alert('Access denied. Admins only.');
            navigate('/');
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(formData);
            alert('Product created successfully!');
            setFormData({ name: '', price: '', description: '', image: '' });
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                alert('Product deleted');
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Add Product Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
                        >
                            Add Product
                        </button>
                    </form>
                </div>

                {/* Product List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Manage Products</h2>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                        {products.map(product => (
                            <div key={product._id} className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center gap-3">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                    <div>
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p className="text-sm text-gray-500">${product.price}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
