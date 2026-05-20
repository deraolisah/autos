import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);


  return (
    <section className='container p-0! h-screen flex items-start gap-0 border-x border-light-alt dark:border-dark-alt duration-300 transition-all'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


      <main className={`bg-light dark:bg-dark w-full h-full flex flex-col flex-1 duration-300 transition-all ${sidebarOpen ? "ml-0" : "md:-ml-68" }`}>
        <Header setSidebarOpen={setSidebarOpen} />
        <div className="ticks"></div>

        <div className='p-4'> 
          <Outlet />
        </div>
            
        <div className="ticks"></div>
      </main>
    </section>
  )
}


export default DashboardLayout;