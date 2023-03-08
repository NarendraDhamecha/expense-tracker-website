import { Route, Switch } from "react-router-dom";
import ForgetPassword from "./components/Auth/ForgetPassword";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/expense-tracker/Home";
import Profile from "./components/expense-tracker/Profile";
import Navbar from "./components/Layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ThemeActions } from "./redux-store/ThemeSlice";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const activatePremium = useSelector((state) => state.theme.activatePremium);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const themeHandler = () => {
    dispatch(ThemeActions.changeTheme());
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#292c35" : "#fff";
  }, [darkMode]);

  useEffect(() => {
    let id = null;
    console.log("useEfeect")
    if (token) {
      id = setTimeout(() => {
        console.log("timeout")
        localStorage.removeItem("token");
        localStorage.removeItem("email");
      }, 60000 * 10);
    }
    return () => {
        clearTimeout(id)
        console.log("cleanup")
    };
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-end">
        {isLoggedIn && activatePremium && (
          <button onClick={themeHandler} className={`btn ${darkMode ? "btn-light" : "btn-dark"} me-2`}>
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
        )}
      </div>
      <Switch>
        {!isLoggedIn && <Route exact path="/signup" component={SignUp} />}
        {!isLoggedIn && <Route exact path="/login" component={LogIn} />}
        {isLoggedIn && <Route exact path="/home" component={Home} />}
        {isLoggedIn && <Route exact path="/profile" component={Profile} />}
        {!isLoggedIn && (
          <Route exact path="/forgetpassword" component={ForgetPassword} />
        )}
      </Switch>
    </>
  );
};

export default App;
