import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductById } from '../utils/api';

function Buy() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleConfirmPurchase = () => {
        alert('Purchase confirmed! (Demo)');
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!product) return <div className="text-center mt-10">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    👉 You are buying this product
                </h1>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-48 h-48 object-cover rounded-lg shadow-sm"
                    />

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-3xl font-bold text-blue-600 mb-6">${product.price}</p>

                        <button
                            onClick={handleConfirmPurchase}
                            className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition duration-300 w-full md:w-auto"
                        >
                            Confirm Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Buy;
