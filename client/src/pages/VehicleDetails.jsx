import React, { useState, useEffect } from 'react'
import { useVehicle } from '../contexts/vehicleContext';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Expand, Heart, Share, 
  Fuel, Gauge, Calendar, Users, Car, Settings,
  Shield, CheckCircle, XCircle, AlertCircle, Clock,
  MapPin, Star, Phone, Mail, MessageCircle
} from 'lucide-react';
import { useFavorite } from '../contexts/favoriteContext';
import FavoriteButton from '../components/FavoriteButton';


const VehicleDetails = () => {
    const { id } = useParams();
    const { formatAmount, vehicles, loading, error } = useVehicle();
    const { isFavorited, favorites, toggleFavorite } = useFavorite(); 
    
    const vehicle = vehicles.find(p => p._id === id);
    // const isFav = isFavorited(vehicle?._id);

  // Placeholders to fill up to 4 thumbnails
  const placeholders = [
    'https://picsum.photos/500?random=1',
    'https://picsum.photos/500?random=2',
    'https://picsum.photos/500?random=3',
    'https://picsum.photos/500?random=4',
    'https://picsum.photos/500?random=5',
    'https://picsum.photos/500?random=6',
  ];

   
    const [selectedImage, setSelectedImage] = useState(null);  // State for selected main image
    const [ showLightbox, setShowLightbox ] = useState(false); // State for Lighbox 
    const [activeTab, setActiveTab] = useState('details'); // details, features, specs

    const togglelightbox = () => { setShowLightbox(prev => !prev) };

  // Update selectedImage when vehicle changes
    useEffect(() => {
        if (vehicle?.images?.length) {
            setSelectedImage(vehicle.images[0]);
        } else {
            setSelectedImage('https://via.placeholder.com/400x300?text=No+Image');
        }
    }, [vehicle]);


    if (loading) return (
        <div className="container py-12 flex justify-center items-center">
            <div className="animate-pulse text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading vehicle details...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="container py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400">
                <AlertCircle className="inline mr-2" size={20} />
                Error: {error}
            </div>
        </div>
    );
    

    if (!vehicle) return (
        <div className="container py-12 text-center">
            <Car className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-xl font-semibold mb-2">Vehicle not found</h2>
            <p className="text-gray-500 mb-4">The vehicle you're looking for doesn't exist or has been removed.</p>
            <Link to="/vehicles" className="text-blue-600 hover:underline">Browse other vehicles →</Link>
        </div>
    );

    

    // Format specifications for display
    const specifications = [
        { icon: <Car size={18} />, label: "Type", value: vehicle.vehicleType || "Not specified" },
        { icon: <Calendar size={18} />, label: "Year", value: vehicle.year || "Not specified" },
        { icon: <Users size={18} />, label: "Seats", value: vehicle.seats || "Not specified" },
        { icon: <Car size={18} />, label: "Doors", value: vehicle.doors || "Not specified" },
        { icon: <Settings size={18} />, label: "Transmission", value: vehicle.transmission || "Not specified" },
        { icon: <Fuel size={18} />, label: "Fuel Type", value: vehicle.fuelType || "Not specified" },
        { icon: <Gauge size={18} />, label: "Engine", value: vehicle.engineSize || "Not specified" },
        { icon: <Gauge size={18} />, label: "Horsepower", value: vehicle.horsepower ? `${vehicle.horsepower} HP` : "Not specified" },
    ];

    const conditionInfo = {
        New: { color: "bg-green-500", icon: <CheckCircle size={14} />, text: "Brand New" },
        Used: { color: "bg-blue-500", icon: <Clock size={14} />, text: "Pre-owned" },
        CPO: { color: "bg-purple-500", icon: <Shield size={14} />, text: "Certified Pre-Owned" },
        Refurbished: { color: "bg-yellow-500", icon: <Settings size={14} />, text: "Refurbished" },
        Salvage: { color: "bg-red-500", icon: <AlertCircle size={14} />, text: "Salvage" },
    };

    const currentCondition = conditionInfo[vehicle.condition] || conditionInfo.Used;

    // Get warranty display text
    const getWarrantyText = (warranty) => {
        if (!warranty || warranty === "None") return "No warranty";
        return `${warranty} warranty`;
    };


    // // Build thumbnails (max 6)
    // const displayThumbnails = (vehicle.images || []).slice(0, 6);
    
    // // Add placeholder if no images
    // if (displayThumbnails.length === 0) {
    //     displayThumbnails.push('https://via.placeholder.com/800x600?text=No+Image+Available');
    // }



  // Build thumbnails: real images first, placeholders fill the rest up to 6
    const thumbnails = [...(vehicle.images || [])];
    // Only add placeholders up to 6 total images
    while (thumbnails.length < 6) {
    thumbnails.push(placeholders[thumbnails.length]);
    }
    // If there are more than 6 real images, only take the first 6
    const displayThumbnails = thumbnails.slice(0, 6);


  return (
    <section className='container py-4'>

        <div className='w-full flex flex-col sm:flex-row gap-4'>
            <div className='w-full sm:w-1/2 flex flex-col gap-2.5'>
                {/* Main Image */}
                {selectedImage && (
                    <div className='relative rounded-md overflow-hidden'>
                        <button className='absolute z-2 top-2 left-2 bg-light/80 dark:bg-dark/80 backdrop-blur-sm p-1 pr-2 rounded-sm text-xs flex items-center gap-0 cursor-pointer ' onClick={()=> {window.history.back()}}>
                            <ChevronLeft size={14} />
                            back
                        </button>
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
                    <div className='fixed z-20000 inset-0 w-full h-full flex items-center justify-center p-4! bg-light/60 dark:bg-dark/60 backdrop-blur-md'>
                        <div className='w-full h-full max-h-[84vh] relative'>
                            <img src={selectedImage} alt='' className='w-full object-contain h-full' />
                        </div>
                        <button onClick={()=>{setShowLightbox(false)}} className='fixed top-4 right-4 py-1 px-2 text-xs font-medium rounded-sm uppercase text-light dark:text-dark bg-dark dark:bg-light'> close </button>
                    </div>
                )}

                {/* Thumbnails */}
                <div className='grid grid-cols-6 gap-2.5'>
                    {displayThumbnails.slice(0, 6).map((img, index) => (
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


            {/* Right Column - Vehicle Info */}
            <div className='w-full flex-1  space-y-4'>
                {/* Title and Actions */}
                <div className='space-y-3'>
                    <div className='flex items-start justify-between gap-2'>
                        <div className='flex-1'>
                            <h1 className='text-lg md:text-xl lg:text-2xl font-bold leading-tight'>
                                {vehicle.year} {vehicle.name}
                            </h1>
                            <p className='text-sm text-gray-500 mt-1'>
                                {vehicle.model && `${vehicle.model} • `}
                                {vehicle.category || "Standard"} Class
                            </p>
                        </div>
                        
                        <div className='flex items-center gap-2'>
                            <FavoriteButton vehicleId={vehicle._id} />
                            <button 
                                className='p-2 rounded-full bg-gray-100 dark:bg-dark-alt hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                                title='Share'
                                onClick={() => {
                                    navigator.share ? navigator.share({ title: vehicle.name, url: window.location.href }) : navigator.clipboard.writeText(window.location.href);
                                }}
                            >
                                <Share size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Status Badges */}
                    <div className='flex flex-wrap gap-2'>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${currentCondition.color} text-white`}>
                            {currentCondition.icon}
                            {currentCondition.text}
                        </span>
                        
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                            vehicle.listed 
                                ? 'bg-green-200 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}>
                            {vehicle.listed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                            {vehicle.listed ? "Available" : "Unavailable"}
                        </span>

                        {vehicle.featured && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                                <Star size={14} />
                                Featured
                            </span>
                        )}

                        {vehicle.verified && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                <Shield size={14} />
                                Verified
                            </span>
                        )}
                    </div>

                    {/* Price */}
                    <div className='border-t border-b border-light-alt dark:border-dark-alt py-3'>
                        <div className='flex items-baseline gap-2'>
                            <span className='text-3xl font-bold'>{formatAmount(vehicle.price)}</span>
                            {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
                                <>
                                    <span className='text-lg text-gray-400 line-through'>{formatAmount(vehicle.originalPrice)}</span>
                                    <span className='text-sm text-green-600 font-medium'>
                                        Save {Math.round(((vehicle.originalPrice - vehicle.price) / vehicle.originalPrice) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>
                        {vehicle.warranty && vehicle.warranty !== "None" && (
                            <p className='text-sm text-green-600 mt-1'>
                                <Shield size={14} className="inline mr-1" />
                                {getWarrantyText(vehicle.warranty)} included
                            </p>
                        )}
                    </div>
                </div>

                {/* Key Specifications Grid */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                    {specifications.slice(0, 4).map((spec, idx) => (
                        <div key={idx} className='bg-light-alt dark:bg-dark-alt rounded-lg p-3'>
                            <div className='text-gray-400 mb-1'>{spec.icon}</div>
                            <p className='text-xs text-gray-500'>{spec.label}</p>
                            <p className='text-sm font-semibold mt-0.5'>{spec.value}</p>
                        </div>
                    ))}
                </div>

                {/* Description */}
                {vehicle.description && (
                    <div className='bg-light-alt dark:bg-dark-alt rounded-lg p-4'>
                        <h3 className='font-semibold mb-2'>Description</h3>
                        <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
                            {vehicle.description}
                        </p>
                    </div>
                )}
            </div>
        </div>


        <div className='w-full mt-8'>
            {/* Tabs */}
            <div className='border-b border-light-alt dark:border-dark-alt'>
                <div className='flex gap-4'>
                    {['details', 'features', 'specs'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-2 text-sm font-medium capitalize transition-colors border-b-2 ${
                                activeTab === tab
                                    ? 'border-primary text-primary text-shadow-2xs'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className='py-2'>
                {activeTab === 'details' && (
                    <div className='space-y-3'>
                        <div className='grid grid-cols-2 gap-4 md:gap-6 gap-y-3'>
                            <div className='flex justify-between py-2 border-b border-light-alt dark:border-dark-alt'>
                                <span className='text-sm text-gray-500'>Condition</span>
                                <span className='text-sm font-medium capitalize'>{vehicle.condition}</span>
                            </div>
                            <div className='flex justify-between py-2 border-b border-light-alt dark:border-dark-alt'>
                                <span className='text-sm text-gray-500'>Mileage</span>
                                <span className='text-sm font-medium'>{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'Not applicable'}</span>
                            </div>
                            <div className='flex justify-between py-2 border-b border-light-alt dark:border-dark-alt'>
                                <span className='text-sm text-gray-500'>Accident History</span>
                                <span className={`text-sm font-medium ${vehicle.accidentHistory ? 'text-red-600' : 'text-green-600'}`}>
                                    {vehicle.accidentHistory ? 'Reported' : 'None'}
                                </span>
                            </div>
                            <div className='flex justify-between py-2 border-b border-light-alt dark:border-dark-alt'>
                                <span className='text-sm text-gray-500'>Service History</span>
                                <span className='text-sm font-medium'>{vehicle.serviceHistory ? 'Available' : 'Not available'}</span>
                            </div>
                            <div className='flex justify-between py-2 border-b border-light-alt dark:border-dark-alt'>
                                <span className='text-sm text-gray-500'>Exterior Color</span>
                                <span className='text-sm font-medium capitalize'>{vehicle.exteriorColor || 'Not specified'}</span>
                            </div>
                            <div className='flex justify-between py-2 border-b border-light-alt dark:border-dark-alt'>
                                <span className='text-sm text-gray-500'>Interior Color</span>
                                <span className='text-sm font-medium capitalize'>{vehicle.interiorColor || 'Not specified'}</span>
                            </div>
                        </div>
                        <div className='mt-3 p-3 bg-light-alt dark:bg-dark-alt rounded-lg text-sm'>
                            <p className='text-gray-500'>Listed on {new Date(vehicle.createdAt).toLocaleDateString()}</p>
                            {/* <p className='text-gray-500 text-xs mt-1'>Last updated {new Date(vehicle.updatedAt).toLocaleDateString()}</p> */}
                        </div>
                    </div>
                )}

                {activeTab === 'features' && (
                    <div className='grid grid-cols-2 gap-2'>
                        {(vehicle.features || []).length > 0 ? (
                            vehicle.features.map((feature, idx) => (
                                <div key={idx} className='flex items-center gap-2 text-sm py-1.5'>
                                    <CheckCircle size={14} className='text-green-500 flex-shrink-0' />
                                    <span>{feature}</span>
                                </div>
                            ))
                        ) : (
                            <p className='text-gray-500 col-span-2 text-center py-4'>No features listed for this vehicle</p>
                        )}
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div className='space-y-3'>
                        <div className='grid grid-cols-2 gap-3'>
                            {specifications.map((spec, idx) => (
                                <div key={idx} className='flex justify-between py-2 border-b border-gray-100 dark:border-gray-800'>
                                    <span className='text-sm text-gray-500'>{spec.label}</span>
                                    <span className='text-sm font-medium'>{spec.value}</span>
                                </div>
                            ))}
                        </div>
                        {vehicle.tags && vehicle.tags.length > 0 && (
                            <div className='mt-3'>
                                <p className='text-sm text-gray-500 mb-2'>Tags</p>
                                <div className='flex flex-wrap gap-2'>
                                    {vehicle.tags.map((tag, idx) => (
                                        <span key={idx} className='px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs'>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Contact/Action Buttons */}
            <div className='flex gap-3 pt-2'>
                <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors'>
                    <Phone size={18} className="inline mr-2" />
                    Contact Seller
                </button>
                <button className='flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-3 rounded-lg transition-colors'>
                    <MessageCircle size={18} className="inline mr-2" />
                    Send Message
                </button>
            </div>

            {/* Rating Section */}
            {vehicle.ratings > 0 && (
                <div className='flex items-center gap-2 pt-2 text-sm'>
                    <div className='flex items-center'>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className={`${i < Math.floor(vehicle.ratings) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className='font-medium'>{vehicle.ratings}</span>
                    <span className='text-gray-500'>({vehicle.reviewCount || 0} reviews)</span>
                </div>
            )}
        </div>
    </section>
  );
};

export default VehicleDetails;