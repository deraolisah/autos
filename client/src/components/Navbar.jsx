import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Bell, File, Home, House, List, Menu, Monitor, Moon, Phone, Server, Sun, User, UserRound, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useTheme } from '../contexts/themeContext';
import "./AccountPopup";
import AccountPopup from './AccountPopup';
import NotificationsPopup from './NotificationsPopup';
import LoginPopup from './LoginPopup';
import { useAuth } from '../contexts/authContext';
import ThemePopup from './ThemePopup';

const Navbar = ({ isHome }) => {
    const { isAuthenticated } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [notificationsPopup, setNotificationsPopup] = useState(false);
    const [themePopup, setThemePopup] = useState(false);
    const [accountPopup, setAccountPopup] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
      
    
    const notificationsRef = useRef();
    const themeRef = useRef();
    const accountRef = useRef();
    const menuRef = useRef();
    
    const toggleNotificationsPopup = () => { setNotificationsPopup(prev => !prev) }
    const toggleThemePopup = () => { setThemePopup(prev => !prev) }
    const toggleAccountPopup = () => { setAccountPopup(prev => !prev) }
    const toggleLogin = () => { setLoginOpen(prev => !prev) }
    const toggleMenuOpen = () => { setMenuOpen(prev => !prev) }

    const onClose = () => { setLoginOpen(false) }
    
    // 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
            setNotificationsPopup(false);
            }
            if (themeRef.current && !themeRef.current.contains(event.target)) {
            setThemePopup(false);
            }
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setAccountPopup(false);
            }
            if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    const navList = [
        {name: "Home", link: "/", icon: <House size={14} /> },
        {name: "About", link: "/about", icon: <File size={14} /> },
        {name: "Contact", link: "/contact", icon: <Phone size={14} /> },
        {name: "Services", link: "/services", icon: <Server size={14} /> },
        {name: "Listings", link: "/listings", icon: <List size={14} /> }
    ];


  return (
    <>
        <nav className={`container fixed top-0 left-1/2 -translate-x-1/2 z-2000! flex items-center justify-between h-14 border-b border-gray-300 md:border-gray-300/60 dark:border-dark-alt md:dark:border-dark-alt/60 bg-light md:bg-light/45 dark:bg-dark md:dark:bg-dark/65 backdrop-blur-md  ${isHome ? "bg-transparent! border-0! backdrop-blur-none!" : ""}`}>
            <Link to="/" onClick={()=> { scrollTo(0,0); }} className='font-semibold text-lg flex items-center gap-1'>
                <img src={logo} alt='Autos Logo' className='object-cover w-6.5 dark:invert-90' />
                Autos
            </Link>

            <ul className='hidden md:flex items-center gap-6 text-xs'>
                {navList.map((item, index) => (
                    <NavLink key={index} end to={item.link} className={({ isActive }) => `hover:text-yellow-600 dark:hover:text-yellow-500 ${isActive ? "font-bold" : ""}`} title={item.name}> 
                        {item.name} 
                    </NavLink>
                ))}
            </ul>


            {/* Nav Options */}
            <div className="flex items-center justify-end gap-1">
                <button className={`rounded-full p-2 hover:bg-gray-300 dark:hover:bg-dark-alt  cursor-pointer relative ${notificationsPopup ? "bg-gray-300 dark:bg-dark-alt" : ""}`} title='Notifications' onClick={()=> {toggleNotificationsPopup()}}>
                    <Bell size={16} strokeWidth={1.5} />
                    {!notificationsPopup && (
                        <span>
                            <span className=' w-2 h-2 rounded-full bg-yellow-500 flex absolute top-0 right-0'></span>
                            <span className=' w-3 h-3 rounded-full bg-yellow-500/50 flex absolute -top-0.5 -right-0.5'></span>
                        </span>
                    )}
                </button>
                <button className="rounded-full p-2 hover:bg-gray-300 dark:hover:bg-dark-alt " title="Theme" onClick={() => {toggleThemePopup()}}>
                    {theme === "system" ? (
                        <Monitor size={16} strokeWidth={1.5} />
                    ) : theme === "dark" ? (
                        <Moon size={16} strokeWidth={1.5} />
                    ) : theme === "light" ? (
                        <Sun size={16} strokeWidth={1.5} />
                    ) : (
                        <Monitor size={16} strokeWidth={1.5} />
                    )}
                </button>
                <button className={`rounded-full p-2 hover:bg-gray-300 dark:hover:bg-dark-alt  ${accountPopup ? "bg-gray-300 dark:bg-dark-alt" : ""}`} title="Account" onClick={()=> {toggleAccountPopup()}}>
                    <UserRound size={16} strokeWidth={1.5} />
                </button>
                <button className={`rounded-full p-2 hover:bg-gray-300 dark:hover:bg-dark-alt  flex md:hidden ${menuOpen ? "bg-gray-300 dark:bg-dark-alt" : "" }`} title="Menu" onClick={()=> {toggleMenuOpen()}}>
                    {!menuOpen ? (
                        <Menu size={18} />
                    ) : (
                        <X size={18} />
                    )}
                </button>
            </div>
        </nav>

        {menuOpen && (
            // <ul ref={menuRef} className='flex md:hidden flex-col items-center gap-4 text-xs w-fit absolute z-200 top-15 right-[1rem] rounded-lg bg-light-alt dark:bg-dark-alt p-4'>
            <ul ref={menuRef} className='flex md:hidden flex-col items-center gap-2 text-sm fixed z-100 top-15 right-[1rem] bg-light dark:bg-dark shadow-xl rounded-xl border border-gray-300 dark:border-dark-alt p-2'>
                {navList.map((item, index) => (
                    <NavLink key={index} end to={item.link} onClick={() =>{setMenuOpen(false);}} className={({ isActive }) => `flex items-center gap-1.5 hover:bg-light-alt hover:dark:bg-dark-alt py-1 px-2 rounded-md w-28 ${isActive ? "font-bold" : ""}`} title={item.name}> 
                        {item.icon}                     
                        {item.name} 
                    </NavLink>
                ))}
            </ul>
        )}


        {notificationsPopup && (
            <div ref={notificationsRef} className='fixed z-100 top-15 right-[5rem] bg-light dark:bg-dark shadow-xl rounded-xl border border-gray-300 dark:border-dark-alt p-2'>
                <NotificationsPopup />
            </div>
        )}

        {themePopup && (
            <div ref={themeRef} className='fixed z-100 top-15 right-[4rem] md:right-[3rem] bg-light dark:bg-dark shadow-xl rounded-xl border border-gray-300 dark:border-dark-alt p-1'>
                <ThemePopup />
            </div>
        )}

        {accountPopup && (
            <div ref={accountRef} className='fixed z-100 top-15 right-[2.5rem] md:right-4 bg-light dark:bg-dark shadow-xl rounded-xl border border-gray-300 dark:border-dark-alt p-2'>
                <AccountPopup loginOpen={loginOpen} toggleLogin={toggleLogin} />
            </div>
        )}

        {loginOpen && !isAuthenticated && (
            <div className='px-4 flex items-center justify-center fixed inset-0 w-full h-full z-200000 top-1/2 left-1/2 -translate-1/2'>
                <LoginPopup onClose={onClose} />
                <div onClick={() => {setLoginOpen(false); }} className='fixed! inset-0 z-200 w-full h-full bg-light/50 dark:bg-dark/50 backdrop-blur-sm'></div>
            </div>
        )}
    </>
  )
}

export default Navbar;