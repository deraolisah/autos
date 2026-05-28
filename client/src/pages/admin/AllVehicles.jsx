import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useVehicle } from '../../contexts/vehicleContext';
import VehicleCard from '../../components/VehicleCard';

const AllVehicles = () => {
    const { getAllVehicles, vehicles, formatAmount, loading, error } = useVehicle();

    useEffect(() => {
      getAllVehicles();
      console.log("All vehicles loaded")
    }, []);

    if(loading) {
        return <div className='p-4'>Loading...</div>;
    }

    if(error) {
        return <div className='p-4'>Error: {error}</div>;
    }
    

  return (
    <section className='p-4'>
      All Vehicles ({vehicles.length})

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
          {vehicles.map((vehicle, index) => (
            <Link to={`/admin/view-all/${vehicle._id}`} key={vehicle._id || index} className='border border-light-alt dark:border-dark-alt hover:bg-light-alt dark:hover:bg-dark-alt rounded-md p-0 duration-300 transition-all relative' title={`Edit ${vehicle.name}`}>
                <span className='absolute top-2 left-2 w-6 h-6 text-sm rounded-full flex items-center justify-center inset-shadow-2xs bg-light dark:bg-dark border border-light-alt dark:border-dark-alt'>{index+1}</span>
                <img src={vehicle?.images?.[0]} alt={`${vehicle.name} ${vehicle.model}`} className='w-full h-48 aspect-video object-cover rounded-md mb-2' />
                <div className='px-3 pb-2'>
                  <h3 className='text-lg font-semibold'>{vehicle.name} {vehicle.model}</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>Year: {vehicle.year}</p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>Price: {formatAmount(vehicle.price)} </p>
                </div>
            </Link> 
            // <VehicleCard key={vehicle._id || index} vehicle={vehicle} /> 
          ))}
        </div>
    </section>
  )
}

export default AllVehicles;