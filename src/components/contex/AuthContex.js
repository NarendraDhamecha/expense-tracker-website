import React, { useEffect, useState } from "react";

const AuthContex = React.createContext({
  token: "",
  email: "",
  isLoggedIn: null,
  login: (token, email) => {},
  logout: () => {},
});

export const AuthContexProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    let id = null;
    console.log("useEfeect")
    if (token) {
      id = setTimeout(() => {
        console.log("timeout")
        localStorage.clear();
      }, 60000 * 15);
    }
    return () => {
        clearTimeout(id)
        console.log("cleanup")
    };
  }, [token]);

  const isLoggedIn = !!token;

  const loginHandler = (token, email) => {
    const replacedEmail = email.replace(/[@,.]/g,"")
    
    setToken(token);
    setEmail(replacedEmail);
    localStorage.setItem("token", token);
    localStorage.setItem("email", replacedEmail);
  };

  const logoutHandler = () => {
    setToken("");
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContex.Provider value={contextValue}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
