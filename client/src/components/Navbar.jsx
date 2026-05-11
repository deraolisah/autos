import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Bell, File, Home, House, List, Menu, Moon, Sun, User, UserRound, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useTheme } from '../contexts/themeContext';
import "./AccountPopup";
import AccountPopup from './AccountPopup';
import NotificationsPopup from './NotificationsPopup';
import LoginPopup from './LoginPopup';
import { useAuth } from '../contexts/authContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountPopup, setAccountPopup] = useState(false);
    const [notificationsPopup, setNotificationsPopup] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
      
    
    const menuRef = useRef();
    const accountRef = useRef();
    const notificationsRef = useRef();
    
    const toggleMenuOpen = () => { setMenuOpen(prev => !prev) }
    const toggleAccountPopup = () => { setAccountPopup(prev => !prev) }
    const toggleNotificationsPopup = () => { setNotificationsPopup(prev => !prev) }
    const toggleLogin = () => { setLoginOpen(prev => !prev); };
    
    // 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
            }
            if (accountRef.current && !accountRef.current.contains(event.target)) {
            setAccountPopup(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
            setNotificationsPopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



  return (
    <>
        <nav className='container fixed top-0 left-1/2 -translate-x-1/2 z-2000! flex items-center justify-between h-14 border-b border-gray-300 md:border-gray-300/60 dark:border-dark-alt md:dark:border-dark-alt/60 bg-light md:bg-light/45 dark:bg-dark md:dark:bg-dark/65 backdrop-blur-md duration-300 transition-all'>
            <Link to="/" onClick={()=> { scrollTo(0,0); }} className='font-semibold text-lg flex items-center gap-1'>
                <img src={logo} alt='Autos Logo' className='object-cover w-6.5  dark:invert-90 duration-300 transition-all' />
                Autos
            </Link>

            <ul className='hidden md:flex items-center gap-6 text-xs'>
                <Link to="/" className=''> Home </Link>
                <Link to="/about" className=''> About </Link>
                <Link to="/listings" className=''> Listings </Link>
            </ul>


            {/* Nav Options */}
            <div className="flex items-center justify-end gap-1">
                <button className={`rounded-full p-2 hover:bg-gray-300 dark:hover:bg-dark-alt duration-300 transition-all cursor-pointer relative ${notificationsPopup ? "bg-gray-300 dark:bg-dark-alt" : ""}`} title='Notifications' onClick={()=> {toggleNotificationsPopup()}}>
                    <Bell size={16} strokeWidth={1.5} />
                    {!notificationsPopup && (
                        <span>
                            <span className='animate-pulse w-2 h-2 rounded-full bg-yellow-500 flex absolute top-0 right-0'></span>
                            <span className='animate-ping w-3 h-3 rounded-full bg-yellow-500 flex absolute -top-0.5 -right-0.5'></span>
                        </span>
                    )}
                </button>
                <button className="rounded-full p-2 hover:bg-gray-300 dark:hover:bg-dark-alt duration-300 transition-all" title="Theme" onClick={toggleTheme}>
                    {theme === "light" ? (
                        <Moon size={16} strokeWidth={1.5} />
                    ) : (
                        <Sun size={16} />
                    )}
                </button>
                <button className={`rounded-full p-2 hover:bg-gray-300 dark:hover:bg-dark-alt duration-300 transition-all ${accountPopup ? "bg-gray-300 dark:bg-dark-alt" : ""}`} title="Account" onClick={()=> {toggleAccountPopup()}}>
                    <UserRound size={16} strokeWidth={1.5} />
                </button>
                <button className={`rounded-full p-2 hover:bg-gray-300 dark:hover:bg-dark-alt duration-300 transition-all flex md:hidden ${menuOpen ? "bg-gray-300 dark:bg-dark-alt" : "" }`} title="Menu" onClick={()=> {toggleMenuOpen()}}>
                    {!menuOpen ? (
                        <Menu size={16} />
                    ) : (
                        <X size={16} />
                    )}
                </button>
            </div>
        </nav>

        {menuOpen && (
            // <ul ref={menuRef} className='flex md:hidden flex-col items-center gap-4 text-xs w-fit absolute z-200 top-15 right-[1rem] rounded-lg bg-light-alt dark:bg-dark-alt p-4'>
            <ul ref={menuRef} className='flex md:hidden flex-col items-center gap-2 text-sm fixed z-100 top-15 right-[1rem] bg-light dark:bg-dark shadow-xl rounded-xl border border-gray-300 dark:border-dark-alt p-2'>
                <Link to="/" className='flex items-center gap-1.5 hover:bg-light-alt hover:dark:bg-dark-alt py-1 px-2 rounded-md w-28'><Home size={14} /> Home </Link>
                <Link to="/about" className='flex items-center gap-1.5 hover:bg-light-alt hover:dark:bg-dark-alt py-1 px-2 rounded-md w-28'><File size={14} /> About </Link>
                <Link to="/listings" className='flex items-center gap-1.5 hover:bg-light-alt hover:dark:bg-dark-alt py-1 px-2 rounded-md w-28'><List size={14} /> Listings </Link>
            </ul>
        )}

        {accountPopup && (
            <div ref={accountRef} className='fixed z-100 top-15 right-[2.5rem] md:right-4 bg-light dark:bg-dark shadow-xl rounded-xl border border-gray-300 dark:border-dark-alt p-2'>
                <AccountPopup loginOpen={loginOpen} toggleLogin={toggleLogin} />
            </div>
        )}

        {notificationsPopup && (
            <div ref={notificationsRef} className='fixed z-100 top-15 right-[5rem] bg-light dark:bg-dark shadow-xl rounded-xl border border-gray-300 dark:border-dark-alt p-2'>
                <NotificationsPopup />
            </div>
        )}

        {loginOpen && (
            <div className='px-4 flex items-center justify-center fixed inset-0 w-full h-full z-200000 top-1/2 left-1/2 -translate-1/2'>
                <LoginPopup />
                <div onClick={() => {setLoginOpen(false); }} className='fixed! inset-0 z-200 w-full h-full bg-light/50 dark:bg-dark/50 backdrop-blur-sm'></div>
            </div>
        )}
    </>
  )
}

export default Navbar;