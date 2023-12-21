
import React, { useRef } from 'react'
import Modal from '../modal'


const AddExpensesModal = ({show ,onClose}) => {
const amountRef = useRef()
const descriptionRef = useRef()
const addExpensesHandler=()=>{}

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
   </Modal>
  )
}

export default AddExpensesModal
