import { EllipsisVertical, Flag, Trash2 } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const cardRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const listed = vehicle.listed === true;
  const unlisted = vehicle.listed === false;

  // Calculate menu position to avoid edges (similar to your tooltip logic)
  const calculateMenuPosition = () => {
    if (buttonRef.current && menuRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 192; // w-48 = 192px
      const menuHeight = menuRef.current.scrollHeight;
      
      // Calculate position relative to viewport
      let left = buttonRect.right + 10; // Position to the right of button
      let top = buttonRect.top;
      
      // Check if menu goes beyond right edge
      if (left + menuWidth > window.innerWidth) {
        // Position to the left of button
        left = buttonRect.left - menuWidth - 10;
      }
      
      // Check if menu goes beyond bottom edge
      if (top + menuHeight > window.innerHeight) {
        top = window.innerHeight - menuHeight - 10;
      }
      
      // Check if menu goes beyond top edge
      if (top < 10) {
        top = 10;
      }
      
      setMenuPosition({ top, left });
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recalculate position when menu opens or window resizes/scrolls
  useEffect(() => {
    if (isMenuOpen) {
      calculateMenuPosition();
      
      const handleResizeOrScroll = () => {
        calculateMenuPosition();
      };
      
      window.addEventListener('resize', handleResizeOrScroll);
      window.addEventListener('scroll', handleResizeOrScroll);
      
      return () => {
        window.removeEventListener('resize', handleResizeOrScroll);
        window.removeEventListener('scroll', handleResizeOrScroll);
      };
    }
  }, [isMenuOpen]);

  const handleMenuAction = (action, event) => {
    event.stopPropagation();
    switch(action) {
      case 'details':
        console.log('View details:', vehicle.id);
        break;
      case 'edit':
        console.log('Edit vehicle:', vehicle.id);
        break;
      case 'favorite':
        console.log('Save to favorites:', vehicle.id);
        break;
      case 'download':
        console.log('Download image:', vehicle.id);
        break;
      case 'flag':
        console.log('Flag vehicle:', vehicle.id);
        break;
      case 'delete':
        console.log('Delete vehicle:', vehicle.id);
        break;
      default:
        break;
    }
    setIsMenuOpen(false);
  };

  const handleCardClick = () => {
    console.log('Navigate to vehicle:', vehicle.id);
  };

  const handleMenuButtonClick = (event) => {
    event.stopPropagation();
    if (!isMenuOpen) {
      // Small delay to ensure menu is rendered before calculating position
      setTimeout(calculateMenuPosition, 0);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div ref={cardRef} className="relative group" title={vehicle.name}>
      <div className='z-10 relative rounded-lg bg-transparent group-hover:bg-transparent duration-100 transition-all'>
        <span className={`bg-green-500 text-white py-0.5 p-1.5 rounded-sm capitalize text-[10px] md:text-[11px] font-normal absolute z-1 top-1.5 left-1.5 cursor-auto shadow ${vehicle.listed ? "bg-green-500" : "bg-red-500"}`}>
          {vehicle.listed ? (
            <span> Available </span>
          ) : (
            <span> Unavailable </span>
          )}
        </span>
        {/* <Link to={`/vehicle/${vehicle._id}`} className="block overflow-hidden aspect-video rounded-md">
          <img
            src={vehicle.images?.[0] || null}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-center transform transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-110"
          />
        </Link> */}

        <Link to={`/vehicle/${vehicle._id}`} className="block overflow-hidden aspect-video rounded-md relative">
          {/* Loader shimmer */}
          {!loaded && (
            <div className="absolute inset-0 bg-light-alt/60 dark:bg-dark-alt/60 shimmer rounded-md"></div>
          )}

          {/* Image */}
          <img
            src={vehicle.images?.[0] || ""}
            alt=""
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)} // hide loader if image fails
            className={`w-full h-full object-cover object-center transform transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-110 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        <div className="p-2 pb-0.5 space-y-2 relative z-10">
          <div className="flex items-center justify-between gap-1.5">
            <img src={vehicle.avatar || null} alt="" className="aspect-square w-7.5 h-7.5 p-0 object-cover rounded-full bg-light-alt dark:bg-dark-alt duration-300 transition-all" />
            <div className='flex-1 flex flex-col items-start justify-between gap-px'>
              <h4 className="font-bold text-xs md:text-sm leading-normal line-clamp-1">
                <span className="">{vehicle.year} {vehicle.name}</span>
              </h4>
              <p className="text-xs">{formatAmount(vehicle.price)}</p>
              {/* <span className="text-xs font-normal capitalize">{vehicle.category}</span> */}
              {/* <p className='text-xs'> 150hp </p> */}
              {/* <p className='text-xs'> {vehicle.ratings} star ratings </p> */}
            </div>
            <div className="relative">
              <button 
                ref={buttonRef}
                onClick={handleMenuButtonClick}
                className='p-2 -mr-2 rounded-full hover:bg-gray-900/10 dark:hover:bg-white/10 cursor-pointer duration-200 transition-all'
              >
                <EllipsisVertical size={14} className="" />
              </button>
            </div>
          </div>
          {/* <div className='flex items-center justify-between gap-px'>
            <p className='text-xs'> {vehicle.ratings} star ratings </p>
            <p className='text-xs'> 150hp </p>
            <p className="text-xs">{formatAmount(vehicle.price)}</p>
          </div> */}
        </div>
      </div>

      {/* Custom Menu with dynamic positioning */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="fixed w-48 overflow-hidden bg-light dark:bg-dark rounded-lg shadow-lg border border-gray-200 dark:border-dark-alt z-200"
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Save to favorites
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
      )}

      {/* Vehicle Card Hover overlay */}
      <div className={`absolute inset-0 after:content-[''] after:rounded-xl after:absolute after:z-0 after:top-1/2 after:left-1/2 after:-translate-1/2 after:w-full after:h-full group-hover:after:w-[calc(100%+15px)] group-hover:after:h-[calc(100%+15px)] ${listed && "group-hover:after:bg-light-alt/80 dark:group-hover:after:bg-dark-alt"} ${unlisted && "group-hover:after:bg-red-500/20"} after:transition-all after:duration-400`}></div>
    </div>
  );
};

export default VehicleCard;