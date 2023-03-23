import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeActions } from "../../redux-store/ThemeSlice";

const ForgetPassword = () => {
  const emailRef = useRef("");
  const isLoading = useSelector((state) => state.theme.isLoading);
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (emailRef.current.value.length === 0) {
      alert("Please enter valid email");
      return;
    }
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
            requestType: "PASSWORD-RESET",
            email: emailRef.current.value,
          }),
        }
      );
      dispatch(ThemeActions.setIsLoading(false));
      const data = await res.json();
      if (res.ok) {
        alert("Reset password link has been successfully sent to your email");
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
          <div className="card bg-dark text-white">
            <h3 className="card-header bg-secondary">FORGET PASSWORD</h3>
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <input
                    ref={emailRef}
                    className="form-control"
                    type="email"
                    placeholder="Enter your registered email"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {!isLoading ? "Send Link" : "Sending link..."}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
