import { Route, Routes, useLocation } from 'react-router-dom';
import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthCallback from '../pages/AuthCallback';

// Public Routes
import PublicLayout from '../layouts/PublicLayout.jsx';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact.jsx';
import Listings from '../pages/Listings';
import VehicleDetails from '../pages/VehicleDetails';
import Feedback from '../pages/Feedback.jsx';
import Support from '../pages/Support.jsx';


// USER - Protected Routes
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import Dashboard from '../pages/user/Dashboard.jsx';
import FavoritesPage from '../pages/user/FavoritesPage.jsx';
import Settings from '../pages/user/Settings.jsx';


// ADMIN - Protected Routes
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import AddVehicle from '../pages/admin/AddVehicle.jsx';
import AllVehicles from '../pages/admin/AllVehicles.jsx';
import EditVehicle from '../pages/admin/EditVehicle.jsx';

// Not Found Routes
import NotFound from '../pages/NotFound.jsx';


const AppRoutes = () => {

  return (
    <div className=''>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/listings' element={<Listings />} />
            <Route path='/vehicle/:id' element={<VehicleDetails />} />
            <Route path='/auth/social-callback' element={<AuthCallback />} />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/support' element={<Support />} />
          </Route>


          {/* USER - Protected Routes */}
          <Route path='/account' element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard /> } />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path='settings' element={<Settings />} />
          </Route>


          {/* ADMIN - Protected Routes */}
          <Route path='/admin/*' element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard /> } />
            <Route path="add" element={<AddVehicle />} />
            <Route path="view-all">
              <Route index element={<AllVehicles />} />
              <Route path=":id" element={<EditVehicle />} />
            </Route>
          </Route>

          {/* Not Found */}
          <Route path='*' element={<NotFound />} />
        </Routes>  

    </div>
  )
}

export default AppRoutes;