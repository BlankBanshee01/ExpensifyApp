import React from "react";
import { Link } from "react-router-dom";

const expenseListItem = ({ description, amount, createdAt, id }) => {
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>Amount: {amount}</p>
      <p>Date: {createdAt}</p>
    </div>
  );
};

export default expenseListItem;
