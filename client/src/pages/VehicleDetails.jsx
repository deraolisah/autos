import React, { useState, useEffect } from 'react'
import { useVehicle } from '../contexts/vehicleContext';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Heart, Share } from 'lucide-react';

const VehicleDetails = () => {
  const { id } = useParams();
  const { vehicles, loading, error } = useVehicle();

  const vehicle = vehicles.find(p => p._id === id);

  // Placeholders to fill up to 4 thumbnails
  const placeholders = [
    'https://picsum.photos/500?random=1',
    'https://picsum.photos/500?random=2',
    'https://picsum.photos/500?random=3',
    'https://picsum.photos/500?random=4',
    'https://picsum.photos/500?random=5',
    'https://picsum.photos/500?random=6',
  ];

  // State for selected main image
  const [selectedImage, setSelectedImage] = useState(null);

  // Update selectedImage when vehicle changes
  useEffect(() => {
    if (vehicle?.images?.length) {
      setSelectedImage(vehicle.images[0]);
    } else {
      setSelectedImage('https://via.placeholder.com/400x300?text=No+Image');
    }
  }, [vehicle]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!vehicle) return <div>No vehicle found</div>;

  // Build thumbnails: real images first, placeholders fill the rest
  const thumbnails = [...(vehicle.images || [])];
  while (thumbnails.length < 6) {
    thumbnails.push(placeholders[thumbnails.length]);
  }

  return (
    <section className='container py-4'>

        <div className='w-full flex flex-col sm:flex-row gap-4'>
            <div className='w-full sm:w-1/2 flex flex-col gap-2.5'>
                {/* Main Image */}
                {selectedImage && (
                    <img
                        src={selectedImage}
                        alt={vehicle.name}
                        className='aspect-2/1 md:aspect-2/1 object-cover object-center w-full rounded-md'
                    />
                )}

                {/* Thumbnails */}
                <div className='grid grid-cols-6 gap-2.5'>
                    {thumbnails.slice(0, 6).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setSelectedImage(img)}
                            className={`w-full aspect-video object-cover rounded-md ring-2 ring-transparent cursor-pointer opacity-60 hover:opacity-100 transition ${selectedImage === img ? "opacity-100 ring-yellow-500" : ""}`}
                        />
                    ))}
                </div>
            </div>

            {/* Vehicle Info */}
            <div className='w-full flex-1'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold line-clamp-2 flex items-center gap-4'>
                        <span> {vehicle.name} </span>
                        <span className={`bg-green-500 text-white py-1 p-1.5 rounded-sm capitalize text-[10px] md:text-[11px] font-normal shadow ${vehicle.listed ? "bg-green-500" : "bg-red-500"}`}>
                            {vehicle.listed ? (
                                <span> Available </span>
                            ) : (
                                <span> Unavailable </span>
                            )}
                        </span>
                    </h1>

                    <div className='flex items-center gap-1.5'>
                        <button className='hover:bg-light-alt hover:dark:bg-dark-alt p-2 rounded-full'>
                            <Heart size={18} />
                        </button>
                        <button className='hover:bg-light-alt hover:dark:bg-dark-alt px-2 p-1.5 rounded-md text-sm flex items-center gap-1.5'>
                            Share
                            <Share size={16} />
                        </button>
                    </div>
                </div>
                <p className='text-sm text-gray-600 capitalize'>{vehicle.year} ⁕ {vehicle.category}</p>
                <p className='mt-2 font-semibold'>₦{vehicle.price}</p>
            </div>
        </div>
    </section>
  );
};

export default VehicleDetails;
