import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState, useEffect } from 'react'
import axios from 'axios'
import API_URLS from '../config'
import { useParams } from 'react-router-dom'
import "../styles/ProductDetails.css";

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const params = useParams();

    const getProduct = async() =>
    {
        try {
            const {data} = await axios.get(`${API_URLS.get_product_url}/${params.slug}`);
            setProduct(data?.product);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => 
    {
        if(params?.slug) getProduct();
    }, [params?.slug]);
    

  return (
    <Layout>
        <div className="product-details-container">
            <div className="product-image">
            {product._id ? (
                <img
                    src={`${API_URLS.get_photo_url}/${product._id}`}
                    alt={product.name}
                    className="main-image"
                />
            ) : ""}
            </div>

            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-availability">Availability: <span className={product.quantity > 0 ? "in-stock" : "out-of-stock"}> {product.quantity > 1 ? "In Stock" : "Out Of Stock"}</span></div>
                <div className="product-category">Category: {product?.category?.name}</div>
                <div className="product-price">Price: ${product.price}</div>

                <p className="product-description">{product.description}</p>

                <div className="product-quantity">
                    <button className="quantity-button">-</button>
                    <input type="text" value="1" className="quantity-input" readOnly />
                    <button className="quantity-button">+</button>
                </div>
                <div className="product-buttons">
                    <button className="add-to-cart-button">Add to cart</button>
                    <button className="wishlist-button">Wishlist</button>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ProductDetails
