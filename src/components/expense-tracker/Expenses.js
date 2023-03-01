const Expenses = (props) => {
  return (
    <div className="card my-4">
      <h2 className="card-header">EXPENSES</h2>
      <div className="card-body">
        <ul className="list-group list-group-flush mt-3">
          {/* <li key={Math.random()} className="mb-3 d-inline text-decoration-underline">
            <div className="row">
              <h5 className="col mx-auto">Amount</h5>
              <h5 className="col mx-auto">Description</h5>
              <h5 className="col mx-auto">catagory</h5>
            </div>
          </li> */}
          {props.expenses.map((expense) => {
            return (
              <li key={expense.id} className="list-group-item">
                <div className="row">
                  <div className="col mx-auto">{`$${expense.amount}`}</div>
                  <div className="col mx-auto">{expense.description}</div>
                  <div className="col mx-auto">{expense.catagory}</div>
                    <button onClick={() => props.onEdit(expense)} className="col-1 me-2 btn btn-dark">Edit</button>
                    <button onClick={() => props.onDelete(expense.id)} className="col-2 me-2 btn btn-danger">Delete</button>
                    {expense.amount > 10000 && <button className="col-3 btn btn-primary">activate Premium</button>}
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
