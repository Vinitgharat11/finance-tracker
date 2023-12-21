"use client";

import { useState, useRef } from "react";
import TransactionHistory from "./components/transactionHistory/TransactionHistory";
import AddIncomeModel from "./components/modal/modals/addIncomeModals";
import AddExpensesModal from "./components/modal/modals/addExpensesModal";

export default function Home() {
  const [IncomeModalIsOpen, setIncomeModalIsOpen] = useState(false);
  const [expenseModalShow, setExpenseModalShow] = useState(false);

  return (
    <>
      {/* modal */}
      <AddIncomeModel show={IncomeModalIsOpen} onClose={setIncomeModalIsOpen} />
      <AddExpensesModal show={expenseModalShow} onClose={setExpenseModalShow} />
      <header>
        {/* user Name */}
        <div className="px-3 py-1 m-2">
          <p className="text-sm">Hello,</p>
          <p className="text-xl font-thin">User2332</p>
        </div>
        <div
          className="flex flex-col items-center my-6  mx-3 gap-y-1 border max-w-2xl px-6 rounded-xl py-2 bg-slate-800/80 sm:mx-auto
       "
        >
          <p className="text-xl">Total Balance</p>
          <p className="text-xl">$30000</p>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => {
              setIncomeModalIsOpen(true);
            }}
          >
            <p className="btn btn-primary">+ income</p>
          </button>
          <button  onClick={() => {
              setExpenseModalShow(true);
            }}>
            <p className="btn btn-primary">+ expenses</p>
          </button>
        </div>
      </header>
      {/* transaction History */}
      <div className="">
        <TransactionHistory />
      </div>
    </>
  );
}
