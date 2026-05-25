import React from 'react'
import { useAuth } from '../../contexts/authContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <section className='p-0'>
      <div className='bg-primary text-dark p-4'>
        Welcome, Admin.
        <br/>
        <p className='underline'> {user.email} </p>
      </div>
    </section>
  )
}

export default AdminDashboard;