import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../Context/CartContext'
import "../styles/Cart.css";
import API_URLS from '../config';

const Cart = () => {
    const [cart, setCart] = useCart();


    const handleDelete = (pName) => {
        try {
            let currCart = [...cart];
            let index = currCart.findIndex((item) => item.name === pName);
            console.log(index);
            currCart.splice(index,1);
            
            setCart(currCart);
            localStorage.setItem("cart", JSON.stringify(currCart));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDecrement = (pName) => {
        try {
            let currCart = [...cart];
            let index = currCart.findIndex((item) => item.name === pName);
            console.log(currCart[index]);
            if(currCart[index].q > 1)
                currCart[index].q--;
            else
                currCart.splice(index,1);

            setCart(currCart);
            localStorage.setItem("cart", JSON.stringify(currCart));
        } catch (error) {
            console.log(error);
        }
    };

    const handleIncrement = (pName) => {
        try {
            let currCart = [...cart];
            let index = currCart.findIndex((item) => item.name === pName);

            currCart[index].q++;
            setCart(currCart);
            localStorage.setItem("cart", JSON.stringify(currCart));

        } catch (error) {
            console.log(error);
        }
    };

    // Function to calculate subtotal
    const calculateSubtotal = () => {
        try {
            return cart.reduce((total, product) => total + product.price * product.q, 0);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <Layout>
        <div className='cart-container'>
            <div className='cart-items'>
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
                                width = "100px"
                                height= "90px"
                            ></img>
                            <div className='product-item'>{p.name}</div>
                            <div className='product-item'>${p.price.toFixed(2)}</div>
                            {/* Quantity Controls */}
                            <div className='product-item quantity-control'>
                                    <button onClick={() => handleDecrement(p.name)} className="quantity-btn">-</button>
                                    <span>{p.q}</span>
                                    <button onClick={() => handleIncrement(p.name)} className="quantity-btn">+</button>
                            </div>
                            {/* <div className='product-item'>{p.q}</div> */}
                            <div className='product-item'>
                                <button
                                    className='delete-btn'
                                    onClick={() => handleDelete(p.name)}
                                    >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Checkout Section */}
            <div className='checkout-section'>
                <h3>Order Summary</h3>
                <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
                <button className='checkout-btn'>Proceed to Checkout</button>
            </div>
        </div>
    </Layout>
  )
}

export default Cart
