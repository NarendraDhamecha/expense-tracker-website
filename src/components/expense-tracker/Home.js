import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Expenses from "./Expenses";
import { ExpenseAction } from "../../redux-store/ExpenseSlice";
import { ThemeActions } from "../../redux-store/ThemeSlice";

let existingId = null;

const Home = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const expenses = useSelector((state) => state.expenses.expenses);
  const isLoading = useSelector((state) => state.theme.isLoading);
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
  }, [email, dispatch]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      amountRef.current.value.length === 0 ||
      descriptionRef.current.value.length === 0
    ) {
      alert("Please fill all input fields");
      return;
    }

    let url = `https://expense-tracker-a7105-default-rtdb.firebaseio.com/expenses/${email}.json`;
    let method = "POST";

    if (existingId) {
      url = `https://expense-tracker-a7105-default-rtdb.firebaseio.com/expenses/${email}/${existingId}.json`;
      method = "PUT";
    }
    dispatch(ThemeActions.setIsLoading(true));
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
      dispatch(ThemeActions.setIsLoading(false));
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
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <div className="card bg-dark text-white">
              <h2 className="card-header bg-secondary">ADD EXPENSES HERE</h2>
              <div className="card-body">
                <form onSubmit={onSubmitHandler}>
                  <div className="mb-3">
                    <input
                      ref={amountRef}
                      className="form-control"
                      type="number"
                      placeholder="Amount"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      ref={descriptionRef}
                      className="form-control"
                      type="text"
                      placeholder="Description"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">
                      Choose a catagory:
                    </label>
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
                    {!isLoading ? "Add expense" : "Adding expense..."}
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
