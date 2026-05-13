import { Route, Routes, useLocation } from 'react-router-dom';
import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthCallback from '../pages/AuthCallback';

// Public Routes
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact.jsx';
import Listings from '../pages/Listings';
import VehicleDetails from '../pages/VehicleDetails';

// Protected Routes
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import Dashboard from '../pages/user/Dashboard.jsx';
import Favorites from '../pages/user/Favorites.jsx';

// Not Found Routes
import NotFound from '../pages/NotFound.jsx';


const AppRoutes = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";



  return (
    <div className='relative pt-14 font-body min-h-screen bg-light dark:bg-dark dark:text-light transition-all duration-300'>
        <Navbar isHome={isHome} />

        <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/listings' element={<Listings />} />
            <Route path='/vehicle/:id' element={<VehicleDetails />} />
            <Route path='/auth/social-callback' element={<AuthCallback />} />

            {/* Protected Routes */}
            <Route path='/account' element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard /> } />
              <Route path='favorites' element={<Favorites />} />
              <Route path='settings' element={<Favorites />} />
            </Route>


            {/* Not Found */}
            <Route path='*' element={<NotFound />} />
        </Routes>  
        <Footer isHome={isHome} />
    </div>
  )
}

export default AppRoutes;