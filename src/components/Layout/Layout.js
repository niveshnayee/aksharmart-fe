import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { UserProvider } from '../../Context/UserContext';

const layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title> {title} </title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "70vh", marginTop: "70px" }}>
        {children}
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
};

layout.defaultProps = {
  title: "AksharMart - Shop Now",
  description:
    "Discover a wide range of religious items related to Akshar-Purshotam, along with other products like bags and clothes. Shop now at AksharMart for quality and devotion.",
  keywords:
    "AksharMart, Swaminarayan Bhagwan, Akshar-Purshotam, religious items, devotional products, spiritual store, bags, clothes, online shopping",
  author: "AksharMart",
};

export default layout;
