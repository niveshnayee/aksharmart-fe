import React from "react";
import Layout from "../../components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminDetails from "../../components/Layout/AdminDetails";
import UserManagement from "./UserManagement";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import Reports from "./Reports";
import ContentManagement from "./ContentManagement";
import Support from "./Support";
import Settings from "./Settings";
import CategoryManagement from "./CategoryManagement";

const AdminDashboard = () => {
  return (
    <Layout title="Admin Dashboard - AksharMart">
      <div className="admin-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <AdminMenu />
            </div>
            <div className="col-md-8">
              <Routes>
                <Route path="/dashboard" element={<AdminDetails />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="category" element={<CategoryManagement/>} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="reports" element={<Reports />} />
                <Route path="content" element={<ContentManagement />} />
                <Route path="support" element={<Support />} />
                <Route path="settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
