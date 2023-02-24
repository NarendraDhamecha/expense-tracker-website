import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ForgetPassword from "./components/Auth/ForgetPassword";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import AuthContex from "./components/contex/AuthContex";
import Home from "./components/expense-tracker/Home";
import Profile from "./components/expense-tracker/Profile";
import Navbar from "./components/Layout/Navbar";

const App = () => {
  const authCtx = useContext(AuthContex);

  return (
    <>
      <Navbar />
      <Switch>
        {!authCtx.isLoggedIn && <Route exact path="/" component={SignUp} />}
        {!authCtx.isLoggedIn && <Route exact path="/login" component={LogIn} />}
        {authCtx.isLoggedIn && <Route exact path="/home" component={Home} />}
        {authCtx.isLoggedIn && (
          <Route exact path="/profile" component={Profile} />
        )}
        {!authCtx.isLoggedIn && (
          <Route exact path="/forgetpassword" component={ForgetPassword} />
        )}
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default App;
