import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ThemeActions } from "../../redux-store/ThemeSlice";

const SignUp = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.theme.isLoading);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      alert("please fill all fields");
      return;
    }

    for (let i = 0; i < password.length; i++) {
      if (password[i] !== confirmPassword[i]) {
        alert("password and confirm password does not match");
        return;
      }
    }

    if (password.length < 6) {
      alert("password is too short");
      return;
    }

    dispatch(ThemeActions.setIsLoading(true));

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMCRv6A2RlE36nAMBYrfJ-3aBiPdMCfZE",
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
        alert("User has successfully signed up.");
        history.push("/login");
      } else {
        throw new Error(data.error.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-md-4 col-10 mx-auto">
          <div className="card bg-dark text-white">
            <h3 className="card-header bg-secondary">SIGN UP</h3>
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
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="password"
                    ref={confirmPasswordRef}
                    placeholder="Confirm Password"
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  {!isLoading ? "Sign Up" : "Please wait..."}
                </button>
              </form>
            </div>
          </div>
          <div className="card mt-3 bg-dark text-white">
            <div className="card-body">
              <div className="card-text">
                Have an account? <Link to="/login">Log In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
