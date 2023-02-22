import { useRef } from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

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

      const data = await res.json();

      if (res.ok) {
        console.log("User has successfully signed up.");
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
                <h3>SIGN UP</h3>
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
                <div className="mb-3">
                  <label className="form-label">Confirm password</label>
                  <input
                    className="form-control"
                    type="password"
                    ref={confirmPasswordRef}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-text">
                Have an account? <NavLink to="/login">Log In</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
