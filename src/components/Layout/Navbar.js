import { NavLink, useHistory } from "react-router-dom";
import { AuthActions } from "../../redux-store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

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
            idToken: token,
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
                <NavLink className="nav-link" to="/home">
                  HOME
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
                  className="btn btn-primary btn-sm mt-1 ms-2"
                >
                  Log Out
                </button>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button
                  onClick={verifyEmailHandler}
                  className="btn btn-secondary btn-sm mt-1 ms-2"
                >
                  verify email
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
