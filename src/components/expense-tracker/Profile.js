import { useContext, useEffect, useState } from "react";
import AuthContex from "../contex/AuthContex";

const Profile = () => {
  const authCtx = useContext(AuthContex);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBMCRv6A2RlE36nAMBYrfJ-3aBiPdMCfZE",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setName(data.users[0].displayName);
        setUrl(data.users[0].photoUrl);
      });
  }, [authCtx.token]);

  const fullNameHandler = (e) => {
    setName(e.target.value);
  };

  const imageUrlHandler = (e) => {
    setUrl(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (name.length === 0 || url.length === 0) {
      alert("please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBMCRv6A2RlE36nAMBYrfJ-3aBiPdMCfZE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            displayName: name,
            photoUrl: url,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
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
              <h5 className="card-title mb-4">Contact Details</h5>
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    onChange={fullNameHandler}
                    value={name}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Profile Photo URL</label>
                  <input
                    onChange={imageUrlHandler}
                    value={url}
                    type="url"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button type="submit" className="btn btn-danger ms-4">
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
