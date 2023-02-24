const Expenses = (props) => {
  return (
    <div className="card my-4">
      <h2 className="card-header">EXPENSES</h2>
      <div className="card-body">
        <ul className="list-group list-group-flush mt-3">
          <li className=" d-inline mb-3 text-decoration-underline">
            <div className="row">
              <h5 className="col">AMOUNT</h5>
              <h5 className="col">DESCRIPTION</h5>
              <h5 className="col">CATAGORY</h5>
            </div>
          </li>
          {props.expenses.map((expense) => {
            return (
              <li key={Math.random()} className="list-group-item d-inline">
                <div className="row">
                  <div className="col">{expense.amount}</div>
                  <div className="col">{expense.description}</div>
                  <div className="col">{expense.catagory}</div>
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
