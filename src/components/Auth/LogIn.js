import { useContext, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";
import AuthContex from "../contex/AuthContex";

const LogIn = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const authCtx = useContext(AuthContex);
  const history = useHistory();


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

      const data = await res.json();
      if (res.ok) {
        authCtx.login(data.idToken, data.email);
        history.push("/home");
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
        <div className="col-md-5 col-10 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="card-title mb-5">
                <h3>LOG IN</h3>
              </div>
              <form onSubmit={onSubmitHandler}>
                <div className="mb-2">
                  <label className="form-label">Email address</label>
                  <input ref={emailRef} className="form-control" type="email" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <input
                    ref={passwordRef}
                    className="form-control"
                    type="password"
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Log In
                </button>
              </form>
            </div>
          </div>
          <div className="card mt-3">
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
