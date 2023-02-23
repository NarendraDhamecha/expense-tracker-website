const Expenses = (props) => {
  return (
    <ul className="list-group mt-3">
      {props.expenses.map((expense) => {
        return (
          <li key={Math.random()} className="list-group-item">
            <div>
              <span className="me-5">{`$${expense.amount}`}</span>
              <span className="me-5">{expense.description}</span>
              <span className="me-5">{expense.catagory}</span>
              </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Expenses;
