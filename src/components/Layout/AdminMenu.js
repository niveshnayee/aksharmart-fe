import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/AdminMenu.css";
const AdminMenu = ({ activeKey, onSelect }) => {
  return (
    <>
      <nav className="admin-menu">
        <NavLink to="/admin/dashboard" className="menu-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className="menu-link">
          Users
        </NavLink>
        <NavLink to="/admin/products" className="menu-link">
          Products{" "}
        </NavLink>
        <NavLink to="/admin/category" className="menu-link">
          Category{" "}
        </NavLink>
        <NavLink to="/admin/orders" className="menu-link">
          Orders{" "}
        </NavLink>
        <NavLink to="/admin/reports" className="menu-link">
          Reports
        </NavLink>
        <NavLink to="/admin/content" className="menu-link">
          {" "}
          Content{" "}
        </NavLink>
        <NavLink to="/admin/support" className="menu-link">
          Support{" "}
        </NavLink>
        <NavLink to="/admin/settings" className="menu-link">
          Settings
        </NavLink>
      </nav>
    </>
  );
};

export default AdminMenu;
