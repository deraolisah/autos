import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const PublicLayout = () => {
    const location = useLocation();

    const isHome = location.pathname === "/";
    return (
        <div className='relative pt-14 font-body min-h-screen bg-light dark:bg-dark dark:text-light transition-all duration-300'>
            <Navbar isHome={isHome} />
            <Outlet />
            <Footer isHome={isHome} />
        </div>
    )
}

export default PublicLayout;