import "./Greeting.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThemeActions } from "../../redux-store/ThemeSlice";

const Greeting = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.theme.isLoading);
  const dispatch = useDispatch();

  const verifyEmailHandler = async () => {
    dispatch(ThemeActions.setIsLoading(true));
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
      dispatch(ThemeActions.setIsLoading(false));
      const data = await res.json();

      if (res.ok) {
        alert(
          "Verification email is successfully sent to your registered EMAIL ID "
        );
      } else {
        throw new Error(data.error.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <header className="text-center">
        <h2 className={`${darkMode ? "header" : ""}`}>
          Welcome to expense tracker
        </h2>
      </header>
      <div className="d-flex flex-column align-items-center my-4">
        <span className="home">
          Your profile is incomplete.
          <NavLink Link to="/profile">
            Complete now
          </NavLink>
        </span>
        <span>
          <button
            onClick={verifyEmailHandler}
            className="btn btn-success btn-lg verify_email"
          >
            {!isLoading ? "verify email" : "Sending email..."}
          </button>
        </span>
      </div>
    </>
  );
};

export default Greeting;
