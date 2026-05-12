// import { ArrowUpRight, ArrowUpRightSquare, CircleQuestionMark, Info, LogIn, LogOut, MessageCircle, MessageCircleCheck, MessageSquareLock, Settings, User } from 'lucide-react';
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
// import LoginPopup from './LoginPopup';
// import { useAuth } from '../contexts/authContext';

// const AccountPopup = () => {
//   const { user, isAuthenticated, logout } = useAuth();
//   const [loginOpen, setLoginOpen] = useState(false);
  
//   const toggleLogin = () => { setLoginOpen(prev => !prev)};

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <>
//     {!loginOpen ? (
//       <ul className='flex flex-col gap-2 text-sm'>
//         {!isAuthenticated ? (
//           <button onClick={() => {toggleLogin()}} className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'>
//             <User size={16} strokeWidth={1.5} /> 
//             Signup / Login 
//           </button>
//         ) : (
//           <>
//             <Link to="/account" className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'><Settings size={16} strokeWidth={1.5} /> {user?.email} </Link>
//             <Link to="/account/settings" className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'><Settings size={16} strokeWidth={1.5} /> Settings </Link>
//             <button onClick={()=> {handleLogout()}} className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'><LogOut size={14} /> Logout </button>  
//           </>
//         )}
//         <hr className='bg-light-alt dark:bg-dark-alt border-0 h-px' />
//         <li className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'><CircleQuestionMark size={16} strokeWidth={1.5} /> Help </li>
//         <li className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'><MessageCircleCheck size={16} strokeWidth={1.5} /> Send Feedback </li>
//         <Link to="/support" className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'><Info size={16} strokeWidth={1.5} /> Support </Link>  
//       </ul>
//       ) : (
//         <LoginPopup />
//       )}
//     </>
//   )
// }

// export default AccountPopup;




// components/AccountPopup.jsx
import { Bookmark, CircleQuestionMark, Heart, Info, LogOut, MessageCircleCheck, Settings, User } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import { useAuth } from '../contexts/authContext';  // Make sure path matches

const AccountPopup = ({ loginOpen, toggleLogin }) => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  // const [loginOpen, setLoginOpen] = useState(false);
  
  // const toggleLogin = () => { setLoginOpen(prev => !prev); };

  const handleLogout = () => {
    logout();
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <ul className='flex flex-col gap-2 text-sm'>
        <li className='px-2 py-1 rounded-md flex items-center gap-1.5 w-40'>
          Loading...
        </li>
      </ul>
    );
  }

  return (
    <>
      {!loginOpen ? (
        <ul className='flex flex-col gap-2 text-sm w-40'>
          {!isAuthenticated ? (
            <button onClick={toggleLogin} className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'>
              <User size={16} strokeWidth={1.5} /> Signup / Login 
            </button>
          ) : (
            <>
              <Link to="/account" className='px-2 py-1 rounded-md flex items-center gap-1.5 text-sm font-medium'>
                <User size={16} strokeWidth={1.5} /> {user?.name || 'User'}
              </Link>
              <Link to="/account/favorites" className='px-2 py-1 rounded-md flex items-center gap-1.5 text-sm'>
                <Bookmark size={16} strokeWidth={1.5} /> Favorites
              </Link>
              <Link to="/account/settings" className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'>
                <Settings size={16} strokeWidth={1.5} /> Settings
              </Link>
              <button onClick={handleLogout} className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5 text-red-600'>
                <LogOut size={14} /> Logout 
              </button>
            </>
          )}
          
          <hr className='bg-light-alt dark:bg-dark-alt border-0 h-px' />
          <Link to="/support" className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'>
            <CircleQuestionMark size={16} strokeWidth={1.5} /> Help / Support
          </Link>
          <Link to="/feedback" className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 py-1 rounded-md flex items-center gap-1.5'>
            <MessageCircleCheck size={16} strokeWidth={1.5} /> Send Feedback 
          </Link>
        </ul>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default AccountPopup;