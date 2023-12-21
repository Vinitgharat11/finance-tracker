'use client'

import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";

export const financeContext = createContext({
  Income: [],
  addIncomeItems: async () => {},
  removeIncomeItem: async () => {},
});

export default function FinanceContextProvider({ children }) {
  const [Income ,setIncome]=useState([])
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

  const values = { Income, addIncomeItems, removeIncomeItem };

  // fetching data from database

  useEffect(() => {
    const FetchIncomeDataFromDB = async () => {
      const collectionRef = collection(db, "Income");
      const IncomeDocs = await getDocs(collectionRef);

      const data = IncomeDocs.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt:new Date(doc.data().createdAt.toMillis())
        };
      });
      setIncome(data)
    };
    FetchIncomeDataFromDB()
  }, []);
  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
