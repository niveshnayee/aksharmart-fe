import React from "react";
import "../../styles/UserDetails.css";
import { useUser } from "../../Context/UserContext";

const UserDetails = () => {
  const { user } = useUser();
  return (
    <div className="user-details">
      {/* <h2 className="page-title">User Dashboard</h2> */}
      <div className="detail-card">
        <h3>Account Information</h3>
        <p>
          <strong>First Name:</strong> {user.data.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {user.data.last_name}
        </p>
        <p>
          <strong>Email:</strong> {user.data.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.data.phone}
        </p>
      </div>
      <div className="detail-card">
        <h3>Address</h3>
        <p>
          <strong>Street:</strong> 123 Main St
        </p>
        <p>
          <strong>City:</strong> Cityville
        </p>
        <p>
          <strong>Country:</strong> Countryland
        </p>
      </div>
      <div className="detail-card">
        <h3>Order History</h3>
        <p>No orders placed yet.</p>
      </div>
      <div className="detail-card">
        <h3>Payment Methods</h3>
        <p>No payment methods added.</p>
      </div>
    </div>
  );
};

export default UserDetails;
