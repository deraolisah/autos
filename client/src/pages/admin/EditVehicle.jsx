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
  CheckIcon,
  ImageIcon,
  LinkIcon,
  XIcon,
  PlusIcon,
  WarningIcon,
} from '@phosphor-icons/react';
import { Save } from 'lucide-react';


/* -------------------------------------------------------------------------- */
/* SMALL COMPONENTS */
/* -------------------------------------------------------------------------- */

const InfoCard = ({ title, value }) => (
  <div className="border border-light-alt dark:border-dark-alt rounded-xl p-4">
    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
      {title}
    </p>
    <h4 className="font-semibold text-sm">{value}</h4>
  </div>
);

const PriceRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-[11.2px] border-b border-light-alt dark:border-dark-alt last:border-0">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className="font-semibold text-sm">{value}</span>
  </div>
);

/* A labelled text input used in edit mode */
const FieldInput = ({ label, id, value, onChange, placeholder, type = 'text', className = '' }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={id} className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-light-alt dark:border-dark-alt bg-transparent px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
    />
  </div>
);

/* A labelled select */
const FieldSelect = ({ label, id, value, onChange, options, className = '' }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={id} className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full border border-light-alt dark:border-dark-alt bg-transparent px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

/* Section wrapper with title */
const Section = ({ title, children, className = '' }) => (
  <div className={`p-5 space-y-4 ${className}`}>
    <h3 className="text-base font-semibold tracking-tight">{title}</h3>
    {children}
  </div>
);

// const Divider = () => (
//   <hr className="w-full h-px border-0 bg-light-alt dark:bg-dark-alt" />
// );


/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT */
/* -------------------------------------------------------------------------- */

const EditVehicle = () => {
  const { id } = useParams();
  const { vehicles, loading, setLoading, formatAmount } = useVehicle();
  const [showConfirm, setShowConfirm] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  const vehicle = vehicles.find((v) => v._id === id);

  useEffect(() => {
    if (vehicle?.images?.length) setSelectedImage(vehicle.images[0]);
  }, [vehicle]);

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading vehicle…</div>;
  if (!vehicle) return <div className="p-6 text-sm text-gray-500">Vehicle not found.</div>;

  const features = [
    'Bluetooth', 'GPS', 'Reverse Camera', 'Apple Car Play',
    'Android Auto', 'Leather Seats', 'USB Charger', 'Parking Sensors',
    'Sunroof', 'Heated Seats', 'Wireless Charging', 'Cruise Control',
  ];

  const colorSwatches = [
    'bg-red-500', 'bg-black', 'bg-white border border-gray-200',
    'bg-blue-700', 'bg-green-600', 'bg-yellow-400',
    'bg-gray-500', 'bg-purple-600',
  ];

  const API_URL = import.meta.env.VITE_API_URL;

  const handleEdit = () => { setEditData(vehicle); setIsEditing(true); };
  const handleCancel = () => { setEditData(vehicle); setIsEditing(false); };
  // Save Edits
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
  // Delete Vehicle
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_URL}/api/vehicles/delete/${id}`);
      if (response.data.success) {
        alert("Vehicle deleted successfully!");
      } else {
        alert("Failed to delete vehicle");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete vehicle");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const set = (key) => (e) => setEditData({ ...editData, [key]: e.target.value });

  return (
    <section className="space-y-0">
      <div className="sticky z-20 top-16 bg-light dark:bg-dark py-2.5 p-4 flex items-center justify-between">
        <button onClick={() => window.history.back()} className="flex items-center gap-0.5 text-xs px-1 pr-3 py-2.5 pt-2 rounded-md bg-light-alt/70 dark:bg-dark-alt/70 hover:bg-light-alt dark:hover:bg-dark-alt">
          <CaretLeftIcon size={12} weight="bold" className='mt-px' />
          Back
        </button>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-light-alt daerk:border-dark-alt bg-light-alt dark:bg-dark-alt hover:bg-light-alt dark:hover:bg-dark-alt text-sm">
              <PencilSimpleIcon size={14} />
              Edit vehicle
            </button>
          ) : (
            <>
              <button onClick={handleCancel} className="px-3 py-2 text-sm rounded-md border border-light-alt dark:border-dark-alt hover:bg-light-alt dark:hover:bg-dark-alt">
                Cancel
              </button>
              <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white">
                <Save size={14} strokeWidth={2} />
                Save changes
              </button>
            </>
          )}
        </div>

        <div className="ticks absolute! bottom-0 left-0!">
          <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
        </div>
      </div>
      
      {/* ── TOP HERO SECTION ── */}
      <div className="p-4 space-y-4">
        {/* Image + details layout */}
        <div className="flex flex-col lg:flex-row gap-5">

          {/* ── LEFT: Images ── */}
          <div className="lg:w-[420px] flex-shrink-0 space-y-3">

            {/* Main image (view mode) */}
            {/* {!isEditing && ( */}
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-light-alt dark:bg-dark-alt">
                <img
                  src={selectedImage}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>
            {/* )} */}

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hidden">
              {vehicle?.images?.map((img, i) => (
                <div key={i} className="relative flex-shrink-0 h-16 aspect-[3/2]">
                  <span className="text-xs absolute top-1 left-1 z-10 bg-black/50 text-white px-1.5 py-0.5 rounded-full leading-none">
                    {i + 1}
                  </span>
                  <img
                    src={img}
                    alt=""
                    onClick={() => setSelectedImage(img)}
                    className={`w-full h-full rounded-lg object-cover cursor-pointer border-2 transition-all ${
                      selectedImage === img ? 'border-blue-500' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Edit: Avatar URL */}
            {isEditing && (
              <div className="space-y-3 rounded-xl border border-light-alt dark:border-dark-alt p-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                  <ImageIcon size={13} />
                  Media
                </p>

                {/* Avatar */}
                <div className="flex items-center gap-2">
                  {editData?.avatar && (
                    <img src={editData.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-light-alt dark:border-dark-alt" />
                  )}
                  <FieldInput
                    label="Avatar URL"
                    id="avatar"
                    value={editData?.avatar || ""}
                    onChange={set('avatar')}
                    placeholder="https://..."
                    className="flex-1"
                  />
                </div>

                {/* Image URLs */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Gallery images <span className="text-gray-400">({editData?.images?.length || 0}/6)</span>
                  </p>

                  {editData?.images?.map((img, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <LinkIcon size={14} className="text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        value={img}
                        placeholder={`Image URL ${idx + 1}`}
                        onChange={(e) => {
                          const newImages = [...editData.images];
                          newImages[idx] = e.target.value;
                          setEditData({ ...editData, images: newImages });
                        }}
                        className="flex-1 border border-light-alt dark:border-dark-alt bg-transparent px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      />
                      <button
                        type="button"
                        onClick={() => setEditData({ ...editData, images: editData.images.filter((_, i) => i !== idx) })}
                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove image"
                      >
                        <XIcon size={14} />
                      </button>
                    </div>
                  ))}

                  {editData?.images?.length < 6 ? (
                    <button
                      type="button"
                      onClick={() => setEditData({ ...editData, images: [...(editData.images || []), ""] })}
                      className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
                    >
                      <PlusIcon size={13} />
                      Add image
                    </button>
                  ) : (
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                      <WarningIcon size={13} />
                      Maximum 6 images reached
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Vehicle details ── */}
          <div className="flex-1 space-y-4">

            {/* Name + status badges */}
            <div className="space-y-2">
              {isEditing ? (
                <FieldInput
                  label="Vehicle name"
                  id="name"
                  value={editData?.name || ""}
                  onChange={set('name')}
                  placeholder="e.g. Tesla Model 3"
                />
              ) : (
                <h1 className="text-2xl font-bold tracking-tight">{vehicle.name}</h1>
              )}

              {/* Year + category */}
              {isEditing ? (
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput label="Year" id="year" value={editData?.year || ""} onChange={set('year')} placeholder="e.g. 2023" />
                  <FieldInput label="Category" id="category" value={editData?.category || ""} onChange={set('category')} placeholder="e.g. SUV" />
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <span>{vehicle.year}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 inline-block" />
                  <span>{vehicle.category}</span>
                </p>
              )}

              {/* Status + price badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {isEditing ? (
                  <div className='flex items-center gap-2'>
                    <div className='space-y-1'>
                      <h4 className='text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide'> Listing Status </h4>
                      <label className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-light-alt dark:border-dark-alt cursor-pointer select-none">
                        <input
                          id="listed"
                          type="checkbox"
                          checked={editData?.listed || false}
                          onChange={(e) => setEditData({ ...editData, listed: e.target.checked })}
                          className="w-3.5 h-3.5 accent-blue-600"
                        />
                        Listed
                      </label>
                    </div>
                    <FieldInput label="Price" id="price" value={editData?.price || ""} onChange={set('price')} placeholder="e.g. SUV" />
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${vehicle.listed ? "bg-green-700 text-green-100 dark:bg-green-900/30 dark:text-green-400" : "bg-red-600 text-red-100 dark:bg-red-900/30 dark:text-red-400"}`}>
                      {vehicle.listed ? "● Listed" : "● Unlisted"}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-light-alt dark:bg-dark-alt">
                      {formatAmount(vehicle.price)}
                    </span>
                  </div>
                )}

                {/* <span className="text-xs font-semibold px-3 py-1 rounded-full bg-light-alt dark:bg-dark-alt">
                  {formatAmount(vehicle.price)} / day
                </span> */}
              </div>
            </div>



            {/* <div className="ticks">
              <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
            </div> */}



            {/* Quick spec cards */}
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-6 mb-2">Specifications</p>
              {isEditing ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <FieldInput label="Doors" id="doors" value={editData?.doors || ""} onChange={set('doors')} placeholder="4" />
                  <FieldInput label="Seats" id="seats" value={editData?.seats || ""} onChange={set('seats')} placeholder="5" />
                  <FieldInput label="Fuel type" id="fuelType" value={editData?.fuelType || ""} onChange={set('fuelType')} placeholder="Petrol" />
                  <FieldInput label="Transmission" id="transmission" value={editData?.transmission || ""} onChange={set('transmission')} placeholder="Automatic" />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: <CarProfileIcon size={20} />, label: 'Doors', value: vehicle.doors || 4 },
                    { icon: <SeatIcon size={20} />, label: 'Seats', value: vehicle.seats || 5 },
                    { icon: <GasPumpIcon size={20} />, label: 'Fuel type', value: vehicle.fuelType || 'Electric' },
                    { icon: <SteeringWheelIcon size={20} />, label: 'Transmission', value: vehicle.transmission || 'Automatic' },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="border border-light-alt dark:border-dark-alt rounded-xl p-3 space-y-1">
                      <div className="text-gray-400">{icon}</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                      <p className="text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Edit: additional fields shown only in edit mode */}
            {isEditing && (
              <div className="rounded-xl border border-light-alt dark:border-dark-alt p-4 space-y-3">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Additional details</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <FieldInput label="Daily price (₦)" id="price" value={editData?.price || ""} onChange={set('price')} placeholder="0.00" />
                  <FieldInput label="Plate number" id="plateNumber" value={editData?.plateNumber || ""} onChange={set('plateNumber')} placeholder="e.g. X7P 63Z" />
                  <FieldInput label="Province" id="province" value={editData?.province || ""} onChange={set('province')} placeholder="e.g. Toronto" />
                  <FieldInput label="MPG" id="mpg" value={editData?.mpg || ""} onChange={set('mpg')} placeholder="e.g. 30 MPG" />
                  <FieldInput label="Grade" id="grade" value={editData?.grade || ""} onChange={set('grade')} placeholder="e.g. Regular" />
                  <FieldInput label="VIN" id="vin" value={editData?.vin || ""} onChange={set('vin')} placeholder="e.g. 1HGCM82633A..." />
                  <FieldInput label="Model" id="model" value={editData?.model || ""} onChange={set('model')} placeholder="e.g. Model 3" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="ticks">
        <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
      </div>

      {/* ── DETAILS GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-0">

        {/* ── LEFT ── */}
        <div className="xl:col-span-2 xl:border-r border-light-alt dark:border-dark-alt">

          {/* Car information */}
          {/* <Section title="Car information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard title="Vehicle name" value={`${vehicle.name} ${vehicle.model || ''}`.trim()} />
              <InfoCard title="License plate" value={vehicle.plateNumber || 'X7P 63Z'} />
              <InfoCard title="Province" value={vehicle.province || 'Toronto'} />
              <InfoCard title="MPG" value={vehicle.mpg || '30 MPG'} />
              <InfoCard title="Car grade" value={vehicle.grade || 'Regular'} />
              <InfoCard title="VIN" value={vehicle.vin || '1HGCM82633A472915'} />
            </div>
          </Section> */}

          {/* Features */}
          <Section title="Car features">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm">
                  <div className="w-5 h-5 rounded-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 flex-shrink-0 flex items-center justify-center">
                    <CheckIcon size={11} weight="bold" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </Section>

          <div className="ticks">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
          </div>

          {/* Description */}
          <Section title="Description">
            {isEditing ? (
              <textarea
                value={editData?.description || ""}
                onChange={set('description')}
                placeholder="Write a short description of the vehicle…"
                rows={3}
                className="w-full border border-light-alt dark:border-dark-alt bg-transparent px-3 py-2 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {vehicle.description || 'No description provided yet.'}
              </p>
            )}
          </Section>



          <div className="ticks">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
          </div>


          {/* Colors */}
          <Section title="Available colors">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Exterior</p>
              <div className="flex flex-wrap gap-2.5">
                {colorSwatches.map((color, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full ${color} shadow-sm`}
                    title={`Color ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </Section>
        </div>


        <div className="xl:hidden ticks">
          <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
        </div>

        {/* ── RIGHT ── */}
        <div className="">
          {/* Pricing */}
          <Section title="Pricing">
            <PriceRow label="Daily price" value={formatAmount(vehicle.price)} />
            <PriceRow label="Weekly discount" value="10%" />
            <PriceRow label="Monthly discount" value="20%" />
            <PriceRow label="Security deposit" value="$500" />
          </Section>

          <div className="ticks">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt " />
          </div>

          {/* Listing status */}
          <Section title="Delete Vehicle">
            <button onClick={() => setShowConfirm(true)} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete vehicle
            </button>

            {showConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white p-4 rounded shadow-md flex flex-col items-center gap-0">
                  <p>Are you sure you want to delete this vehicle?</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
                      {loading ? "Deleting" : "Yes, Delete"}
                    </button>
                    <button onClick={() => setShowConfirm(false)} className="bg-gray-300 px-3 py-1 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Section>

        </div>
      </div>
    </section>
  );
};

export default EditVehicle;