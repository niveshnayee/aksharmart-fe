import React from "react";
import Layout from "../components/Layout/Layout";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from "react-icons/fa"; // Import FontAwesome icons
import { NavLink } from "react-router-dom";

const Contact = () => {
  // Function to handle sending email
  const sendEmail = () => {
    window.location.href = "mailto:info@example.com";
  };

  // Function to handle prompting phone call
  const promptCall = () => {
    const confirmCall = window.confirm("Do you want to call +1234567890?");
    if (confirmCall) {
      window.location.href = "tel:+1234567890";
    }
  };

  // // Function to handle opening chatbot
  // const openChatbot = () => {
  //   // Implement your chatbot logic here
  //   alert("Opening chatbot...");
  // };

  return (
    <Layout title="Contact Us - AksharMart">
      <div className="container contact-container">
        <h1>Contact Us</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="contact-info">
              <h2>Contact Information</h2>

              <ul className="list-unstyled">
                <li>
                  {/* <NavLink to = '/Contact' className="address" > */}
                  <FaMapMarkerAlt /> 123 Main St, City, Country
                  {/* </NavLink> */}
                </li>
                <li>
                  <NavLink to="/Contact" className="phone" onClick={promptCall}>
                    <FaPhone /> +123 456 7890
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Contact" className="email" onClick={sendEmail}>
                    <FaEnvelope /> info@example.com
                  </NavLink>
                </li>
                {/* <li>
                                <NavLink to = '/Contact' className="chat" onClick={openChatbot}>
                                    <FaQuestionCircle /> Chat with Us
                                </NavLink>
                            </li> */}
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="contact-form">
              <h2>Get in Touch!</h2>
              <p>
                {" "}
                Need to get in touch with us? Fill out the form with your
                message and we will response in less than 12-hour to your
                question.{" "}
              </p>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
