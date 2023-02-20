import { Route, Switch } from "react-router-dom";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/expense-tracker/Home";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <SignUp />
      </Route>
      <Route path="/login">
        <LogIn />
      </Route>
      <Route path='/home'>
        <Home/>
      </Route>
    </Switch>
  );
};

export default App;
