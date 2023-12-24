import { useContext, useRef } from "react";
import { financeContext } from "@/app/libs/store/financeContext";
// Icons
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../modal";

const AddIncomeModel = ({ show, onClose }) => {
  const { Income, addIncomeItems, removeIncomeItem } =
    useContext(financeContext);
  const amountRef = useRef();
  const descriptionRef = useRef();

  // Income Handler function

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      category:"Income",
      color:"#2F9023"
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

  const removeIncomeHandler = async (IncomeId) => {
    try {
      await removeIncomeItem(IncomeId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={show} onClose={onClose}>
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
  );
};

export default AddIncomeModel;
