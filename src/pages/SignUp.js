import { React, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../Context/UserContext";
import API_URLS from '../config';

const SignUp = () => {
  const [name, setName] = useState({ first: "", last: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const { user, setUser } = useUser();
  console.log("user", user);
  const navigate = useNavigate(); // TO PERFORM NAVIGATE AFTER SUCCES ON SIGN UP

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URLS.register_url, {
        firstName: name.first,
        lastName: name.last,
        email,
        password,
        secretKey,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setUser({
          ...user,
          data: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
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
    }
  };

  return (
    <Layout title={"Sign Up - AksharMart"}>
      <div className="sign-up-container">
        <h2>Sign Up Here</h2>
        <form className="sign-up-form" onSubmit={submitHandle}>
          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={name.first}
              onChange={(e) =>
                setName((prevName) => ({ ...prevName, first: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={name.last}
              onChange={(e) =>
                setName((prevName) => ({ ...prevName, last: e.target.value }))
              }
              required
            />
          </div>

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

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/SignIn">Login here</Link>
        </p>
      </div>
    </Layout>
  );
};

export default SignUp;
