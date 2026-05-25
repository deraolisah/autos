import React from 'react';
import logo from "../../assets/logo.png"; 
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { Car, PanelLeftRightDashedIcon, Plus, PlusSquareIcon, SquareArrowRightExit, UserCircle2, ChevronRight, CornerDownRight } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();


  // Detect current vehicle page
  const isViewingVehicle = location.pathname.includes('/admin/view-all/');

  // Extract vehicle ID
  const vehicleId = location.pathname.split('/').pop();

  const adminNavLinks = [
    { name: "Admin Dashboard", path: "/admin", icon: <UserCircle2 size={22} strokeWidth={1}  />, end: true },
    { name: "Add Vehicle", path: "/admin/add", icon: <PlusSquareIcon size={22} strokeWidth={1} /> },
    { name: "View All Vehicles", path: "/admin/view-all", icon: <Car size={22} strokeWidth={1} /> },
  ]

  const navLinks = [
    { name: "Dashboard", path: "/account", icon: <UserCircle2 size={22} strokeWidth={1}  />, end: true },
    { name: "Favorites", path: "/account/favorites", icon: <PlusSquareIcon size={22} strokeWidth={1} /> },
    { name: "Settings", path: "/account/settings", icon: <Car size={22} strokeWidth={1} /> },
  ]

  return (
    <>
      <div className={`w-full max-w-60 mx-auto min-h-screen h-full flex flex-col border-r-0 border-light-alt dark:border-dark-alt bg-light dark:bg-dark fixed z-100 top-0 left-0 md:sticky md:translate-x-0  ${sidebarOpen ? "translate-x-0" : "-translate-x-full" }`}>
        <div className='min-h-16 border-b border-light-alt dark:border-dark-alt'>
          <Link to="/" onClick={()=> { scrollTo(0,0); }} className='h-full font-semibold text-lg flex items-center gap-1  p-4 w-fit'>
            <img src={logo} alt='Autos Logo' className='object-cover w-6.5  dark:invert-90 ' />
            Autos
          </Link>
        </div>


        {/* <h3 className='text-start p-4 py-2 capitalize font-medium border-b border-light-alt dark:border-dark-alt '> {user.role} Dashboard </h3> */}
        <div className='w-full h-full flex flex-col justify-between border-r border-light-alt dark:border-dark-alt'>
          {/* ADMIN NAVIGATION */}
          {user?.role === "admin" && (
            <ul className='flex flex-col gap-px p-2'>
              {adminNavLinks.map((link) => (
                <div key={link.name}>
                  {/* MAIN LINK */}
                  <NavLink
                    to={link.path}
                    end={link.end}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-light-alt dark:hover:bg-dark-alt ${
                        isActive
                          ? "bg-light-alt dark:bg-dark-alt font-medium"
                          : ""
                      }`
                    }
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>

                  {/* TEMPORARY CHILD LINK */}
                  {link.name === "View All Vehicles" &&
                    isViewingVehicle && (
                      <NavLink
                        to={`/admin/view-all/${vehicleId}`}
                        className={({ isActive }) =>
                          `ml-8 mt-1 flex items-center gap-2 text-sm px-3 py-2 rounded-md transition ${
                            isActive
                              ? ""
                              : "text-gray-500"
                          }`
                        }
                      >
                        {/* <ChevronRight size={16} /> */}
                        <CornerDownRight size={16} />

                        Edit Vehicle
                      </NavLink>
                    )}
                </div>
              ))}
            </ul>
          )}

          {user.role === "user" && (
            <ul className='flex flex-col gap-px p-2'>
              {navLinks.map((link) => (
                <div key={link.name}>
                  {/* MAIN LINK */}
                  <NavLink
                    to={link.path}
                    end={link.end}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-light-alt dark:hover:bg-dark-alt ${
                        isActive
                          ? "bg-light-alt dark:bg-dark-alt font-medium"
                          : ""
                      }`
                    }
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                </div>
              ))}
            </ul>
          )}


          {/* Logout */}
          <div className='mt-auto w-full border-t border-light-alt dark:border-dark-alt'>
            <button onClick={() => {logout()}} className='w-full flex items-center gap-2 px-4 p-3 text-red-500 hover:bg-light-alt dark:hover:bg-dark-alt'>
              <SquareArrowRightExit size={20} strokeWidth={1.5} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {sidebarOpen && (<div className='fixed z-10 md:hidden top-0 inset-0 bg-black/60' onClick={()=>{setSidebarOpen(false)}}></div>)}
    </>
  )
}

export default Sidebar;