import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../Context/CartContext'
import "../styles/Cart.css";
import API_URLS from '../config';

const Cart = () => {
    const [cart, setCart] = useCart();

    const handleDelete = (productId) => {
        setCart((prevCart) => prevCart.filter(product => product.id !== productId));
      };
  return (
    <Layout>
        <div className='grey-background'>
            <h2 style={{marginLeft: '80px'}}>Shopping Cart</h2>
            <p style={{marginLeft: '80px'}}>
                <span style={{ fontWeight: 'bold' }}>{cart?.length}</span> <span style={{ fontWeight: 'bold' }}>items</span> in your cart.
            </p>


            <div className='product-container'>
                <div className='product-header'>
                    <div className='header-item'>Product</div>
                    <div className='header-item'>Price</div>
                    <div className='header-item'>Quantity</div>
                    <div className='header-item'>Actions</div>
                </div>

                 {/* Render each product in the cart */}
                {cart?.map((p) => (
                    <div className='product-row' key={p.id}>
                        <img 
                            src={`${API_URLS.get_photo_url}/${p._id}`}
                            className='card-img-top'
                            alt= {p.name}
                            width = "10px"
                            height= "90px"
                        ></img>
                        <div className='product-item'>{p.name}</div>
                        <div className='product-item'>${p.price.toFixed(2)}</div>
                        <div className='product-item'>{p.quantity}</div>
                        <div className='product-item'>
                            <button
                                className='delete-btn'
                                onClick={() => handleDelete(p.id)}
                                >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    </Layout>
  )
}

export default Cart
