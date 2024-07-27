import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { Route, Routes } from "react-router-dom";
import UserDetails from "../../components/Layout/UserDetails";

const Dashboard = () => {
  return (
    <Layout title="Dashboard - AksharMart">
      <div className="account-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <UserMenu />
            </div>
            <div className="col-md-8">
              <Routes>
                <Route path="/dashboard" element={<UserDetails />} />
                <Route
                  path="account-settings"
                  element={<div>Account Settings Content</div>}
                />
                <Route
                  path="order-history"
                  element={<div>Order History Content</div>}
                />
                <Route
                  path="address-settings"
                  element={<div>Address Settings Content</div>}
                />
                <Route
                  path="login-security"
                  element={<div>Login & Security Content</div>}
                />
                <Route
                  path="payment-methods"
                  element={<div>Payment Methods Content</div>}
                />
                <Route path="support" element={<div>Support Content</div>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
