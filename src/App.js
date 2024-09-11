import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import SearchPage from "./pages/SearchPage";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/Routes/Private";
import Dashboard from "./pages/user/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/account" element={<PrivateRoute />}>
          <Route path="user/*" element={<Dashboard />} />
        </Route>
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="*" element={<AdminDashboard />} />
        </Route>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path = "/search" element={<SearchPage/>}/>
        <Route path = "/search/:category?" element={<SearchPage/>}/>
        <Route path = "/cart" element={<Cart/>}/>
      </Routes>
    </>
  );
}

export default App;
