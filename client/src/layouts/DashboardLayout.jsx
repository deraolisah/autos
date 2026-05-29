import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <section className='container font-body p-0! h-screen flex items-start gap-0 border-x border-light-alt dark:border-dark-alt '>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


      <main className={`bg-light dark:bg-dark w-full min-h-full flex flex-col flex-1  ${sidebarOpen ? "ml-0" : "md:ml-0" }`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* <div className="ticks"></div> */}

        <div className='p-0 pb-12'> 
          <Outlet />
        </div>
            
        {/* <div className="ticks"></div> */}
      </main>
    </section>
  )
}


export default DashboardLayout;