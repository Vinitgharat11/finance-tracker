'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsHouseDoor ,BsBarChart,BsWallet ,BsPerson} from "react-icons/bs";


const Navbar = () => {
  const pathname = usePathname()
  return (
    <div className=' w-full h-14 fixed bottom-0 border-t-2 border-slate-500/30  bg-slate-900 '>
      <div className="flex text-[25px] justify-around text-gray-600 pt-4">
        <Link className={`link ${pathname !== '/' ? 'active' : 'text-white'}`} href="/">
        <BsHouseDoor/>
        </Link>
        <Link className={`link ${pathname !== '/transaction' ? 'active' : 'text-white'}`} href="/transaction">
        <BsBarChart/>
        </Link>        
        <BsWallet/>
        <BsPerson/>
      </div>
    </div>
  )
}

export default Navbar
