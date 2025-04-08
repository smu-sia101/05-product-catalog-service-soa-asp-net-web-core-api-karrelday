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
        setCurrentProduct({
            id: '', // Reset id
            name: '',
            price: 0,
            description: '',
            category: '',
            stock: 0,
            imageUrl: '',
        });
        setIsEditing(false);
        fetchProducts();
    };

    const createProduct = async (product) => {
        console.log("Sending product data:", product); 
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
    };

    const updateProduct = async (product) => {
        await fetch(`https://localhost:7264/api/products/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
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
        await fetch(`https://localhost:7264/api/products/${id}`, {
            method: 'DELETE',
        });
        fetchProducts();
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleInputChange}
                    placeholder="Product Price"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={currentProduct.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                />
                <input
                    type="text"
                    name="category"
                    value={currentProduct.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                />
                <input
                    type="number"
                    name="stock"
                    value={currentProduct.stock}
                    onChange={handleInputChange}
                    placeholder="Stock"
                />
                <input
                    type="text"
                    name="imageUrl"
                    value={currentProduct.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                />
                <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            </form>
            <h3>Product List</h3>
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
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleEdit(product)}>Edit</button>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Product;

