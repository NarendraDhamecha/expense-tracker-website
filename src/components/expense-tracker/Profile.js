import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ThemeActions } from "../../redux-store/ThemeSlice";

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const nameRef = useRef("");
  const urlRef = useRef("");
  const history = useHistory();
  const isLoading = useSelector((state) => state.theme.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBMCRv6A2RlE36nAMBYrfJ-3aBiPdMCfZE",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if(data.users[0].displayName && data.users[0].photoUrl){
        nameRef.current.value = data.users[0].displayName;
        urlRef.current.value = data.users[0].photoUrl;
        }
      });
  }, [token]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const url = urlRef.current.value;

    if (name.length === 0 || url.length === 0) {
      alert("please fill all fields");
      return;
    }

    dispatch(ThemeActions.setIsLoading(true));

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBMCRv6A2RlE36nAMBYrfJ-3aBiPdMCfZE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: url,
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
        alert("Your profile has been successfully updated");
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
            <h5 className="card-header bg-secondary">Contact Details</h5>
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input ref={nameRef} type="text" className="form-control" />
                </div>
                <div className="mb-4">
                  <label className="form-label">Profile Photo URL</label>
                  <input ref={urlRef} type="url" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">
                  {!isLoading ? "Update" : "Updating profile..."}
                </button>
                <button
                  className="btn btn-danger ms-4"
                  onClick={() => history.push("/greeting")}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
