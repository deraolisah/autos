// VehicleGrid.jsx
import React from 'react';
import VehicleCard from './VehicleCard';
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useVehicle } from '../contexts/vehicleContext';

const VehicleGrid = ({ 
  vehicles = [], 
  currentPage = 1, 
  totalPages = 1, 
  itemsPerPage = 9,
  onPageChange,
  loading,
  error
}) => {
  const { formatAmount } = useVehicle();

  if (loading) {
    return (
      <>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-5 md:gap-5 mt-4'>
          {Array.from({ length: itemsPerPage }).map((_, idx) => (
            <div key={idx} className='w-full h-34 md:h-48 bg-light-alt/60 dark:bg-dark-alt/60 rounded-md overflow-hidden flex relative'>
              <div className='absolute inset-0 w-full h-full shimmer'></div>
            </div>
          ))}
        </div>
      </>
    );
  }


  if (!loading && error) {
    return(
      <div className='bg-light-alt dark:bg-dark-alt h-34 md:h-48 rounded-lg flex flex-col gap-2 items-center justify-center'>
        <p className='text-red-500 text-center capitalize'>
          {error}
        </p>
        <button className='flex items-center gap-1 rounded-full bg-light dark:bg-dark p-4 py-1 cursor-pointer' onClick={() => {window.location.reload()}}>
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>
    )
  }

  // if (!loading && !error && !vehicles || vehicles.length === 0) {
  //   return (
  //     <div className="flex flex-col items-center justify-center py-12">
  //       <p className="text-gray-500">No vehicles available</p>
  //     </div>
  //   );
  // }

  return (
    <section className='w-full h-full flex flex-col items-start justify-between'>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 md:gap-y-5 lg:gap-5 mt-4'>
        {vehicles.map((vehicle, index) => (
          <VehicleCard 
            key={vehicle._id || index} 
            formatAmount={formatAmount} 
            vehicle={vehicle} 
          />      
        ))}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className='w-full flex items-center justify-between py-4 mt-6'>
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='inline-flex items-center bg-light-alt/80 dark:bg-dark-alt/80 hover:bg-light-alt dark:hover:bg-dark-alt rounded-md px-4 pl-2.5 py-1.5 cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <ChevronLeft size={16} />
            Prev
          </button>

          <div className="flex items-center gap-2">
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              Page {currentPage} of {totalPages}
            </span>
            {/* {itemsPerPage && (
              <span className="text-xs text-gray-400 hidden sm:inline">
                ({itemsPerPage} per page)
              </span>
            )} */}
          </div>

          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='inline-flex items-center bg-light-alt/80 dark:bg-dark-alt/80 hover:bg-light-alt dark:hover:bg-dark-alt rounded-md px-4 pr-2.5 py-1.5 cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
};

export default VehicleGrid;