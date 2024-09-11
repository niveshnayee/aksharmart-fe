// import React from 'react'
import Layout from '../components/Layout/Layout'
import { React, useState, useEffect } from 'react'
import axios from 'axios'
import API_URLS from '../config'
import { useParams, useNavigate} from 'react-router-dom'
import "../styles/ProductDetails.css";
import { Card, Button } from 'antd';
import Meta from 'antd/es/card/Meta';
import { ShoppingCartOutlined } from '@ant-design/icons';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const getProduct = async() =>
    {
        try {
            const {data} = await axios.get(`${API_URLS.get_product_url}/${params.slug}`);
            setProduct(data?.product);
            getRelatedProducts(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    const getRelatedProducts = async(pid, cid) =>
    {
        try {
            const {data} = await axios.get(`${API_URLS.get_related_products_url}/${pid}/${cid}`);
            setRelatedProducts(data.related_products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => 
    {
        if(params?.slug) getProduct();
    }, [params?.slug]);


    const handleAddToCart = (productId) => {
        // Add to cart logic here
        console.log("Added to cart:", productId);
    };
    

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

        <div className='row-ml'>
            <h1>Similar Products</h1>
            {relatedProducts.length < 1 && <p className='text-center'>no similar products found :(</p>}
            <div className='d-flex flex-wrap'>
                {relatedProducts?.map((rp) => ( 
                <Card
                    onClick={() => navigate(`/product/${rp.slug}`)}
                    key={rp._id}
                    cover={
                        <img
                        alt="example"
                        src={`${API_URLS.get_photo_url}/${rp._id}`}
                        />
                    }

                    actions={[
                        <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => handleAddToCart(rp._id)}
                        >
                            Add to Cart
                        </Button>
                        ]}
                >
                <Meta
                    title= {rp.name}
                    description= {
                        <>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#333' }}>${rp.price}</p>
                            <p>{rp.description}</p>
                        </>
                    }
                />
                </Card> ))}
            </div>
        </div>
    </Layout>
  )
}

export default ProductDetails
