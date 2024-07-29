import {React,useState, useEffect} from "react";
import { toast } from "react-toastify";
import { Button, Form, Input, Select} from 'antd';
import axios from "axios";

const {Option} = Select;

const CreateProduct = ({mode, product, onClose , onProductCreated}) =>
{
    console.log(product, " in create/edit product");
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState(product?.name || '');
    const [description, setDescription] = useState(product?.description || '');
    const [price, setPrice] = useState(product?.price || '');
    const [category, setCategory] = useState(product?.category || '');
    const [quantity, setQuantity] = useState(product?.quantity || '');
    const [photo, setPhoto] = useState(null);
    const [shipping, setShipping] = useState(product?.shipping || null);
 
    // API CALL TO GET ALL CATEGORIES
    const getAllCategory = async() =>
    {
        try {
            const {data} = await axios.get(`/api/v1/category/get-all`);

            if(data?.success)
            {
                setCategories(data?.categories);
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

    

    useEffect(() => {
        if (mode === "edit" && product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setQuantity(product.quantity);
            setShipping(product.shipping);
            // Optionally set the photo if you have a URL
            // setPhoto(product.photoUrl);
        }
    }, [mode, product]);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setPhoto(uploadedFile);
    };

    // API CALL TO CREATE PRODUCT
    const handleAdd = async() => {
        // Logic for adding a category
        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('quantity', quantity);
            formData.append('photo', photo);

            if(shipping !== null)
            {
                formData.append('shipping', shipping);
            }

            // const {data} = await axios.post('/api/v1/product/create', formData);

            const url = mode === "add" ? '/api/v1/product/create' : `/api/v1/product/update-product/${product._id}`;
            const method = mode === "add" ? 'post' : 'put';

            const { data } = await axios({ url, method, data: formData });


            if(data.success)
            {
                // toast.success(`${data.product.name} added Successfully`);
                toast.success(`${data.product.name} ${mode === "add" ? 'added' : 'updated'} Successfully`);
                setName('');
                setDescription('');
                setPrice('');
                setCategory('');
                setQuantity('');
                setPhoto(null);
                setShipping(null);

                onProductCreated();
                onClose();
            }else
                toast.error(data.message);
            
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

    return (
        <>
            <Form onFinish={handleAdd}>
                <Form.Item label="Product Name" required tooltip="This is a required field">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" required/>
                </Form.Item>

                <Form.Item label="Product Description" required tooltip="This is a required field">
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Enter product description" required/>
                </Form.Item>

                <Form.Item label="Product Price" required>
                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                        required
                    />
                </Form.Item>

                <Form.Item label = "Product Category" required>
                    <Select 
                        placeholder = "Select Category" 
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        required
                        onChange = {(value) => {setCategory(value)}}
                        value={category}>
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                

                <Form.Item label="Product Quantity" required tooltip="This is a required field">
                    <Input 
                        type="number"
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        placeholder="Enter product Quantity" 
                        required/>
                </Form.Item>

                <Form.Item label="Upload Photo" required>
                    <label className="btn btn-outline-secondary col-md-12">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleFileChange}
                            hidden
                        />
                    </label>

                    {photo && (
                        <div className="text-center">
                            <img src={URL.createObjectURL(photo)} alt="product_photo" style={{ maxWidth: '200px', marginTop: '10px' }} />
                        </div>
                    )}
                </Form.Item>


                <Form.Item label="Shipping">
                    <Select
                        placeholder="Select Shipping "
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        onChange={(value) => {
                        setShipping(value);}}
                        value={shipping}>
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                    </Select>
                </Form.Item>
                


                <Button type="primary" htmlType="submit">
                    {(mode === "add") ? "Create" : "Edit"}
                </Button>
            </Form>
        </>
    );

};

export default CreateProduct;