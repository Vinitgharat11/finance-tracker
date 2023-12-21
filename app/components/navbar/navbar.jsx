import React from 'react'
import { BsHouseDoor ,BsBarChart,BsWallet ,BsPerson} from "react-icons/bs";

const Navbar = () => {
  return (
    <div className=' w-full h-14 fixed bottom-0 border-t-2 border-slate-500/30 '>
      <div className="flex text-[25px] justify-around text-gray-600 pt-4">
        <BsHouseDoor/>
        <BsBarChart/>
        <BsWallet/>
        <BsPerson/>
      </div>
    </div>
  )
}

export default Navbar
