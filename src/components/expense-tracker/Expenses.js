import { ThemeActions } from "../../redux-store/ThemeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Expenses = (props) => {
  const activatePremium = useSelector(state => state.theme.activatePremium);
  const dispatch = useDispatch();

  const activatePremiumHandler = () => {
     dispatch(ThemeActions.actPremium(true));
     alert('Congratulations your premium benefits unlocked')
  }

  const totalAmount = props.expenses.reduce((total, expense) => {
    return total + Number(expense.amount);
  }, 0);

  useEffect(() => {
    if(totalAmount < 10000){ 
     dispatch(ThemeActions.actPremium(false));
    }
  },[totalAmount])

  const blob = new Blob([JSON.stringify(props.expenses)])

  const url = URL.createObjectURL(blob);

  return (
    <div className="card my-4">
      <h2 className="card-header">EXPENSES</h2>
      <div className="card-body">
        <ul className="list-group list-group-flush mt-3">
          <li
            key={Math.random()}
            className="mb-3 d-inline text-decoration-underline"
          >
            <div className="row">
              <h5 className="col-3">Amount</h5>
              <h5 className="col-3">Description</h5>
              <h5 className="col-3">Catagory</h5>
            </div>
          </li>
          {props.expenses.map((expense) => {
            return (
              <li key={expense.id} className="list-group-item">
                <div className="row">
                  <div className="col">{`$${expense.amount}`}</div>
                  <div className="col">{expense.description}</div>
                  <div className="col">{expense.catagory}</div>
                  <button
                    onClick={() => props.onEdit(expense)}
                    className="col-1 me-2 btn btn-dark"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => props.onDelete(expense.id)}
                    className="col-2 btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="card-footer">
          {!activatePremium && totalAmount >= 10000 && (
             <button onClick={activatePremiumHandler} className="mt-3 btn btn-primary">Activate Premium</button>
          )}
          {activatePremium && <a download="file.csv" href={url}>Download Expenses</a>}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
