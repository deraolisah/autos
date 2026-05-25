import React from 'react';
import { Link } from 'react-router-dom';
import { Flag } from 'lucide-react';
import { useFavorite } from '../contexts/favoriteContext';

const CustomMenu = ({ menuRef, vehicle, menuPosition, handleMenuAction }) => {
    const { isFavorite } = useFavorite();

  return (
    <div 
        draggable={true}
        ref={menuRef}
        className="fixed w-48 overflow-hidden bg-light dark:bg-dark rounded-lg shadow-lg border border-gray-200 dark:border-dark-alt z-200 cursor-grab! "
        style={{
        top: menuPosition.top,
        left: menuPosition.left,
        }}
    >
        <Link to={`/vehicle/${vehicle._id}`}
        onClick={(e) => handleMenuAction('details', e)}
        className="w-full text-left px-4 py-2 font-medium text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 flex items-center gap-2"
        >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        View Details
        </Link>
        
        <button
            onClick={(e) => handleMenuAction('favorite', e)}
            className="w-full text-left px-4 py-2 font-medium text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 flex items-center gap-2"
        >
            {isFavorite(vehicle._id) ? (
                <>
                <svg className="w-4 h-4" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"> 
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Unfavorite
                </>
            ) : (
                <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Save to favorites
                </>
            )}
            {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {isFavorite(vehicle._id) ? 'Unfavorite' : 'Save to favorites'} */}
        </button>
        
        <a 
        href={vehicle.images?.[0]} 
        download={`${vehicle.name || 'vehicle'}-image.jpg`}
        target='_blank'
        // onClick={(e) => handleMenuAction('download', e)}
        className="w-full text-left px-4 py-2 font-medium text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 flex items-center gap-2"
        >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Image
        </a>
        
        <div className="border-t border-light-alt dark:border-dark-alt my-px"></div>
        
        <button
        onClick={(e) => handleMenuAction('flag', e)}
        className="w-full text-left px-4 py-2 font-medium text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-150 flex items-center gap-2"
        >
        <Flag size={16} strokeWidth={1.5} />
        Flag Vehicle
        </button>
        
        {/* <button
        onClick={(e) => handleMenuAction('delete', e)}
        className="w-full text-left px-4 py-2 font-medium text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-150 flex items-center gap-2"
        >
        <Trash2 size={16} strokeWidth={1.5} />
        Delete Vehicle
        </button> */}
    </div>
  )
}

export default CustomMenu;