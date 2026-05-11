import React, { useEffect } from 'react'
import { useVehicle } from '../contexts/VehicleContext';
import VehicleCard from './VehicleCard';


const VehicleGrid = () => {
    const { vehicles, loading, error } = useVehicle();

    if (loading){
        return (
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-5 md:gap-5 mt-4'>
                {/* {vehicles.map((loader, idx) => ( */}
                {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className='w-full h-40 bg-light-alt/60 dark:bg-dark-alt/60 rounded-md overflow-hidden flex'>
                        <div className='absolute inset-0 w-full h-full shimmer'></div>
                    </div>
                ))}
            </div>
        );
    };


    if (error) {
        return (
            <div className='text-red-500 text-center mt-4'>
                <img src='' alt='' className='' />
                Error: {error}
                <br/><br/>
                <button className='cursor-pointer text-dark dark:text-light border border-light-alt dark:border-dark-alt p-1.5 px-4 rounded-full' onClick={()=> { window.location.reload()}}> refresh </button>
            </div>
        );
    };

    if (!Array.isArray(vehicles)) return <div>Error: Vehicles data is corrupted</div>;


    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-5 md:gap-5 mt-4'>
            {vehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle._id || index} vehicle={vehicle} />      
            ))}
        </div>
    );
};

export default VehicleGrid;