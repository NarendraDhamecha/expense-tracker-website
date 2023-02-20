import React, { useState } from "react";

const AuthContex = React.createContext({
    token: '',
    email: '',
    isLoggedIn: null,
    login: (token,email) => {},
    logout: () => {}
})

export const AuthContexProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const initialEmail = localStorage.getItem('email');
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState(initialEmail);

    const isLoggedIn = !!token

    const loginHandler = (token, email) => {
        setToken(token);
        setEmail(email);
        localStorage.setItem('token',token);
        localStorage.setItem('email',email);
    }

    const logoutHandler = () => {
        setToken('');
        setEmail('');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    const contextValue = {
        token: token,
        email: email,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

   return (
     <AuthContex.Provider value={contextValue}>
       {props.children}
     </AuthContex.Provider>
   )
}

export default AuthContex;