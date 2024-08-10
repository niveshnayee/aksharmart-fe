import Layout from '../components/Layout/Layout'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import API_URLS from '../config';
import { Card, Button, Checkbox, Radio } from 'antd';
import Meta from 'antd/es/card/Meta';
import { ShoppingCartOutlined } from '@ant-design/icons';
import "../styles/SearchPage.css";
import { Prices } from '../components/Prices';


const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const itemsPerPage = 10; // Number of items per page



    const getAllProducts = async() =>
    {
        try {
            const {data} = await axios.get(API_URLS.get_all_product_url);
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllCategory = async() =>
    {
        try {
        const {data} = await axios.get(API_URLS.get_all_category_url);

        if(data?.success)
        {
            setCategories(data.categories);
        }
        
        } catch (error) {
            console.log(error);
        }
    };

      // Filter Products
      const filterProducts = async() => {
        try {
            const {data} = await axios.post(API_URLS.get_filter_products_url, {checked, radio});
            if(data?.success)
            {
                setProducts(data.products);
            } 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect( () => {
        if(!checked.length && !radio.length) getAllProducts();
        getAllCategory();
    },[checked.length, radio.length]);

    useEffect( () => {
        if(checked.length || radio.length) filterProducts();
    },[checked, radio]);

    useEffect( () => {
        // get products
    },[currentPage]);


    // filter by Cat..
    const handleFilter = (value, id) =>
    {
        let all = [...checked];
        if(value){
            all.push(id);
        }
        else{
            all = all.filter(c => c!== id);
        }

        setChecked(all);
    } 

    const handleAddToCart = (productId) => {
        // Add to cart logic here
        console.log("Added to cart:", productId);
      };

  return (
    <Layout title={"Search - AksharMart"}>
      <div className='row mt-3'>
          
           <div className='col-md-2'>
              <h4 className='text-center'>Filter By Category</h4>
              <div className='d-flex flex-column'>
                {
                    categories.map((c) => (
                        <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                            {c.name}
                        </Checkbox>
                    ))
                }
              </div>
              
              {/* Price Filter */}
              <h4 className='text-center mt-4'>Filter By Price</h4>
              <div className='d-flex flex-column'>
                <Radio.Group onChange={e => setRadio(e.target.value)}>
                    {
                        Prices?.map((p) => (
                            <div key={p._id}>
                                <Radio value={p.array}>{p.name}</Radio>
                            </div>
                        ))
                    }
                </Radio.Group>
              </div>

              <div className='d-flex flex-column'>
                  <button 
                    className='btn btn-danger'
                    onClick={() => window.location.reload()}
                    style={{width:"70px", height: "35px", marginTop: "10px" , alignSelf: 'center'}}>
                    
                    RESET</button>
              </div>
          </div>

          <div className='col-md-9'>
             
              <h1 className='text-center'>All Products</h1>
              <div className='d-flex flex-wrap'>
                {products?.map((p) => ( 
                    <Card
                        key={p._id}
                        cover={
                            <img
                            alt="example"
                            src={`${API_URLS.get_photo_url}/${p._id}`}
                            />
                        }

                        actions={[
                            <Button
                              type="primary"
                              icon={<ShoppingCartOutlined />}
                              onClick={() => handleAddToCart(p._id)}
                            >
                              Add to Cart
                            </Button>
                          ]}
                    >
                    <Meta
                        title= {p.name}
                        description= {
                            <>
                                <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#333' }}>${p.price}</p>
                                <p>{p.description}</p>
                            </>
                        }
                    />
                    </Card>
                ))}
              </div>
          </div>
      </div>
    </Layout>
  )
}

export default SearchPage
