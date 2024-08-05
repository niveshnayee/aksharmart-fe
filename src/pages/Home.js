import React from "react";
import Layout from "../components/Layout/Layout";
import ImageSlider from "../components/Layout/ImageSlider";
import "./../styles/Home.css";


const Home = () => {

  
   const images = [
    { src: `${process.env.PUBLIC_URL}/books.jpg`, category: 'books' },
    { src: `${process.env.PUBLIC_URL}/puja-kit.jpg`, category: 'puja' },
    { src: `${process.env.PUBLIC_URL}/ghar-mandir.jpg`, category: 'mandir' },
    // Add more images as needed
  ];
  
  return (
    <Layout>
      {/* <h1> Home Page </h1> */}
      <ImageSlider images = {images}/>
      <hr className="horizontalLine" />
      <h2>Ghar Murti</h2>
      <div>

      </div>
    </Layout>
  );
};

export default Home;
