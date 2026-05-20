import React from 'react';
import { useVehicle } from '../../contexts/vehicleContext';

const AllVehicles = () => {
    const { vehicles } = useVehicle();

  return (
    <div>
      All Vehicles

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {vehicles.map((vehicle) => (
                <div key={vehicle.id} className='border border-light-alt dark:border-dark-alt rounded-md p-4'>
                    <img src={vehicle.image} alt={`${vehicle.name} ${vehicle.model}`} className='w-full h-40 object-cover rounded-md mb-2' />
                    <h3 className='text-lg font-semibold'>{vehicle.name} {vehicle.model}</h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Year: {vehicle.year}</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Price: ${vehicle.price}</p>
                </div>  
            ))}
        </div>
    </div>
  )
}

export default AllVehicles;