import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// const USER = {
//   data:null,
//   token: ""
// };
const setUser = () => {};

const updateUser = () => {
  try {
    const userData = localStorage.getItem("user");
    console.log("Token from localStorage:", userData); // Debugging log
    const USER = {
      data: null,
      token: "",
    };

    if (userData) {
      const parseData = JSON.parse(userData);
      USER.data = parseData.user;
      USER.token = parseData.token;
    }
    return USER;
  } catch (error) {
    console.error("Error handling token:", error);
  }
};

const UserContext = createContext({ updateUser, setUser });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(updateUser);
  console.log(user);
  //defualt axios
  axios.defaults.headers.common["Authorization"] = user?.token;

  // useEffect(() => {
  //     try {
  //       const userData = localStorage.getItem('user');
  //       console.log('Token from localStorage:', userData); // Debugging log
  //       if (userData) {
  //           const parseData = JSON.parse(userData);

  //           setUser({
  //               ...user,
  //               data : parseData.user,
  //               token: parseData.token
  //           })
  //       }
  //     } catch (error) {
  //       console.error('Error handling token:', error);
  //     }
  //     // eslint-disable-next-line

  // },[setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

//custom hook
const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
