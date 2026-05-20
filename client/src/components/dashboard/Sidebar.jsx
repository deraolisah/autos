import React from 'react';
import logo from "../../assets/logo.png"; 
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { Plus, PlusSquareIcon, SquareArrowRightExit } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <div className={`w-full max-w-68 mx-auto min-h-screen h-full flex flex-col border-r border-light-alt dark:border-dark-alt bg-light dark:bg-dark fixed z-100 top-0 left-0 shadow-md md:shadow-none md:relative duration-300 transition-all ${sidebarOpen ? "translate-x-0" : "-translate-x-full" }`}>
        <Link to="/" onClick={()=> { scrollTo(0,0); }} className='h-16 font-semibold text-lg flex items-center gap-1 border-b border-light-alt dark:border-dark-alt p-4'>
          <img src={logo} alt='Autos Logo' className='object-cover w-6.5  dark:invert-90 duration-300 transition-all' />
          Autos
        </Link>


        <h3 className='text-start p-4 py-2 capitalize font-medium border-b border-light-alt dark:border-dark-alt duration-300 transition-all'> {user.role} Dashboard </h3>

        <ul className='flex flex-col gap-2'>
          <Link to="/admin/add" className='flex items-center gap-2 px-4 p-2 hover:bg-light-alt dark:hover:bg-dark-alt' onClick={()=> {setSidebarOpen(false)}}>
            <Plus size={22} strokeWidth={1} />
            Add Vehicle
          </Link>
          <Link to="/admin/view-all" className='flex items-center gap-2 px-4 p-2 hover:bg-light-alt dark:hover:bg-dark-alt' onClick={()=> {setSidebarOpen(false)}}>
            <PlusSquareIcon size={22} strokeWidth={1} />
            View All Vehicles
          </Link>
        </ul>


        {/* Logout */}
        <div className='mt-auto w-full border-t border-light-alt dark:border-dark-alt'>
          <button onClick={() => {logout()}} className='w-full flex items-center gap-2 px-4 p-2 hover:bg-light-alt dark:hover:bg-dark-alt'>
            <SquareArrowRightExit size={22} strokeWidth={1} />
            Logout
          </button>
        </div>
      </div>

      {sidebarOpen && (<div className='fixed z-10 md:hidden top-0 inset-0 bg-black/60' onClick={()=>{setSidebarOpen(false)}}></div>)}
    </>
  )
}

export default Sidebar;