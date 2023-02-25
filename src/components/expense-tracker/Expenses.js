const Expenses = (props) => {
  return (
    <div className="card my-4">
      <h2 className="card-header">EXPENSES</h2>
      <div className="card-body">
        <ul className="list-group list-group-flush mt-3">
          <li key={Math.random()} className="mb-3 d-inline text-decoration-underline">
            <div className="row">
              <h5 className="col-3">AMOUNT</h5>
              <h5 className="col-3">DESCRIPTION</h5>
              <h5 className="col-3">CATAGORY</h5>
            </div>
          </li>
          {props.expenses.map((expense) => {
            return (
              <li key={expense.id} className="list-group-item d-inline">
                <div className="row">
                  <div className="col">{expense.amount}</div>
                  <div className="col">{expense.description}</div>
                  <div className="col">{expense.catagory}</div>
                    <button onClick={() => props.onEdit(expense)} className="col-1 me-2 btn btn-dark">Edit</button>
                    <button onClick={() => props.onDelete(expense.id)} className="col-2 btn btn-danger">Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
