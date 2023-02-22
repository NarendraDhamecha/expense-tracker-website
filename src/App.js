import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
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
    <Navbar/>
    <Switch>
      <Route path="/signup" component={SignUp}/>
      <Route path="/login" component={LogIn}/>
      <Route path='/home' component={Home}/>
      <Route path='/profile' component={Profile}/>
    </Switch>
    </>
  );
};

export default App;
