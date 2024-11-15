import Layout from '../components/Layout/Layout'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import API_URLS from '../config';
import { Card, Button, Checkbox, Radio, Pagination} from 'antd';
import Meta from 'antd/es/card/Meta';
import { ShoppingCartOutlined } from '@ant-design/icons';
import "../styles/SearchPage.css";
import { Prices } from '../components/Prices';
import { useSearch } from '../Context/SearchContext';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { toast } from 'react-hot-toast';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

const SearchPage = () => {
    const [search] = useSearch();
    const [cart, setCart] = useCart();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [totalProducts, setTotalProducts] = useState(0); // Total number of products
    const itemsPerPage = 10; // Number of items per page

    const [category] = useSearchParams();
    const query = useQuery().get('query'); // Get the current query from the URL
    const navigate = useNavigate();



    const getAllProducts = async() =>
    {
        try {
            const {data} = await axios.get(API_URLS.get_all_product_url, {
                params: {
                    page: currentPage,
                    itemPerPage: itemsPerPage,
                    search: query || search
                }
            });
            setProducts(data?.products);
            setTotalProducts(data?.totalProducts);
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
            const {data} = await axios.post(API_URLS.get_filter_products_url, 
                {
                    checked, 
                    radio, 
                    page: currentPage,
                    itemPerPage: itemsPerPage});
            if(data?.success)
            {
                setProducts(data?.products);
                setTotalProducts(data?.totalProducts);
            } 
        } catch (error) {
            console.log(error);
        }
    };


     // Pre-select the category based on the query parameter
    useEffect(() => {
        const categoryId = category?.get('id'); // Get the category ID from query params
        if (categoryId) {
            setChecked([categoryId]); // Set the category as pre-selected
        }
    }, [category]);

    useEffect( () => {
        if(checked.length || radio.length) filterProducts();
        else getAllProducts();
    },[query, checked, radio, currentPage]);

    useEffect( () =>
    {
        getAllCategory();
    }, []);


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

    const handleCart = (p) => {
        setCart((prevCart) => {
            // Check if the item already exists in the cart
            const itemIndex = prevCart.findIndex((cartItem) => cartItem.name === p.name);
      
            if (itemIndex === -1) {

                // Item does not exist, add it with quantity 1
                const newCart = [...prevCart, { ...p, q: 1 }];
                localStorage.setItem('cart', JSON.stringify(newCart));  // Save updated cart to localStorage
                toast.success(`${p.name} added to cart`);
                return newCart;
            } else {
                // Item exists, update its quantity
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].q += 1;
                localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save updated cart to localStorage
                toast.success(`${p.name} quantity increased`);
                return updatedCart;
            }
        });
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

  return (
    <Layout title={"Search - AksharMart"}>
      <div className='row mt-3'>
          
           <div className='col-md-2'>
              <h4 className='text-center'>Filter By Category</h4>
              <div className='d-flex flex-column'>
                {
                    categories.map((c) => (
                        <Checkbox 
                            key={c._id} 
                            checked={checked.includes(c._id)} // Pre-select the checkbox if the category is in the checked state
                            onChange={(e) => handleFilter(e.target.checked, c._id)}>
                            
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
                              onClick={() =>  handleCart(p)}
                            >
                              Add to Cart
                            </Button>
                          ]}
                    >
                    <Meta
                        style = { {cursor: "pointer"}}
                        onClick={() => navigate(`/product/${p.slug}`)}
                        title= {p.name}
                        description= {
                            <>
                                <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#333' }}>${p.price}</p>
                                <p>{p.description}</p>
                            </>
                        }
                    />
                    </Card> ))}
              </div>
              
              {/* Pagination Control */}
              <div className='text-center mt-4'>
                <Pagination
                    current={currentPage}
                    total={totalProducts}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`}
                />
                </div>
          </div>
      </div>
    </Layout>
  )
}

export default SearchPage
