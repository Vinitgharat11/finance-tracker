import React, { useContext, useRef } from "react";
import Modal from "../modal";
import { financeContext } from "@/app/libs/store/financeContext";
import { FaRegTrashAlt } from "react-icons/fa";

const AddExpensesModal = ({ show, onClose }) => {
  const { Expenses, addExpensesItems ,removeExpensesItems} = useContext(financeContext);
  const amountRef = useRef();
  const descriptionRef = useRef();

console.log(Expenses)

  const addExpensesHandler = async (e) => {
    e.preventDefault();

    const newExpenses = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      category:"Expenses",
      color:"#811F1B"
    };

    // for passing expenses value in context API
    try {
      await addExpensesItems(newExpenses);
    } catch (error) {
      console.log(error);
    }
  };

    // delete handler function

    const removeExpensesHandler = async (ExpensesId) => {
      try {
        await removeExpensesItems(ExpensesId);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Modal show={show} onClose={onClose}>
      <p className="text-2xl mx-1 pb-4">Expenses</p>
      <form onSubmit={addExpensesHandler} className="flex flex-col gap-y-1">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="amount" className="mx-1">
            Expenses Amount
          </label>
          <input
            name="amount"
            type="number"
            ref={amountRef}
            className="text-white bg-slate-900/50 p-2 rounded-md "
          />
        </div>
        <div>
          <label htmlFor="description" className="mx-1">
            Expenses Description
          </label>
          <input
            name="description"
            type="text"
            ref={descriptionRef}
            className="text-white bg-slate-900/50 p-2 rounded-md"
          />
        </div>
        <button className="btn btn-primary self-start mx-1 my-2">
          Add Entry
        </button>
      </form>
      {Expenses.map((i) => {
        return (
          <div className="flex justify-between item-center" key={i.id}>
            <div>
              <p className="font-semibold">{i.description}</p>
              {/* <small className="text-xs">{i.createdAt.toISOString()}</small> */}
            </div>
            <p className="flex items-center gap-2">
              {i.amount}
              <button
                onClick={() => {
                  removeExpensesHandler(i.id);
                }}
              >
                <FaRegTrashAlt />
              </button>
            </p>
          </div>
        );
      })}
    </Modal>
  );
};

export default AddExpensesModal;
