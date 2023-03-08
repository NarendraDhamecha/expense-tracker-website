import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import Expenses from "./Expenses";
import { ExpenseAction } from "../../redux-store/ExpenseSlice";

let existingId = null;

const Home = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode)
  const email = useSelector((state) => state.auth.email);
  const expenses = useSelector((state) => state.expenses.expenses);
  const amountRef = useRef("");
  const descriptionRef = useRef("");
  const catagoryRef = useRef("");

  useEffect(() => {
    fetch(
      `https://expense-tracker-a7105-default-rtdb.firebaseio.com/expenses/${email}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const items = [];
        for (let i in data) {
          items.push({
            id: i,
            ...data[i],
          });
        }
        dispatch(ExpenseAction.addExpense(items));
      });
  }, [email]);


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let url = `https://expense-tracker-a7105-default-rtdb.firebaseio.com/expenses/${email}.json`;
    let method = "POST";

    if (existingId) {
      url = `https://expense-tracker-a7105-default-rtdb.firebaseio.com/expenses/${email}/${existingId}.json`;
      method = "PUT";
    }

    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify({
          amount: amountRef.current.value,
          description: descriptionRef.current.value,
          catagory: catagoryRef.current.value,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        let id = data.name;
        if (existingId) {
          id = existingId;
        }
        const userExpense = {
          id: id,
          amount: amountRef.current.value,
          description: descriptionRef.current.value,
          catagory: catagoryRef.current.value,
        };
        
        dispatch(ExpenseAction.addExpense([...expenses, userExpense]));
        existingId = null;
      } else {
        throw new Error(data.error.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  const deleteExpense = async (id) => {
    const res = await fetch(
      `https://expense-tracker-a7105-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      const filteredList = expenses.filter((prevItem) => {
        return prevItem.id !== id;
      });

      dispatch(ExpenseAction.addExpense(filteredList));

      console.log("Expense successfully deleted");
    }
  };

  const editExpense = (expense) => {
    amountRef.current.value = expense.amount;
    descriptionRef.current.value = expense.description;
    catagoryRef.current.value = expense.catagory;
    
    existingId = expense.id;

    const filteredList = expenses.filter((prevItem) => {
      return prevItem.id !== expense.id;
    });
    dispatch(ExpenseAction.addExpense(filteredList));
  };

  return (
    <>
      <header className="text-center">
        <h4 className={`${darkMode? classes.header: ""}`}>Welcome to expense tracker</h4>
      </header>
      <div className="d-flex justify-content-center my-4">
          <span className={classes.home}>
            Your profile is incomplete.
            <NavLink Link to="/profile">
              Complete now
            </NavLink>
          </span>
        </div>
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-md-8 col-10 mx-auto">
            <div className="card">
              <h2 className="card-header">ADD EXPENSES HERE</h2>
              <div className="card-body">
                <form onSubmit={onSubmitHandler}>
                  <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                      ref={amountRef}
                      className="form-control"
                      type="number"
                    />
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
                      <option value="Personal Spending">
                        Personal Spending
                      </option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add expenses
                  </button>
                </form>
              </div>
            </div>
            <Expenses
              expenses={expenses}
              onDelete={deleteExpense}
              onEdit={editExpense}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
