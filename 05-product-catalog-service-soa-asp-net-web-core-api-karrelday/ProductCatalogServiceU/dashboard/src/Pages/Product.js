import React, { useState, useEffect } from 'react';
import '../CSS/Products.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({
        id: '',
        name: '',
        price: 0,
        description: '',
        category: '',
        stock: 0,
        imageUrl: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://localhost:7264/api/Products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            console.log("Fetched products:", data);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateProduct(currentProduct);
        } else {
            await createProduct(currentProduct);
        }
        resetForm();
        fetchProducts();
    };

    const createProduct = async (product) => {
        try {
            const response = await fetch('https://localhost:7264/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
            }
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const updateProduct = async (product) => {
        try {
            await fetch(`https://localhost:7264/api/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            stock: product.stock,
            imageUrl: product.imageUrl,
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`https://localhost:7264/api/products/${id}`, {
                method: 'DELETE',
            });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const resetForm = () => {
        setCurrentProduct({
            id: '',
            name: '',
            price: 0,
            description: '',
            category: '',
            stock: 0,
            imageUrl: '',
        });
        setIsEditing(false);
    };

    return (
        <div className="product-container">
            <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <input
                    type="text"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                    required
                    className="input-field"
                />
                <input
                    type="number"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleInputChange}
                    placeholder="Product Price"
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    name="description"
                    value={currentProduct.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    className="input-field"
                />
                <input
                    type="text"
                    name="category"
                    value={currentProduct.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                    className="input-field"
                />
                <input
                    type="number"
                    name="stock"
                    value={currentProduct.stock}
                    onChange={handleInputChange}
                    placeholder="Stock"
                    className="input-field"
                />
                <input
                    type="text"
                    name="imageUrl"
                    value={currentProduct.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    className="input-field"
                />
                <button type="submit" className="submit-button">
                    {isEditing ? 'Update' : 'Create'}
                </button>
            </form>

            <h3>Product List</h3>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id || index}>
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
                            <td>
                                <button onClick={() => handleEdit(product)} className="action-button">Edit</button>
                                <button onClick={() => handleDelete(product.id)} className="action-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Product;
