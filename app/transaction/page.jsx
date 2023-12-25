"use client";

import React, { useContext, useState } from "react";
import { financeContext } from "../libs/store/financeContext";

const Transaction = () => {
  const { Expenses, Income } = useContext(financeContext);

  const [showTabs, setShowTabs] = useState([]);

  const allBalance = [...Expenses, ...Income];
  return (
    <>
      <header className="text-xl my-3 text-center font-mono ">
        <p onClick={() => setShowTabs([])}>All Transaction</p>
      </header>
      <div className="btn-section flex justify-center gap-5 py-3">
        <button
          className="btn btn-primary-outline"
          onClick={() => setShowTabs(Income)}
        >
          Income
        </button>
        <button
          className="btn btn-primary-outline"
          onClick={() => setShowTabs(Expenses)}
        >
          Expenses
        </button>
      </div>
      {/* tabs */}


{showTabs.map((i)=>(
   <div className={`flex items-center justify-between mx-5 my-3 border px-4 py-2 rounded-md ${
    i.category === "Income"
      ? "border-green-500"
      : "border-red-500"
  }`}key={i.id}>
              <p>{i.description}</p>
              <p>{i.amount}</p>
          </div>
))}

     
      <div className={`${showTabs.length > 0 && "hidden"}`}>
        {allBalance && allBalance.length > 0 && (
          <div className="">
            {allBalance.map((data) => (
              <div
                className={`flex items-center justify-between mx-5 my-3 border px-4 py-2 rounded-md ${
                  data.category === "Income"
                    ? "border-green-500"
                    : "border-red-500"
                }`}
                key={data.id}
              >
                <h4>{data.description}</h4>
                <p>{data.amount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Transaction;
