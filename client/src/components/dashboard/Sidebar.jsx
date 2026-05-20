import React from 'react';
import logo from "../../assets/logo.png"; 
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <div className={`w-full max-w-68 mx-auto min-h-screen h-full flex flex-col border-r border-light-alt dark:border-dark-alt bg-light dark:bg-dark fixed z-100 top-0 left-0 shadow-md md:shadow-none md:relative duration-300 transition-all ${sidebarOpen ? "translate-x-0" : "-translate-x-full" }`}>
        <Link to="/" onClick={()=> { scrollTo(0,0); }} className='h-16 font-semibold text-lg flex items-center gap-1 border-b border-light-alt dark:border-dark-alt p-4 mb-4'>
          <img src={logo} alt='Autos Logo' className='object-cover w-6.5  dark:invert-90 duration-300 transition-all' />
          Autos
        </Link>


        <h3 className='text-start pl-4'> Dashboard </h3>

        <ul className='flex flex-col gap-2'>
          <Link>

          </Link>
        </ul>
      </div>

      {sidebarOpen && (<div className='fixed z-10 md:hidden top-0 inset-0 bg-black/60' onClick={()=>{setSidebarOpen(false)}}></div>)}
    </>
  )
}

export default Sidebar;