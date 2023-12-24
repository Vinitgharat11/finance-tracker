"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";

export const financeContext = createContext({
  Income: [],
  Expenses: [],
  addIncomeItems: async () => {},
  removeIncomeItem: async () => {},
  addExpensesItems: async () => {},
  removeExpensesItems:async ()=>{},
});

export default function FinanceContextProvider({ children }) {
  const [Income, setIncome] = useState([]);
  const [Expenses, setExpenses] = useState([]);

  //* add expeses data
const addExpensesItems = async(newExpense)=>{
const collectionRef = collection(db, "Expenses")
try {
  const expDoc = await addDoc(collectionRef,newExpense)
  // upadte State
  setExpenses((prevState)=>{
return[
  ...prevState,
  {
    id:expDoc.id,
    ...newExpense
  }
]
  })
} catch (error) {
  console.log(error)
}
}


  //* add income data
  const addIncomeItems = async (newIncome) => {
    const collectionRef = collection(db, "Income");
    try {
      const snapDoc = await addDoc(collectionRef, newIncome);
      // Update state
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: snapDoc.id,
            ...newIncome,
          },
        ];
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  //  delete data

  const removeIncomeItem = async (IncomeId) => {
    const docref = doc(db, "Income", IncomeId);
    try {
      deleteDoc(docref);
      setIncome((prevState) => prevState.filter((i) => i.id !== IncomeId));
    } catch (error) {
      console.log(error);
    }
  };

  const removeExpensesItem = async (ExpensesId) => {
    const docref = doc(db, "Income", ExpensesId);
    try {
      deleteDoc(docref);
      setIncome((prevState) => prevState.filter((i) => i.id !== ExpensesId));
    } catch (error) {
      console.log(error);
    }
  };

  const values = { Income,Expenses, addIncomeItems, removeIncomeItem ,addExpensesItems,removeExpensesItem };

  // fetching data from database

  // Income data
  useEffect(() => {
    const FetchIncomeDataFromDB = async () => {
      const collectionRef = collection(db, "Income");
      const IncomeDocs = await getDocs(collectionRef);

      const data = IncomeDocs.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };

    const getExpensesData = async () => {
      const collectionRef = collection(db, "Expenses");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setExpenses(data);
    };
    getExpensesData()
    FetchIncomeDataFromDB();
  }, []);


  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
