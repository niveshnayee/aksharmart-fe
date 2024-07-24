import React from 'react';
import { FaUsers, FaBox, FaClipboardList, FaChartLine, FaCog, FaHeadset } from 'react-icons/fa';
import '../../styles/AdminDetails.css';

const AdminDetails = () => {
  return (
    <div className="dashboard-home">
      <h2>Welcome to the Admin Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">
          <FaUsers className="card-icon" />
          <div className="card-content">
            <h3>Users</h3>
            <p>Manage user accounts and roles</p>
          </div>
        </div>
        <div className="card">
          <FaBox className="card-icon" />
          <div className="card-content">
            <h3>Products</h3>
            <p>View and manage products</p>
          </div>
        </div>
        <div className="card">
          <FaClipboardList className="card-icon" />
          <div className="card-content">
            <h3>Orders</h3>
            <p>Track and manage orders</p>
          </div>
        </div>
        <div className="card">
          <FaChartLine className="card-icon" />
          <div className="card-content">
            <h3>Reports</h3>
            <p>View sales and performance reports</p>
          </div>
        </div>
        <div className="card">
          <FaCog className="card-icon" />
          <div className="card-content">
            <h3>Settings</h3>
            <p>Manage application settings</p>
          </div>
        </div>
        <div className="card">
          <FaHeadset className="card-icon" />
          <div className="card-content">
            <h3>Support</h3>
            <p>Contact support team</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetails;
