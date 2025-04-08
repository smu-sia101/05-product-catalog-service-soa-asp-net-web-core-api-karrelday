import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/ProductDetails.css'; 

const ProductDetails = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://localhost:7264/api/Products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]); 

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="product-details">
            <h2>Product Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                        <td>{product.category}</td>
                        <td>{product.stock}</td>
                        <td>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProductDetails;
