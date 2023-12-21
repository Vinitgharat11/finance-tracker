"use client";

import { financeContext } from "@/app/libs/store/financeContext";
import { useContext } from "react";

// Icon
import { FaRegTrashAlt } from "react-icons/fa";

const TransactionHistory = () => {
  const { Income } = useContext(financeContext);
  return (
    <>
      <div className="container mx-auto max-w-xl ">
        <div className="px-4 py-3">
          <p>Transaction History</p>
        </div>
        <section className=" data h-40 overflow-x-hidden">
          {Income.map((data) => (
            <div
              className="flex items-center justify-between px-5 py-2 my-3 bg-slate-700/75 rounded-lg mx-2"
              key={data.description}
            >
              <p>{data.description}</p>
              <div className="flex items-center gap-5">
              <p>{data.amount}</p>
              </div>
            </div>
          ))}
        </section>
        <div className="">
          <button className="btn btn-primary-outline mx-3 my-2">
            See More
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
