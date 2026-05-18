import React, { useEffect } from 'react'
import { useVehicle } from '../contexts/vehicleContext';
import VehicleCard from './VehicleCard';


const VehicleGrid = () => {
    const { formatAmount, vehicles, loading, error } = useVehicle();

    if (loading){
        return (
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-5 md:gap-5 mt-4'>
                {/* {vehicles.map((loader, idx) => ( */}
                {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className='w-full h-34 md:h-48 bg-light-alt/60 dark:bg-dark-alt/60 rounded-md overflow-hidden flex relative'>
                        <div className='absolute inset-0 w-full h-full shimmer'></div>
                    </div>
                ))}
            </div>
        );
    };


    if (error) {
        return (
            <div className='rounded-lg overflow-hidden min-h-48 text-red-500 text-center duration-300 transition-all relative'>
                <div className='w-full h-full bg-light-alt/60 dark:bg-dark/90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2 flex flex-col items-center justify-center gap-2'>
                    {/* <img src='' alt='' className='' /> */}
                    Error: {error}                
                    <button className='cursor-pointer border border-transparent text-dark dark:text-light bg-light dark:bg-dark hover:border-light-alt dark:hover:border-dark-alt p-1.5 px-4 rounded-full duration-300 transition-all' onClick={()=> { window.location.reload()}}> refresh </button>
                </div>
                <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-5 md:gap-5'>
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx} className='w-full h-34 md:h-48 bg-light-alt/60 dark:bg-dark-alt/60 rounded-md overflow-hidden flex relative'>
                            <div className='absolute inset-0 w-full h-full shimmer'></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (!Array.isArray(vehicles)) return <div>Error: Vehicles data is corrupted</div>;


    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 md:gap-y-5 lg:gap-5 mt-4'>
            {vehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle._id || index} formatAmount={formatAmount} vehicle={vehicle} />      
            ))}
        </div>
    );
};

export default VehicleGrid;