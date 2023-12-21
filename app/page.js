"use client";

import { useState, useRef, useEffect, useContext } from "react";
import Modal from "./components/modal/modal";
import TransactionHistory from "./components/transactionHistory/TransactionHistory";

// firebase
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./libs/firebase";

import { FaRegTrashAlt } from "react-icons/fa";
import { financeContext } from "./libs/store/financeContext";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { Income, addIncomeItems, removeIncomeItem } =
    useContext(financeContext);

  const openHander = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // Income Handler function

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    try {
      await addIncomeItems(newIncome);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  // delete handler function

const removeIncomeHandler = async(IncomeId)=>{
  try {
    await removeIncomeItem(IncomeId)
  } catch (error) {
    console.log(error)
  }
}


  return (
    <>
      {/* modal */}
      <Modal show={modalIsOpen} onClose={setModalIsOpen}>
        <p className="text-2xl mx-1 pb-4">Income</p>
        <form onSubmit={addIncomeHandler} className="flex flex-col gap-y-1">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="amount" className="mx-1">
              Income Amount
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
              Income Description
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

        {/* prev transaction in income model */}

        {Income.map((i) => {
          return (
            <div className="flex justify-between item-center" key={i.id}>
              <div>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">{i.createdAt.toISOString()}</small>
              </div>
              <p className="flex items-center gap-2">
                {i.amount}
                <button
                  onClick={() => {
                    removeIncomeHandler(i.id);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </Modal>
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
          <button onClick={openHander}>
            <p className="btn btn-primary">+ income</p>
          </button>
          <button onClick={openHander}>
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
