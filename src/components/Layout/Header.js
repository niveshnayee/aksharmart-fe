import { React } from "react";
import { NavLink, Link } from "react-router-dom";
import { MdAddShoppingCart, MdAccountCircle } from "react-icons/md";
import { useUser } from "../../Context/UserContext";
import toast from "react-hot-toast";

function Header() {
  // const user = useContext(UserContext);
  const { user, setUser } = useUser();
  // console.log("user data in header file", user);

  const handleSignOut = () => {
    setUser({
      ...user,
      data: null,
      token: "",
    });
    localStorage.removeItem("user");
    toast.success("Signout Successfully!");
  };
  // console.log(user.name)
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <img src="/favicon.ico" alt="favicon" className="navbar-icon" />{" "}
              AksharMart
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/category" className="nav-link">
                  Category
                </NavLink>
              </li>

              {user.data ? (
                <>
                  <li className="nav-item dropdown ml-auto">
                    {" "}
                    {/* ml-auto aligns the dropdown to the right */}
                    <NavLink
                      to="/account"
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <MdAccountCircle /> Hello! {user.data.first_name}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink
                          to={
                            user.data.role
                              ? "/admin/dashboard"
                              : "/account/user/dashboard"
                          }
                          className="dropdown-item"
                        >
                          Account
                        </NavLink>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/SignIn" className="nav-link">
                      Sign In
                    </NavLink>
                  </li>
                </>
              )}

              {/* <li className="nav-item">
              <NavLink to= "/logIn" className="nav-link" >
                Login
              </NavLink>
            </li> */}
              <li className="nav-item">
                <NavLink to="/cart " className="nav-link">
                  <MdAddShoppingCart /> cart(0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
