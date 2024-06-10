import React, { useEffect, useState } from "react";
import ViewTransaction from "./ViewTransaction";
import useShowToast from "@/hooks/useShowToast";

const ViewTransactions = (props) => {
  const [total, setTotal] = useState(0);
  const [totalColor, setTotalColor] = useState("text-green-600");
  const showToast = useShowToast();
  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      props.transactions.map((transaction) => {
        if (transaction.type === "income") {
          total += parseFloat(transaction.amount);
        } else if (transaction.type === "expense") {
          total -= parseFloat(transaction.amount);
        }
      });
      if (total < 0) {
        setTotalColor("text-red-600");
      } else {
        setTotalColor("text-green-600");
      }
      setTotal(total);
    };
    calculateTotal();
  }, [props.transactions]);
  return (
    <>
      {(props.transactions.length === 0 && (
        <div className="text-royalblue-200 mt-8 text-center">
          No transactions
        </div>
      )) || (
        <div className="bg-royalblue-950 text-royalblue-200 mx-auto p-4 rounded-md">
          <ul>
            {props.transactions.map((transaction) => (
              <li key={transaction.id}>
                <ViewTransaction transaction={transaction} />
              </li>
            ))}
          </ul>
          <div className="flex justify-between p-2">
            <span>Total</span>
            <span className={totalColor}>
              {total >= 0 ? "+" : "-"} ₹{total >= 0 ? total : total * -1}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTransactions;
