import { React, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API_URLS from '../config';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const navigate = useNavigate(); // TO PERFORM NAVIGATE AFTER SUCCES ON SIGN IN

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URLS.forgot_url, {
        email,
        secretKey,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/signIn");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        // Server responded with a status other than 200 range
        toast.error(error.response.data.message || "Something went wrong :(");
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please try again later.");
      } else {
        // Something else happened while setting up the request
        toast.error("Something went wrong :(");
      }
      //toast.error('Something Went Wrong :(');
    }
  };

  return (
    <Layout title="Forgot password - AksharMart">
      <div className="login-container">
        <h2>Reset Password</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="secret_key">Secret Key:</label>
            <input
              type="text"
              id="secret_key"
              name="secret_key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">RESET</button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
