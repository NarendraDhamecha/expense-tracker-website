import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../redux-store/AuthSlice";
import { useHistory, NavLink } from "react-router-dom";
import { ThemeActions } from "../../redux-store/ThemeSlice";

const LogIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.theme.isLoading);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.length === 0 || password.length === 0) {
      alert("please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("password is too short");
      return;
    }

    dispatch(ThemeActions.setIsLoading(true));

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMCRv6A2RlE36nAMBYrfJ-3aBiPdMCfZE",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(ThemeActions.setIsLoading(false));

      const data = await res.json();
      if (res.ok) {
        dispatch(AuthActions.login({ token: data.idToken, email: data.email }));
        history.push("/greeting");
      } else {
        throw new Error(data.error.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  const forgetPasswordHandler = () => {
    history.push("/forgetpassword");
  };

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-md-4 col-10 mx-auto mt-3">
          <div className="card bg-dark text-white">
            <h3 className="card-header bg-secondary">LOG IN</h3>
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-2">
                  <input
                    ref={emailRef}
                    className="form-control"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    ref={passwordRef}
                    className="form-control"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  {!isLoading ? "Log In" : "Please wait..."}
                </button>
              </form>
              <div>
                <button
                  onClick={forgetPasswordHandler}
                  className="btn btn-danger mt-2 btn-sm"
                >
                  Forget password?
                </button>
              </div>
            </div>
          </div>
          <div className="card mt-3 bg-dark text-white">
            <div className="card-body">
              <div className="card-text">
                Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
