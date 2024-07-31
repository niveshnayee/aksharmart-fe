import { useEffect , useState} from "react";
import { useUser } from "../../Context/UserContext";
import axios from "axios";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import API_URLS from '../../config';

export default function PrivateRoute() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      try {
        console.log("PRIVATE CLASS : USER ROLE : ", user.data.role);

        // const res = await axios.get(
        //   `/api/v1/auth/${location.pathname.startsWith("/admin") ? "admin" : "user-auth"}`
        // );
        const res = await axios.get(
          location.pathname.startsWith("/admin") ? API_URLS.admin_url : API_URLS.user_auth_url
        );

        if (res.data.ok) {
          console.log("Response after verifying token got OK");
          setLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access - redirecting to Home");
          toast.error("Unauthorized access. Redirecting to Home page.");
          setTimeout(() => {
            // Redirect to sign-in after a short delay to allow toast message to display
            window.location.href = "/";
          }, 1000);
        } else {
          console.error("An error occurred during authentication check", error);
          toast.error("An error occurred. Please try again.");
        }
      }
    };

    if (user?.token) {
      console.log("token provided going in authcheck!!");
      authCheck();
    } else {
      console.log("USER NOT FOUND - user INFO from private.js : ", user);
      setLoading(false);
    }
  }, [user?.token, location.pathname]);

  if (loading) {
    // You can customize this to show a loading spinner or message
    return <div>Loading...</div>;
  }
  return user.token ? (
    <Outlet />
  ) : (
    <Navigate to="/SignIn" state={{ from: location }} />
  );
}
