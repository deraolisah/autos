import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useVehicle } from '../../contexts/vehicleContext';
import axios from "axios";
import {
  CaretLeftIcon,
  CarProfileIcon,
  GasPumpIcon,
  SeatIcon,
  SteeringWheelIcon,
  PaletteIcon,
  PencilSimpleIcon,
  CheckIcon
} from '@phosphor-icons/react';



/* -------------------------------------------------------------------------- */
/* COMPONENTS */
/* -------------------------------------------------------------------------- */

const InfoCard = ({ title, value }) => {
  return (
    <div className="border border-light-alt dark:border-dark-alt rounded-xl p-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </p>

      <h4 className="font-semibold">{value}</h4>
    </div>
  );
};

const PriceRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between border-b border-light-alt dark:border-dark-alt pb-3">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {label}
      </span>

      <span className="font-semibold">{value}</span>
    </div>
  );
};

const EditVehicle = () => {
  const { id } = useParams();
  const { vehicles, loading, formatAmount } = useVehicle();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  const vehicle = vehicles.find((v) => v._id === id);

  useEffect(() => {
    if (vehicle?.images?.length) {
      setSelectedImage(vehicle.images[0]);
    }
  }, [vehicle]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!vehicle) {
    return <div className="p-6">Vehicle not found</div>;
  }

  const features = [
    'Bluetooth',
    'GPS',
    'Reverse Camera',
    'Apple Car Play',
    'Android Auto',
    'Leather Seats',
    'USB Charger',
    'Parking Sensors',
    'Sunroof',
    'Heated Seats',
    'Wireless Charging',
    'Cruise Control',
  ];

  const colors = [
    'bg-red-500',
    'bg-black',
    'bg-white border',
    'bg-blue-700',
    'bg-green-600',
    'bg-yellow-400',
    'bg-gray-500',
    'bg-purple-600',
  ];

  const API_URL = import.meta.env.VITE_API_URL;


  const handleEdit = () => {
    setEditData(vehicle); // preload form with vehicle data
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.patch(`${API_URL}/api/vehicles/patch/${id}`, editData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Vehicle updated!");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update vehicle");
    }
  };

  const handleCancel = () => {
    setEditData(vehicle);   // reset form back to original vehicle values
    setIsEditing(false);    // exit edit mode
  };

  return (
    <section className="space-y-0">
      {/* TOP CARD */}
      <div className="p-4 space-y-4 ">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-0 text-xs px-2 py-1.5 pt-1 rounded-sm bg-light-alt/60 dark:bg-dark-alt/60 hover:bg-light-alt dark:hover:bg-dark-alt "
        >
          <CaretLeftIcon size={12} weight="bold" className="mt-px" />
          back
        </button>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Vehicle Image */}
          <div className="lg:w-100 flex flex-col justify-between gap-3">
            {!isEditing && (
              <img
                src={selectedImage}
                alt={vehicle.name}
                className="w-full aspect-video object-cover rounded-lg"
              />
            )}

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-y-hidden overflow-x-auto scrollbar-hidden rounded-lg">
              {vehicle?.images?.map((img, i) => (
                <div className='aspect-3/2 h-16 relative'>
                  <span className='text-xs absolute top-1 left-1 z-2 bg-light-alt dark:bg-dark-alt px-2 p-0.5 rounded-full'>{i+1 }</span>
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() => setSelectedImage(img)}
                    className={`min-w-full h-full rounded-lg object-cover cursor-pointer border-2 ${
                      selectedImage === img
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Avatar */}
            {isEditing && (
              <div className="w-full flex items-center gap-2">
                <img src={editData?.avatar} alt="Avatar" className="min-w-6.5 h-6.5 rounded-full object-cover" />
                <input
                  type="text"
                  value={editData?.avatar || ""}
                  onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
                  className="w-full border border-light-alt dark:border-dark-alt px-1.5 p-px rounded-md"
                  />
              </div>
            )}

            {isEditing && (
              <div className="w-full flex flex-col gap-1.5">
                {editData?.images?.map((img, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={img}
                      placeholder={`Image URL ${idx + 1}`}
                      onChange={(e) => {
                        const newImages = [...editData.images];
                        newImages[idx] = e.target.value;
                        setEditData({ ...editData, images: newImages });
                      }}
                      className="w-full border border-light-alt dark:border-dark-alt px-1 p-px rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = editData.images.filter((_, i) => i !== idx);
                        setEditData({ ...editData, images: newImages });
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* Only show Add Image button if less than 6 images */}
                {editData?.images?.length < 6 && (
                  <button
                    type="button"
                    onClick={() =>
                      setEditData({ ...editData, images: [...(editData.images || []), ""] })
                    }
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Add Image ({editData?.images?.length || 0}/6)
                  </button>
                )}

                {/* Show warning when max images reached */}
                {editData?.images?.length === 6 && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    Maximum 6 images reached. Remove some images to add more.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Vehicle Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className='space-y-1.5'>
                  <h2 className="text-2xl font-bold">
                    {/* {vehicle.name} {vehicle.model} */}
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData?.name || ""}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full border border-light-alt dark:border-dark-alt px-1.5 p-px rounded-md"
                      />
                    ) : (
                      `${vehicle?.name}`
                    )}
                  </h2>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {/* {vehicle.year} • {vehicle.category} */}
                    {isEditing ? (
                      <div className="flex items-center flex-wrap gap-1.5">
                        <input 
                          type='text'
                          value={editData?.year || ""}
                          placeholder='Year'
                          onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                          className='border border-light-alt dark:border-dark-alt px-1.5 p-px rounded-md'
                        />
                        <input 
                          type='text'
                          value={editData?.category || ""}
                          placeholder='Category'
                          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                          className='border border-light-alt dark:border-dark-alt px-1.5 p-px rounded-md'
                        />
                      </div>
                    ) : (
                      <p className='flex items-center gap-2'>
                        <span> {vehicle?.year}  </span>
                        ⁕  
                        <span> {vehicle?.category} </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className='flex items-center gap-1.5'>
                  {!isEditing ? (
                    <button type='button' onClick={handleEdit} className="flex items-center gap-2 bg-light-alt/60 dark:bg-dark-alt/60 hover:bg-light-alt dark:hover:bg-dark-alt px-4 py-1.5 rounded-md text-sm ">
                      <PencilSimpleIcon size={16} strokeWidth={1} />
                      Edit
                    </button>
                  ) : (
                    <button onClick={handleSave} className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white">
                      Save
                    </button>
                  )}
                  <button onClick={handleCancel} className='px-4 py-1.5 text-sm rounded-md bg-red-500/50'>
                    Cancel
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 bg-yellow-500/0">
                {isEditing ? (
                  <div className='text-sm px-3 py-1 rounded-full flex items-center gap-1 bg-light-alt dark:bg-dark-alt'>
                    <input 
                      id='listed'
                      type='checkbox'
                      checked={editData?.listed || ""}
                      onChange={(e) => setEditData({ ...editData, listed: e.target.checked })}
                      className=''
                    />
                    <label htmlFor='listed'>
                      Listed
                    </label>
                  </div>
                ) : (
                  <div className={`text-sm px-3 py-1 rounded-full shadow dark:shadow-white/20 ${vehicle.listed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {vehicle.listed ? "Listed" : "Unlisted"}
                  </div>
                )}

                <div className="bg-light-alt dark:bg-dark-alt text-sm px-3 py-1 rounded-full shadow dark:shadow-white/20">
                  {formatAmount(vehicle.price)}
                </div>
              </div>


              <div>
                {isEditing ? (
                  <input
                  type='text'
                  value={editData?.description || ""}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className='border border-light-alt dark:border-dark-alt px-1.5 p-px rounded-md'
                  />
                ) : (
                  <p> {vehicle?.description || ""} </p>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-light-alt dark:border-dark-alt rounded-xl p-4 py-2">
                <CarProfileIcon size={24} />
                <p className="text-xs text-gray-500">Doors</p>
                <h4 className="font-semibold">
                  {vehicle?.doors || 4}
                </h4>
              </div>

              <div className="border border-light-alt dark:border-dark-alt rounded-xl p-4 py-2">
                <SeatIcon size={24} />
                <p className="text-xs text-gray-500">Seats</p>
                <h4 className="font-semibold">
                  {vehicle?.seats || 5}
                </h4>
              </div>

              <div className="border border-light-alt dark:border-dark-alt rounded-xl p-4 py-2">
                <GasPumpIcon size={24} />
                <p className="text-xs text-gray-500">Fuel Type</p>
                <h4 className="font-semibold">
                  {vehicle?.fuelType || 'Electric'}
                </h4>
              </div>

              <div className="border border-light-alt dark:border-dark-alt rounded-xl p-4 py-2">
                <SteeringWheelIcon size={24} />
                <p className="text-xs text-gray-500">Transmission</p>
                <h4 className="font-semibold">
                  {vehicle?.transmission || 'Automatic'}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="ticks">
        <hr className="w-full my-2 h-px border-0 bg-light-alt dark:bg-dark-alt " />
      </div>


      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-0">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 xl:border-r border-light-alt dark:border-dark-alt ">
          {/* Vehicle Information */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">
              Car Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoCard
                title="Vehicle Name"
                value={`${vehicle.name} ${vehicle.model}`}
              />

              <InfoCard
                title="License Plate"
                value={vehicle?.plateNumber || 'X7P 63Z'}
              />

              <InfoCard
                title="Province"
                value={vehicle?.province || 'Toronto'}
              />

              <InfoCard
                title="MPG"
                value={vehicle?.mpg || '30 MPG'}
              />

              <InfoCard
                title="Car Grade"
                value={vehicle?.grade || 'Regular'}
              />

              <InfoCard
                title="VIN"
                value={vehicle?.vin || '1HGCM82633A472915'}
              />
            </div>
          </div>

          <div className="ticks">
            <hr className="w-full h-px my-2 border-0 bg-light-alt dark:bg-dark-alt " />
          </div>

          {/* Features */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">
              Car Features
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm"
                >
                  <div className="w-5 h-5 rounded bg-black text-white flex items-center justify-center">
                    <CheckIcon size={12} weight="bold" />
                  </div>

                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="ticks ">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
          </div>

          {/* Description */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">
              Description
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {vehicle?.description ||
                'Luxury electric vehicle with premium interior, autopilot support, heated seats, panoramic roof and advanced driver assistance systems.'}
            </p>
          </div>
        </div>


        <div className="ticks lg:hidden">
          <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">
              Pricing
            </h3>

            <div className="space-y-4">
              <PriceRow
                label="Daily Price"
                value={`${formatAmount(vehicle.price)}`}
              />

              <PriceRow
                label="Weekly Discount"
                value="10%"
              />

              <PriceRow
                label="Monthly Discount"
                value="20%"
              />

              <PriceRow
                label="Security Deposit"
                value="$500"
              />
            </div>
          </div>

          <div className="ticks">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
          </div>

          {/* Colors */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <PaletteIcon size={22} />
              <h3 className="text-xl font-semibold">Colors</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-3">
                  Exterior
                </p>

                <div className="flex flex-wrap gap-3">
                  {colors.map((color, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ticks">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
          </div>

          {/* Status */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">
              Listing Status
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-sm">Current Status</span>

              <div className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                Listed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditVehicle;