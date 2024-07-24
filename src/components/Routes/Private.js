import {useEffect} from 'react';
import { useUser } from '../../Context/UserContext';
import axious from 'axios'
import { Navigate, Outlet, useLocation } from 'react-router-dom';


export default function PrivateRoute()
{

    const {user,} = useUser();
    const location = useLocation();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axious.get(`/api/v1/auth/${user.data.role ? "admin" : "user-auth" }`);
            // {headers: {Authorization: token}}

            if(res.data.ok){
                console.log("Response after verifying token got OK");
            }
        }
        
        if(user?.token) {
            console.log("token provided going in authcheck!!");
            authCheck()
        }
        else{
            console.log("USER NOT FOUND - user INFO from private.js : ",user);
        }
    }, [user?.token])
    
    return user.token ? <Outlet/> :<Navigate to= "/SignIn"  state={{from: location}}/>;
}