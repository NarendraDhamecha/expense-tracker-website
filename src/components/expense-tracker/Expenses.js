import { ThemeActions } from "../../redux-store/ThemeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./Expenses.css";

const Expenses = (props) => {
  const activatePremium = useSelector((state) => state.theme.activatePremium);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const dispatch = useDispatch();

  const activatePremiumHandler = () => {
    dispatch(ThemeActions.actPremium(true));
    alert("Congratulations your premium benefits unlocked");
  };

  const totalAmount = props.expenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);

  useEffect(() => {
    if (totalAmount < 10000) {
      dispatch(ThemeActions.actPremium(false));
      if (darkMode) {
        dispatch(ThemeActions.changeTheme());
      }
    }
  }, [totalAmount, darkMode, dispatch]);

  const blob = new Blob([JSON.stringify(props.expenses)]);

  const url = URL.createObjectURL(blob);

  return (
    <div className="expenses">
      <h2>EXPENSES</h2>
      <ul>
        {props.expenses.map((expense) => {
          return (
            <li key={expense.id}>
              <div>
                <b>Amount:</b> {`$${expense.amount}`}
              </div>
              <div>
                <b>Description:</b> {expense.description}
              </div>
              <div>
                <b>Catagory:</b> {expense.catagory}
              </div>
              <button
                onClick={() => props.onEdit(expense)}
                className=" btn btn-warning btn-sm"
              >
                Edit
              </button>
              <button
                onClick={() => props.onDelete(expense.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </li>
          );
        })}
        {props.expenses.length === 0 && <h3>No expenses added</h3>}
      </ul>
      <div className="footer">
        {totalAmount >= 10000 && (
          <button
            onClick={activatePremiumHandler}
            className="btn btn-secondary btn-sm"
          >
            Activate Premium
          </button>
        )}
        {activatePremium && (
          <a className="btn btn-success btn-sm" download="file.csv" href={url}>
            Download Expenses
          </a>
        )}
      </div>
    </div>
  );
};

export default Expenses;
