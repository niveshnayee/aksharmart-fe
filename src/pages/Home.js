import {React,useState, useEffect} from "react";
import Layout from "../components/Layout/Layout";
import ImageSlider from "../components/Layout/ImageSlider";
import "./../styles/Home.css";
import API_URLS from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';


const Home = () => {

  
   const images = [
    { src: `${process.env.PUBLIC_URL}/books.jpg`, category: 'books' },
    { src: `${process.env.PUBLIC_URL}/puja-kit.jpg`, category: 'puja' },
    { src: `${process.env.PUBLIC_URL}/ghar-mandir.jpg`, category: 'mandir' },
    // Add more images as needed
  ];

  const [books , setBooks] = useState([]);
  const [murti , setMurti] = useState([]);
  const getBooksMurti = async() =>
  {
    try {
      const [booksRes, murtiRes] = await Promise.all([
        axios.get(`${API_URLS.get_product_by_category_name_url}/books`),
        axios.get(`${API_URLS.get_product_by_category_name_url}/murti`)
      ]);

      if(booksRes.data?.success && murtiRes.data?.success)
      {
        setBooks(booksRes.data.products);
        setMurti(murtiRes.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("error in getting products with category name");
    }
    
  };

  useEffect( () => {
    getBooksMurti();
  }, [])
  
  return (
    <Layout>
      {/* <h1> Home Page </h1> */}
      <ImageSlider images = {images}/>
      <hr className="horizontalLine" />
      <div className="books_div">
        <h2>Books</h2>
        <div className="product-list">
          {books.map((book) => (
            <NavLink to="/" key={book._id} className="books-item">
              <img 
                src={`${API_URLS.get_photo_url}/${book._id}`} 
                alt={book.name} 
                className="product-photo" 
              />
              <h10>{book.name}</h10>
              <p>Price: ${book.price}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
