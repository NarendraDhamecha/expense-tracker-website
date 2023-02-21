import { useContext, useRef } from "react";
import { Container } from "react-bootstrap";
import classes from "./Profile.module.css";
import AuthContex from "../contex/AuthContex";

const Profile = () => {
  const authCtx = useContext(AuthContex);
  const nameRef = useRef("");
  const urlRef = useRef("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const fullName = nameRef.current.value;
    const URL = urlRef.current.value;

    if (fullName.length == 0 || URL.length == 0) {
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
            displayName: fullName,
            photoUrl: URL,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if(res.ok){
        console.log(data);
      }else{
        throw new Error(data.error.message);
      }      
    } catch (e) {
        alert(e);
    }
  };

  return (
    <Container>
      <div className={`card ${classes.profile}`}>
        <div className="card-body">
          <h5 className="card-title">Contact Details</h5>
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <label>Full Name</label>
              <input ref={nameRef} type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Profile Photo URL</label>
              <input ref={urlRef} type="url" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button type="submit" className="btn btn-danger">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
