import { useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Home.module.css";
import AuthContex from "../contex/AuthContex";

const Home = () => {
  const authCtx = useContext(AuthContex);

  const verifyEmailHandler = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBMCRv6A2RlE36nAMBYrfJ-3aBiPdMCfZE",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
      } else {
        throw new Error(data.error.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={classes.home}>
      <h6>Welcome to expense tracker</h6>
      <button onClick={verifyEmailHandler} className="btn btn-primary mb-2">
        verify email
      </button>
      <span>
        Your profile is incomplete.{" "}
        <NavLink to="/completeprofile">Complete now</NavLink>
      </span>
    </div>
  );
};

export default Home;
