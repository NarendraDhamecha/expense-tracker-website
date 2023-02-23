import { useRef } from "react";

const ForgetPassword = () => {
  const emailRef = useRef("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

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
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-md-5 col-10 mx-auto">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">FORGET PASSWORD</h3>
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label className="form-label">
                    Enter the email with which you have registered.
                  </label>
                  <input ref={emailRef} className="form-control" type="email" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Link
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
