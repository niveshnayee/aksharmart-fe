import {React, useState} from "react";
import "../../styles/UserDetails.css";
import { useUser } from "../../Context/UserContext";
import { Modal, Button, Input } from "antd";
import { FaEdit } from "react-icons/fa";

const UserDetails = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [card, setCard] = useState(null);

  const openEditModal = (cardName) => {
    setCard(cardName);
    if(cardName === "account")
    {
      setFormData({
        first_name: user.data.first_name,
        last_name: user.data.last_name,
        email: user.data.email,
        phone: user.data.phone,
      });
    }
    else if(cardName === "address")
    {
      setFormData({
        street: user.street,
        city: user.city,
        country: user.country,
      });
    }
  };

  // Close the modal and clear the form data
  const closeEditModal = () => {
    setCard(null);
    setFormData({});
    // setError("");
  };

  const handleSave = () =>{

  };

   // Handle input changes within the modal
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="user-details">
      {/* Account Information Card */}
      <div className="detail-card">
        <div className="card-header">
          <h3>Account Information</h3>
        </div>
        <p><strong>First Name:</strong> {user.data.first_name}</p>
        <p><strong>Last Name:</strong> {user.data.last_name}</p>
        <p><strong>Email:</strong> {user.data.email}</p>
        <p><strong>Phone:</strong> {user.data.phone}</p>
        <FaEdit onClick={() => openEditModal("account")} className="edit-icon" />
      </div>

      {/* Address Card */}
      <div className="detail-card">
        <div className="card-header">
          <h3>Address</h3>
        </div>
        <p><strong>Street:</strong> {user.street}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <FaEdit onClick={() => openEditModal("address")} className="edit-icon" />
      </div>

      {/* <div className="detail-card">
        <h3>Payment Methods</h3>
        <p>No payment methods added.</p>
      </div> */}

      {/* Edit Modal */}
      <Modal
        title={card === "account" ? "Edit Account Information" : "Edit Address"}
        visible={!!card}
        onCancel={closeEditModal}
        footer={[
          <Button key="cancel" onClick={closeEditModal}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        {card === "account" && (
          <div>
            <p><strong>First Name:</strong></p>
            <Input name="first_name" value={formData.first_name} onChange={handleChange} />
            <p><strong>Last Name:</strong></p>
            <Input name="last_name" value={formData.last_name} onChange={handleChange} />
            <p><strong>Email:</strong></p>
            <Input name="email" value={formData.email} onChange={handleChange} />
            <p><strong>Phone:</strong></p>
            <Input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
        )}
        {card === "address" && (
          <div>
            <p><strong>Street:</strong></p>
            <Input name="street" value={formData.street} onChange={handleChange} />
            <p><strong>City:</strong></p>
            <Input name="city" value={formData.city} onChange={handleChange} />
            <p><strong>Country:</strong></p>
            <Input name="country" value={formData.country} onChange={handleChange} />
          </div>
        )}
        {/* {error && <p className="error-message">{error}</p>} */}
      </Modal>
    </div>
  );
};

export default UserDetails;
