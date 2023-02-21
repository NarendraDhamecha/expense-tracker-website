import { NavLink } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.home}>
      <h6>Welcome to expense tracker</h6>
      <span>
        Your profile is incomplete. <NavLink to="/completeprofile">Complete now</NavLink>
      </span>
    </div>
  );
};

export default Home;
