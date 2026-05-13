import React, { useState, useEffect } from 'react'
import { useVehicle } from '../contexts/vehicleContext';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Expand, Heart, Share } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';


const VehicleDetails = () => {
    const { id } = useParams();
    const { formatAmount, vehicles, favorites, toggleFavorite, loading, error } = useVehicle();
    const { isFavorited } = useFavorites(); 
    
    const vehicle = vehicles.find(p => p._id === id);
    const isFav = isFavorited(vehicle?._id);

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
    // State for lightbox image
    const [ showLightbox, setShowLightbox ] = useState(false);

    const togglelightbox = () => { setShowLightbox(prev => !prev) };

  // Update selectedImage when vehicle changes
  useEffect(() => {
    if (vehicle?.images?.length) {
      setSelectedImage(vehicle.images[0]);
    } else {
      setSelectedImage('https://via.placeholder.com/400x300?text=No+Image');
    }
  }, [vehicle]);

  if (loading) return <div className='p-4'>Loading...</div>;
  if (error) return <div className='p-4'>Error: {error}</div>;
  if (!vehicle) return <div className='p-4'>No vehicle found</div>;


//   // ✅ Safely check favorites only if both exist
// //   const isFav = Array.isArray(favorites) && favorites.some(fav => fav._id === vehicle._id);
//     const isFav = isFavorited(vehicle?._id);

//     // ✅ Safe check - handles undefined, null, or non-arrays
//     // const isFav = Array.isArray(favorites) && favorites.some(fav => fav._id === vehicle._id);


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
                    <div className='relative rounded-md overflow-hidden'>
                        <Link to="/listings" className='absolute z-2 top-2 left-2 bg-light/80 dark:bg-dark/80 backdrop-blur-sm p-1 pr-2 rounded-sm text-xs flex items-center gap-0 cursor-pointer duration-300 transition-all'>
                            <ChevronLeft size={14} />
                            back
                        </Link>
                        <img
                            src={selectedImage}
                            alt={vehicle.name}
                            className='aspect-2/1 md:aspect-2/1 object-cover object-center w-full'
                        />
                        <span className='absolute top-0 left-0 right-0 bottom-0 bg-linear-to-b from-transparent via-transparent to-black/60'></span>
                        <button className='absolute bottom-2 right-2 text-light cursor-pointer' title='Full Screen' onClick={() => {togglelightbox()}}>
                            <Expand />
                        </button>
                    </div>
                )}

                {/* Lightbox */}
                {showLightbox && (
                    <div className='fixed z-20000 inset-0 w-full h-full flex items-center justify-center p-4! bg-black/50 backdrop-blur-md'>
                        <img src={selectedImage} alt='' className='w-fit object-contain h-fit' />
                        <button onClick={()=>{setShowLightbox(false)}} className='fixed top-4 right-4 py-1 px-2 text-sm font-medium rounded-sm uppercase text-light dark:text-dark bg-dark dark:bg-light'> close </button>
                    </div>
                )}

                {/* Thumbnails */}
                <div className='grid grid-cols-6 gap-2.5'>
                    {thumbnails.slice(0, 6).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setSelectedImage(img)}
                                className={`w-full aspect-3/2 object-cover rounded md:rounded-md ring md:ring-2 ring-transparent cursor-pointer opacity-60 hover:opacity-100 transition ${selectedImage === img ? "opacity-100 ring-yellow-500" : ""}`}
                        />
                    ))}
                </div>
            </div>

            {/* Vehicle Info */}
            <div className='w-full flex-1 space-y-2'>
                <div className='w-full flex items-start md:items-center justify-between gap-1.5'>
                    <div className='w-full flex items-center flex-wrap gap-x-4 gap-1.5'>
                        <h1 className='text-2xl font-bold leading-none'>
                            <span> {vehicle.year} {vehicle.name} </span>
                        </h1>

                        <span className={`bg-green-500 text-white py-1 p-1.5 rounded-sm capitalize text-[10px] md:text-[11px] font-normal shadow ${vehicle.listed ? "bg-green-500" : "bg-red-500"}`}>
                            {vehicle.listed ? (
                                <span> Available </span>
                            ) : (
                                <span> Unavailable </span>
                            )}
                        </span>
                    </div>

                    <div className='w-fit flex items-center gap-1.5'>
                        <button className={`bg-light-alt/30 dark:bg-dark-alt/30 hover:bg-light-alt hover:dark:bg-dark-alt p-1.5 rounded-full duration-300 transition-all ${isFav ? "text-red-600" : "text-gray-400"}`} title='Favorite' onClick={() => toggleFavorite(vehicle._id)}>
                            {isFav ? "❤️ Favorited" : (<Heart size={18} />)}
                        </button>
                        <button className='bg-light-alt/30 dark:bg-dark-alt/30 hover:bg-light-alt hover:dark:bg-dark-alt px-2 p-1.5 rounded-md text-xs md:text-sm flex items-center gap-1.5 duration-300 transition-all' title='Share'>
                            Share
                            <Share size={16} />
                        </button>
                    </div>
                </div>
                <p className='mt-2 font-semibold'>{formatAmount(vehicle.price)}</p>
                <p className='text-sm text-gray-600 capitalize'>{vehicle?.condition || "New"} ⁕ {vehicle.category}</p>
            </div>
        </div>
    </section>
  );
};

export default VehicleDetails;
