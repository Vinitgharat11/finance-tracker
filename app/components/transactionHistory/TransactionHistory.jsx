import { db } from "@/app/libs/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const DUMMY_DATA = [
  { id: 1, title: "rent paid", amount: "3000" },
  { id: 2, title: "petrol exp paid", amount: "5500" },
  { id: 3, title: "electricity paid", amount: "200" },
  { id: 4, title: "mobile recharge paid", amount: "3400" },
];

const TransactionHistory = () => {
  const [incomeData, setIncomedata] = useState([]);
  useEffect(() => {
    const getIncomeData = async () => {
      try {
        const collectionRef = collection(db, "Income");
        const querySnapshot = await getDocs(collectionRef);

        // Access the documents data
        const documents = querySnapshot.docs.map((doc) => doc.data());
        setIncomedata(documents);
        console.log(documents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getIncomeData();
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-xl ">
        <div className="px-4 py-3">
          <p>Transaction History</p>
        </div>
        <section className=" data h-40 overflow-x-hidden">
          {incomeData.map((data) => (
            <div
              className="flex items-center justify-between px-5 py-2 my-3 bg-slate-700/75 rounded-lg mx-2"
              key={data.description}
            >
              <p>{data.description}</p>
              <p>{data.amount}</p>
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
