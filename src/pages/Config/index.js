import { useState } from "react";

import {BsArrowLeft} from 'react-icons/bs'
import {FaLink} from "react-icons/fa"
import {AiOutlineLink, AiFillTool} from 'react-icons/ai'
import { MdEdit} from 'react-icons/md'
import {BiLogOut} from 'react-icons/bi'

import { Link } from "react-router-dom";

import {signOut} from 'firebase/auth'
import { auth } from '../../services/firebaseconection'

export function Config(){
  const [open, setOpen] = useState(false);


  return(
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`duration-300 ${
          open ? "w-50" : "w-20 "
        } bg-gray-50 h-screen p-5  pt-8 relative  border-r-2 border-green-700`}
      >
        <div>
        <BsArrowLeft    
          className={`absolute cursor-pointer -right-4 top-8 w-7  duration-500 rounded-full scale-0  md:scale-100   ${!open && "rotate-180"}   bg-gray-50 border-2 border-green-700`}
          onClick={() => setOpen(!open)}
          size={24}
        />
        <div className="grid grid-cols-6 grid-flow-col">
          <Link to='/'>
          <FaLink className={`text-green-900 w-7  cursor-pointer duration-700  ${!open && "rotate-[360deg]"}` } size={24}/>
          </Link>
          <h1
              className={`text-green-600 col-span-5 origin-left font-medium text-xl duration-200 ml-2 ${
                !open && "scale-0"
              }`}
            >
            Multi.Link
          </h1>
        </div>

        <div className="grid grid-cols-1">
          <Link  to='/admin' className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-green-700 font-bold text-sm items-center gap-x-4 mt-4`}>
                <AiOutlineLink size={16} className={`origin-left duration-700`}/> 
                <p className={`${!open && "  hidden"} origin-left duration-200 `}>Links</p>
          </Link>
        <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-green-700 font-bold text-sm items-center gap-x-4 `}>
          <MdEdit/>
          <Link className={`${!open && "hidden"} origin-left duration-200`}>Aparencia</Link>
        </li>
        <Link to='/admin/config' className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-green-700 font-bold bg-green-300 text-sm items-center gap-x-4 `}>
            <AiFillTool/>
            <p className={`${!open && "hidden"} origin-left duration-200`}>Configurações</p>
        </Link>
        </div>
          <div 
          className={`absolute cursor-pointer bottom-0 w-7  duration-500 rounded-full`}
          > 
            <button onClick={()=>signOut(auth)}>
              <BiLogOut size={28} color="#db2629"/>
            </button>
          </div>
        </div>
        
        
      </div>
      
      <div className="mt-4 ml-8">
        <h1 className="text-lg font-bold">Configurações</h1>

        


      </div>
    </div>
  )
}