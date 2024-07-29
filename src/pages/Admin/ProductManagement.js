import {React,useEffect,useState} from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button, Modal, Form, Input} from 'antd';
import axios from "axios";
import "../../styles/ProductManagement.css";
import CreateProduct from './CreateProduct';
import { Card } from 'antd';
const { Meta } = Card;



const ProductManagement = () => {
    // FOR GETTING ALL PRODUCTS
    const [products , setProducts] = useState([]);
    
    //TO SHOW ADD VIEW 
    const [addModal, setAddModal] = useState(false);

    // SEARCH FEATURE
    const [searchTerm, setSearchTerm] = useState('');

    // UPDATE/EDIT CATEGORY
    const [editModal, setEditModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [newName, setNewName] = useState("");


    // API CALL TO GET ALL CATEGORIES
    const getAllProducts = async() =>
    {
        try {
          const {data} =  await axios.get('/api/v1/product/get-all');

          if(data?.success)
          {
            setProducts(data?.products);
          }
            
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong");
        }
    }

    // LOAD getAllCat..() FIRST TIME
    useEffect( () =>{
      getAllProducts();
    },[]);

    
    // // API CALL TO EDIT/UPDATE PRODUCT
    // const handleEdit = async(id) => {
    //   // Logic for editing a category
    //   try {
          
          
    //   } catch (error) {
    //       console.log(error);
    //       if (error.response) {
    //           // Server responded with a status other than 200 range
    //           toast.error(error.response.data.message || "Something went wrong :(");
    //       } else if (error.request) {
    //           // Request was made but no response received
    //           toast.error("No response from server. Please try again later.");
    //       } else {
    //           // Something else happened while setting up the request
    //           toast.error("Something went wrong :(");
    //       }
    //   }
      
    // };

    // API CALL TO DELETE Product
    const handleDelete = async(id) => {
      // Logic for deleting a category
      try {
        const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
        if (data.success) {
            toast.success(`Product deleted successfully`);
            getAllProducts();
        } else {
            toast.error(`${data.message}`);
        }
          
      } catch (error) {
          console.log(error);
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


    
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };


 
  return (
    <>
      <div className="product-management">
        <h2>Product Management</h2>

        <div className="actions">
          <input
              type= "text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
          />
          <button className="add-button"  onClick={() => {setAddModal(true)}}>
              <FaPlus/> 
          </button>
        </div>



        <div className="product-grid">
          {products?.map((p) => (
            <Card
              key={p._id}
              cover={
                <img
                  alt="example"
                  src={`/api/v1/product/get-photo/${p._id}`}
                />
              }
              actions={[
                <FaEdit key="edit"  onClick={() => {setSelected(p); setEditModal(true) }} />,
                <FaTrash key="delete" onClick={() => handleDelete(p._id)} />,
              ]}
            >
              <Meta
                title= {p.name}
                description= {p.description}
              />
            </Card>
          ))}

        </div>
        
      </div>

        <Modal 
            title="Edit Product"
            visible={editModal}
            onCancel={() => setEditModal(false)}
            footer={null}>
              <CreateProduct
                mode = "edit"
                product = {selected}
                onClose={() => {setSelected(null); setEditModal(false)}}
                onProductCreated={getAllProducts}
              />
        </Modal> 

        <Modal
          title="Create New Product"
          visible={addModal}
          onCancel={() => setAddModal(false)}
          footer={null}>
            <CreateProduct
              mode = "add"
              onClose={() => setAddModal(false)}
              onProductCreated={getAllProducts}
            />
         </Modal>
    </>
  );
};


export default ProductManagement;
