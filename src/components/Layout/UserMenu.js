import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/UserMenu.css";
const UserMenu = ({ activeKey, onSelect }) => {
  return (
    <>
      <nav className="user-menu">
        <NavLink to="/account/user/dashboard" className="menu-link">
          User Details
        </NavLink>
        
        <NavLink to="/account/user/order-history" className="menu-link">
          Order History
        </NavLink>
       
        <NavLink to="/account/user/login-security" className="menu-link">
          Login & Security
        </NavLink>
        <NavLink to="/account/user/payment-methods" className="menu-link">
          Payment Methods
        </NavLink>
        <NavLink to="/account/user/support" className="menu-link">
          Support
        </NavLink>
      </nav>
    </>
  );
};

export default UserMenu;
