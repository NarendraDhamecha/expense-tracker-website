import { NavLink, useHistory } from "react-router-dom";
import { AuthActions } from "../../redux-store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogOut = () => {
    dispatch(AuthActions.logout());
    history.replace("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="home">
          EXPENSE TRACKER
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/greeting">
                  HOME
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  EXPENSES
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  PROFILE
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  LOG IN
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  SIGN UP
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button
                  onClick={onLogOut}
                  className="btn btn-danger btn-sm mt-1 ms-2"
                >
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
