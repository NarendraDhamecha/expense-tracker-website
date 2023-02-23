import { useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Home.module.css";
import AuthContex from "../contex/AuthContex";
import Expenses from "./Expenses";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const authCtx = useContext(AuthContex);
  const amountRef = useRef("");
  const descriptionRef = useRef("");
  const catagoryRef = useRef("");

  const verifyEmailHandler = async () => {
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
            idToken: authCtx.token,
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

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const userExpense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      catagory: catagoryRef.current.value,
    };

    console.log(userExpense);

    setExpenses((prevItems) => [...prevItems, userExpense]);
  };

  return (
    <>
      <div className={classes.home}>
        <h6>Welcome to expense tracker</h6>
        <button onClick={verifyEmailHandler} className="btn btn-primary mb-2">
          verify email
        </button>
        <span>
          Your profile is incomplete.
          <NavLink to="/profile">Complete now</NavLink>
        </span>
      </div>
      <div className="container-fluid text-center mt-4">
        <div className="row">
          <div className="col-md-5 col-10 mx-auto">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label className="form-label">Amount</label>
                <input ref={amountRef} className="form-control" type="number" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  ref={descriptionRef}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Choose a catagory:</label>
                <select ref={catagoryRef} className="form-select">
                  <option value="Food">Food</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Travel">Travel</option>
                  <option value="Medical & Healthcare">
                    Medical & Healthcare
                  </option>
                  <option value="Personal Spending">Personal Spending</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Add expenses
              </button>
            </form>
            <Expenses expenses={expenses} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
