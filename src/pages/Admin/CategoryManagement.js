import {React,useEffect,useState} from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/CategoryManagement.css";



const CategoryManagement = () => {
    const [categories , setCategories] = useState([]);
    const [name, setName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddView, setShowAddView] = useState(false);



    // API CALL TO GET ALL CATEGORIES
    const getAllCategory = async() =>
    {
        try {
            const {data} = await axios.get(`/api/v1/category/get-all`);

            if(data.success)
            {
                setCategories(data.categories);
            }

            
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong");
        }
    }

    // LOAD getAllCat..() FIRST TIME
    useEffect( () =>{
        getAllCategory();
    },[]);


    // TO OPEN A VIEW TO CREATE CATEGORY
    const handleAdd = () => {
        // Logic for adding a category
        setShowAddView(true);
        console.log("opening view : ", showAddView);
      };

    // API CALL TO CREATE CATEGORY
    const handleAddCategory = async(e) => {
        // e.preventDefault();
        console.log("coming in create ", name);
        try {

            const {data} = await axios.post('/api/v1/category/create-category', {name});

            if(data.success)
            {
                toast.success(`${data.category.name} added Successfully`);
                getAllCategory();
                setName('');
                setShowAddView(false);
            } else{
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
            // toast.error("Something went wrong");
        }

    }
    
    // HELPER FUNCTION ---------
    const handleEdit = (id) => {
    // Logic for editing a category
     
    console.log('Edit category with id:', id);
    };

    const handleDelete = async(id) => {
    // Logic for deleting a category
    try {
        const {data} = await axios.delete(`/api/v1/category/delete/${id}`);
        if (data.success) {
            toast.success(`Category deleted successfully`);
            getAllCategory();
        } else {
            toast.error(`${data.message}`);
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
    
    console.log('Deleted category with id:', id);
    };

    const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    };


 
  return (
    <>
        <div className="category-management">
            <h2>Category Management</h2>

            <div className="actions">
                <input
                    type= "text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <button className="add-button" onClick={handleAdd}>
                    <FaPlus/> 
                </button>
            </div>

            {showAddView && (
                    <div className="add-category-view">
                        <h3>Add New Category</h3>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="category-input"
                            required
                        />
                        <button className="submit-button" onClick={handleAddCategory}>
                            Create
                        </button>
                        <button className="cancel-button" onClick={() => setShowAddView(false)}>
                            Cancel
                        </button>
                    </div>
            )}

            <table className="category-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {categories?.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-button" onClick={() => handleEdit(category._id)}>
                                        <FaEdit/> 
                                    </button>

                                    <button className="delete-button" onClick={() => handleDelete(category._id)}>
                                        <FaTrash/> 
                                    </button>
                                </div>       
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

             {/* Sliding view for adding category
             <div className={`add-category-view ${showAddView ? 'show' : ''}` }>
                <h3>Add New Category</h3>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="category-input"
                    required
                />
                <button className="submit-button" onClick={handleAddCategory}>
                    Create
                </button>
                <button className="cancel-button" onClick={() => setShowAddView(false)}>
                    Cancel
                </button>
            </div> */}
        </div>
    </>
  );
};

export default CategoryManagement;
