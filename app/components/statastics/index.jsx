import React, { useContext } from "react";
// #2F9023 green
// #811F1B red

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { financeContext } from "@/app/libs/store/financeContext";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Statastics() {
  const { Expenses, Income } = useContext(financeContext);

  const allBalance = [...Expenses, ...Income];

  console.log(allBalance);
  return (
    <div>
      <section className="py-6 ">
        <h3 className="text-2xl my-6 text-center">Stats</h3>
        <div className="w-6/12 md:w-2/12 mx-auto">
          <Doughnut
            data={{
              // labels: allBalance.map((expense) => expense.category),
              datasets: [
                {
                  label: "Statastics",
                  data: allBalance.map((expense) => expense.amount),
                  backgroundColor: allBalance.map((expense) => expense.color),
                  borderColor: ["#18181b"],
                  borderWidth: 5,
                },
              ],
            }}
          />
        </div>
      </section>
    </div>
  );
}
