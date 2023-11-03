import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    let access_token = localStorage.getItem("access_token");
    let user = localStorage.getItem("user-details");
    if(user){
      const parseUser = JSON.parse(user);
      const parseToken = JSON.parse(access_token);
      setAuth({
        ...auth,
        user: parseUser,
        token: parseToken,
      })
    }
    //eslint-disable-next-time
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
