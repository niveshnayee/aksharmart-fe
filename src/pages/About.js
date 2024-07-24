import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title= 'About Us - AksharMart'>
      <div className="about-container">
        <div className="about-box">
          <h1>About Us</h1>

          <p>Welcome to our online store dedicated to Akshar-Purshotam. 
            We offer a variety of religious items, including books, idols, and accessories, 
            as well as other products like bags and clothing.</p>

          <p>Swaminarayan Bhagwan, regarded as Purshotam, is the supreme deity who founded the Swaminarayan Sampraday. 
            The Akshar-Purshotam philosophy emphasizes the eternal relationship between Akshar, 
            represented by Gunatitanand Swami, the ideal devotee, and Purshotam, represented by Swaminarayan Bhagwan, 
            the supreme deity.</p>

          <p>Akshar-Purshotam Upasana teaches the path to spiritual enlightenment through devotion and service to both Akshar
              and Purshotam. This philosophy underlines the importance of recognizing the divinity within
              and fostering a life of purity and devotion.</p>
        </div>
          
          <div className="about-image-container">
            <img src="aboutUs.jpg" alt="Swaminarayan Bhagwan and Gunatitanand Swami" className="about-image" />
          </div>
      </div>
    </Layout>
  )
}

export default About
