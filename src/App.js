import { Route, Switch, Redirect } from "react-router-dom";
import ForgetPassword from "./components/Auth/ForgetPassword";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/expense-tracker/Home";
import Profile from "./components/expense-tracker/Profile";
import Navbar from "./components/Layout/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const token = useSelector(state => state.auth.token);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // useEffect(() => {
  //   let id = null;
  //   console.log("useEfeect")
  //   if (token) {
  //     id = setTimeout(() => {
  //       console.log("timeout")
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("email");
  //     }, 60000 * 10);
  //   }
  //   return () => {
  //       clearTimeout(id)
  //       console.log("cleanup")
  //   };
  // }, [token]);

  return (
    <>
      <Navbar />
      <Switch>
        {!isLoggedIn && <Route exact path="/" component={SignUp} />}
        {!isLoggedIn && <Route exact path="/login" component={LogIn} />}
        {isLoggedIn && <Route exact path="/home" component={Home} />}
        {isLoggedIn && (
          <Route exact path="/profile" component={Profile} />
        )}
        {!isLoggedIn && (
          <Route exact path="/forgetpassword" component={ForgetPassword} />
        )}
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default App;
