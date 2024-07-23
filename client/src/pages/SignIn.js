import {React, useState} from 'react'
import Layout from '../components/Layout/Layout';
import { Link, useLocation,useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUser } from '../Context/UserContext';



const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // TO PERFORM NAVIGATE AFTER SUCCES ON SIGN IN
    const location = useLocation();

    const {user,setUser} = useUser();
    console.log("user",user);



    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/login`,{email,password} );

            if(res.data.success)
            {
                toast.success(res.data.message);
                // console.log(res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data));
                setUser({
                    ...user,
                    data : res.data.user,
                    token: res.data.token
                })
                navigate(location.state?.from?.pathname || "/");
            }else{
                toast.error(res.data.message);
            }

        } catch (error) {
            // console.log(error);
            if (error.response) {
                // Server responded with a status other than 200 range
                toast.error(error.response.data.message || 'Something went wrong :(');
            } else if (error.request) {
                // Request was made but no response received
                toast.error('No response from server. Please try again later.');
            } else {
                // Something else happened while setting up the request
                toast.error('Something went wrong :(');
            }
            //toast.error('Something Went Wrong :(');
        }
    }
    
    return (
    <Layout title={'Login - AksharMart'}>
      <div className='login-container'>
        <h2>Sign In Here</h2>
        <form className='login-form' onSubmit={handleSubmit}>

          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input 
                type='email' 
                id='email' 
                name='email' 
                value = {email} 
                onChange={(e) => setEmail(e.target.value)}
                required />
          </div> 

          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input 
                type='password' 
                id='password' 
                name='password' 
                value = {password}  
                onChange={(e) => setPassword(e.target.value)}
                required />
          </div>
          
          <div className='mb-1'>
            <button type='button' className='btn btn-primary' onClick={() => {navigate("/forgot-password")}} >Forgot Password</button>
          </div>
          
          <button type='submit'>Sign In</button>
        </form>

        <p>Don't have an account? <Link to='/signUp'>Sign up here</Link></p>
      </div>
    </Layout>
  )
}

export default SignIn;
