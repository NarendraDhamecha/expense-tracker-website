import { Route, Switch } from "react-router-dom";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/expense-tracker/Home";
import Profile from "./components/expense-tracker/Profile";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignUp}/>
      <Route path="/login" component={LogIn}/>
      <Route path='/home' component={Home}/>
      <Route path='/completeprofile' component={Profile}/>
    </Switch>
  );
};

export default App;
