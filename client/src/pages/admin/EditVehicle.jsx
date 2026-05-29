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
  EngineIcon,
  GaugeIcon,
  CalendarIcon,
  TagIcon,
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
    <h4 className="font-semibold text-sm">{value || 'Not specified'}</h4>
  </div>
);

const PriceRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-[11.2px] border-b border-light-alt dark:border-dark-alt last:border-0">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className="font-semibold text-sm">{value}</span>
  </div>
);

/* A labelled text input used in edit mode */
const FieldInput = ({ label, id, value, onChange, placeholder, type = 'text', className = '', required = false }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={id} className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-light-alt dark:border-dark-alt bg-transparent px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
    />
  </div>
);

/* A labelled select */
const FieldSelect = ({ label, id, value, onChange, options, className = '', required = false }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={id} className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      value={value || ''}
      onChange={onChange}
      className="w-full border border-light-alt dark:border-dark-alt bg-transparent px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
    >
      <option value="">Select {label}</option>
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

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT */
/* -------------------------------------------------------------------------- */

const EditVehicle = () => {
  const { id } = useParams();
  const { vehicles, loading, setLoading, formatAmount } = useVehicle();
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  const vehicle = vehicles.find((v) => v._id === id);

  // Pre-defined options based on schema enums
  const vehicleTypeOptions = [
    { value: "Car", label: "Car" },
    { value: "SUV", label: "SUV" },
    { value: "Truck", label: "Truck" },
    { value: "Pick-up", label: "Pick-up" },
    { value: "Van", label: "Van" },
    { value: "Motorcycle", label: "Motorcycle" },
    { value: "Bus", label: "Bus" },
    { value: "Minivan", label: "Minivan" },
  ];

  const fuelTypeOptions = [
    { value: "Petrol", label: "Petrol" },
    { value: "Diesel", label: "Diesel" },
    { value: "Electric", label: "Electric" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Plug-in Hybrid", label: "Plug-in Hybrid" },
  ];

  const transmissionOptions = [
    { value: "Automatic", label: "Automatic" },
    { value: "Manual", label: "Manual" },
    { value: "CVT", label: "CVT" },
    { value: "Semi-automatic", label: "Semi-automatic" },
    { value: "Dual-clutch", label: "Dual-clutch" },
  ];

  const conditionOptions = [
    { value: "New", label: "New" },
    { value: "Used", label: "Used" },
    { value: "CPO", label: "CPO (Certified Pre-Owned)" },
    { value: "Refurbished", label: "Refurbished" },
    { value: "Salvage", label: "Salvage" },
  ];

  const categoryOptions = [
    { value: "Luxury", label: "Luxury" },
    { value: "Economy", label: "Economy" },
    { value: "Family", label: "Family" },
    { value: "Sports", label: "Sports" },
    { value: "Off-road", label: "Off-road" },
    { value: "Commercial", label: "Commercial" },
    { value: "Eco-friendly", label: "Eco-friendly" },
  ];

  const colorOptions = [
    "Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", "Orange", "Brown", "Other"
  ];

  const featureOptions = [
    "Air Conditioning", "Power Steering", "Airbags", "ABS", "GPS", "Sunroof", 
    "Leather Seats", "Bluetooth", "Backup Camera", "Keyless Entry", "Cruise Control",
    "Heated Seats", "Apple CarPlay", "Android Auto", "Parking Sensors", "ESC"
  ];

  const warrantyOptions = [
    { value: "None", label: "None" },
    { value: "3 months", label: "3 months" },
    { value: "6 months", label: "6 months" },
    { value: "1 year", label: "1 year" },
    { value: "2 years", label: "2 years" },
    { value: "3 years", label: "3 years" },
    { value: "5 years", label: "5 years" },
  ];

  useEffect(() => {
    if (vehicle?.images?.length) setSelectedImage(vehicle.images[0]);
  }, [vehicle]);

  // Validate form before saving
  const validateForm = () => {
    const newErrors = {};
    
    if (!editData?.name?.trim()) newErrors.name = "Vehicle name is required";
    if (!editData?.brand?.trim()) newErrors.brand = "Brand is required";
    if (!editData?.price || editData.price < 0) newErrors.price = "Valid price is required";
    if (!editData?.condition) newErrors.condition = "Condition is required";
    if (editData?.condition === "Used" && !editData?.mileage) newErrors.mileage = "Mileage is required for used vehicles";
    if (editData?.images?.length < 1) newErrors.images = "At least one image is required";
    if (editData?.images?.length > 8) newErrors.images = "Maximum 8 images allowed";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading vehicle…</div>;
  if (!vehicle) return <div className="p-6 text-sm text-gray-500">Vehicle not found.</div>;

  const API_URL = import.meta.env.VITE_API_URL;

  const handleEdit = () => { 
    setEditData({ ...vehicle }); 
    setIsEditing(true); 
    setErrors({});
  };
  
  const handleCancel = () => { 
    setEditData(null); 
    setIsEditing(false); 
    setErrors({});
  };
  
  // Save Edits
  const handleSave = async () => {
    if (!validateForm()) {
      alert("Please fix the validation errors before saving");
      return;
    }
    
    try {
      await axios.patch(`${API_URL}/api/vehicles/patch/${id}`, editData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Vehicle updated successfully!");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update vehicle");
    }
  };
  
  // Delete Vehicle
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_URL}/api/vehicles/delete/${id}`);
      if (response.data.success) {
        alert("Vehicle deleted successfully!");
        window.location.href = "/vehicles";
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

  const set = (key) => (e) => {
    setEditData({ ...editData, [key]: e.target.value });
    // Clear error for this field
    if (errors[key]) setErrors({ ...errors, [key]: null });
  };

  const handleFeatureToggle = (feature) => {
    const currentFeatures = editData?.features || [];
    if (currentFeatures.includes(feature)) {
      setEditData({ ...editData, features: currentFeatures.filter(f => f !== feature) });
    } else {
      setEditData({ ...editData, features: [...currentFeatures, feature] });
    }
  };

  const handleColorSelect = (colorType, color) => {
    setEditData({ ...editData, [colorType]: color });
  };

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
              className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-light-alt dark:border-dark-alt bg-light-alt dark:bg-dark-alt hover:bg-light-alt dark:hover:bg-dark-alt text-sm">
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
          <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt" />
        </div>
      </div>
      
      {/* ── TOP HERO SECTION ── */}
      <div className="p-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-5">

          {/* ── LEFT: Images ── */}
          <div className="lg:w-[420px] flex-shrink-0 space-y-3">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-light-alt dark:bg-dark-alt">
              <img
                src={selectedImage}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>

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

            {/* Edit: Image URLs */}
            {isEditing && (
              <div className="space-y-3 rounded-xl border border-light-alt dark:border-dark-alt p-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                  <ImageIcon size={13} />
                  Media {errors.images && <span className="text-red-500 text-xs ml-2">{errors.images}</span>}
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
                    Gallery images <span className="text-gray-400">({editData?.images?.length || 0}/8)</span>
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

                  {editData?.images?.length < 8 ? (
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
                      Maximum 8 images reached
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Vehicle details ── */}
          <div className="flex-1 space-y-4">
            {/* Name + brand */}
            <div className="space-y-2">
              {isEditing ? (
                <>
                  <FieldInput
                    label="Vehicle name"
                    id="name"
                    value={editData?.name || ""}
                    onChange={set('name')}
                    placeholder="e.g. Tesla Model 3"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  <FieldInput
                    label="Brand"
                    id="brand"
                    value={editData?.brand || ""}
                    onChange={set('brand')}
                    placeholder="e.g. Tesla"
                    required
                  />
                  {errors.brand && <p className="text-red-500 text-xs">{errors.brand}</p>}
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold tracking-tight">{vehicle.name}</h1>
                  <p className="text-sm text-gray-500">{vehicle.brand}</p>
                </>
              )}

              {/* Year and details */}
              {isEditing ? (
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput label="Year" id="year" value={editData?.year || ""} onChange={set('year')} placeholder="e.g. 2023" />
                  <FieldSelect 
                    label="Category" 
                    id="category" 
                    value={editData?.category || ""} 
                    onChange={set('category')} 
                    options={categoryOptions}
                  />
                  <FieldSelect 
                    label="Condition" 
                    id="condition" 
                    value={editData?.condition || ""} 
                    onChange={set('condition')} 
                    options={conditionOptions}
                    required
                  />
                  {errors.condition && <p className="text-red-500 text-xs col-span-2">{errors.condition}</p>}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <span>{vehicle.year}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 inline-block" />
                  <span>{vehicle.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 inline-block" />
                  <span>{vehicle.condition}</span>
                </p>
              )}

              {/* Status + price */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {isEditing ? (
                  <div className='flex items-center gap-4 flex-wrap'>
                    <div className='space-y-1'>
                      <h4 className='text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide'>Status</h4>
                      <label className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-light-alt dark:border-dark-alt cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={editData?.listed || false}
                          onChange={(e) => setEditData({ ...editData, listed: e.target.checked })}
                          className="w-3.5 h-3.5 accent-blue-600"
                        />
                        Listed
                      </label>
                    </div>
                    <FieldInput label="Price" id="price" value={formatAmount(editData?.price || "")} onChange={set('price')} placeholder="Price" required />
                    {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
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
              </div>
            </div>

            {/* Quick spec cards */}
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-6 mb-2">Specifications</p>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput label="Doors" id="doors" value={editData?.doors || ""} onChange={set('doors')} placeholder="4" />
                  <FieldInput label="Seats" id="seats" value={editData?.seats || ""} onChange={set('seats')} placeholder="5" />
                  <FieldSelect label="Fuel type" id="fuelType" value={editData?.fuelType || ""} onChange={set('fuelType')} options={fuelTypeOptions} />
                  <FieldSelect label="Transmission" id="transmission" value={editData?.transmission || ""} onChange={set('transmission')} options={transmissionOptions} required />
                  <FieldSelect label="Vehicle type" id="vehicleType" value={editData?.vehicleType || ""} onChange={set('vehicleType')} options={vehicleTypeOptions} />
                  <FieldInput label="Horsepower" id="horsepower" value={editData?.horsepower || ""} onChange={set('horsepower')} placeholder="e.g. 300" type="number" />
                  <FieldInput label="Engine size" id="engineSize" value={editData?.engineSize || ""} onChange={set('engineSize')} placeholder="e.g. 2.0L" />
                  {editData?.condition === "Used" && (
                    <FieldInput label="Mileage" id="mileage" value={editData?.mileage || ""} onChange={set('mileage')} placeholder="e.g. 50000" type="number" />
                  )}
                  {errors.mileage && <p className="text-red-500 text-xs col-span-2">{errors.mileage}</p>}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: <CarProfileIcon size={20} />, label: 'Type', value: vehicle.vehicleType || 'Car' },
                    { icon: <SeatIcon size={20} />, label: 'Seats', value: vehicle.seats || 5 },
                    { icon: <GasPumpIcon size={20} />, label: 'Fuel', value: vehicle.fuelType || 'Electric' },
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
          </div>
        </div>
      </div>

      <div className="ticks">
        <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt" />
      </div>

      {/* ── DETAILS GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-0">

        {/* ── LEFT ── */}
        <div className="xl:col-span-2 xl:border-r border-light-alt dark:border-dark-alt">

          {/* Features */}
          <Section title="Car features">
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {featureOptions.map((feature, i) => (
                  <label key={i} className="flex items-center gap-2.5 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editData?.features?.includes(feature) || false}
                      onChange={() => handleFeatureToggle(feature)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    {feature}
                  </label>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(vehicle.features || []).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm">
                    <div className="w-5 h-5 rounded-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 flex-shrink-0 flex items-center justify-center">
                      <CheckIcon size={11} weight="bold" />
                    </div>
                    {feature}
                  </div>
                ))}
                {(!vehicle.features || vehicle.features.length === 0) && (
                  <p className="text-sm text-gray-500 col-span-full">No features listed</p>
                )}
              </div>
            )}
          </Section>

          <div className="ticks">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt" />
          </div>

          {/* Description */}
          <Section title="Description">
            {isEditing ? (
              <textarea
                value={editData?.description || ""}
                onChange={set('description')}
                placeholder="Write a short description of the vehicle…"
                rows={5}
                maxLength={2000}
                className="w-full border border-light-alt dark:border-dark-alt bg-transparent px-3 py-2 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {vehicle.description || 'No description provided yet.'}
              </p>
            )}
          </Section>


          

          <div className="ticks">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt" />
          </div>



          
          {/* Edit: Additional Fields */}
          {isEditing ? (
            <Section title="Additional Details" className="rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FieldSelect label="Warranty" id="warranty" value={editData?.warranty || ""} onChange={set('warranty')} options={warrantyOptions} />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editData?.accidentHistory || false}
                      onChange={(e) => setEditData({ ...editData, accidentHistory: e.target.checked })}
                      className="w-3.5 h-3.5 accent-blue-600"
                    />
                    Accident history
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editData?.serviceHistory || false}
                      onChange={(e) => setEditData({ ...editData, serviceHistory: e.target.checked })}
                      className="w-3.5 h-3.5 accent-blue-600"
                    />
                    Service history
                  </label>
                </div>
                <FieldSelect 
                  label="Exterior color" 
                  id="exteriorColor" 
                  value={editData?.exteriorColor || ""} 
                  onChange={set('exteriorColor')} 
                  options={colorOptions.map(c => ({ value: c, label: c }))}
                />
                <FieldSelect 
                  label="Interior color" 
                  id="interiorColor" 
                  value={editData?.interiorColor || ""} 
                  onChange={set('interiorColor')} 
                  options={colorOptions.map(c => ({ value: c, label: c }))}
                />
              </div>
            </Section>
          ): (
            // Show additional details in view mode
            <Section title="Additional Details" className="rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <InfoCard title="Warranty" value={vehicle.warranty || 'None'} />
                <InfoCard title="Accident History" value={vehicle.accidentHistory ? 'Yes' : 'No'} />
                <InfoCard title="Service History" value={vehicle.serviceHistory ? 'Yes' : 'No'} />
                <InfoCard title="Exterior Color" value={vehicle.exteriorColor || 'Not specified'} />
                <InfoCard title="Interior Color" value={vehicle.interiorColor || 'Not specified'} />
              </div>
            </Section>
          )}



          <div className="ticks">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt" />
          </div>

          {/* Engine & Performance */}
          <Section title="Engine & Performance">
            <div className="grid grid-cols-2 gap-3">
              <InfoCard title="Engine size" value={vehicle.engineSize || 'Not specified'} />
              <InfoCard title="Horsepower" value={vehicle.horsepower ? `${vehicle.horsepower} HP` : 'Not specified'} />
              <InfoCard title="Mileage" value={vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'Not specified'} />
              <InfoCard title="Warranty" value={vehicle.warranty || 'None'} />
            </div>
          </Section>
        </div>

        <div className="xl:hidden ticks">
          <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt" />
        </div>

        {/* ── RIGHT ── */}
        <div className="">
          {/* Pricing */}
          <Section title="Pricing Information">
            <PriceRow label="Current price" value={formatAmount(vehicle.price)} />
            {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
              <PriceRow label="Original price" value={formatAmount(vehicle.originalPrice)} />
            )}
            <PriceRow label="Listed" value={vehicle.listed ? "Yes" : "No"} />
            <PriceRow label="Verified" value={vehicle.verified ? "✓ Verified" : "Not verified"} />
            <PriceRow label="Featured" value={vehicle.featured ? "★ Featured" : "Standard"} />
          </Section>

          <div className="ticks">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt" />
          </div>

          {/* Statistics */}
          <Section title="Statistics">
            <PriceRow label="Views" value={vehicle.viewCount || 0} />
            <PriceRow label="Inquiries" value={vehicle.inquiryCount || 0} />
            <PriceRow label="Rating" value={vehicle.ratings > 0 ? `${vehicle.ratings} ★` : 'No ratings yet'} />
            <PriceRow label="Created" value={new Date(vehicle.createdAt).toLocaleDateString()} />
            <PriceRow label="Last updated" value={new Date(vehicle.updatedAt).toLocaleDateString()} />
          </Section>

          <div className="ticks">
            <hr className="w-full h-px my-0 border-0 bg-light-alt dark:bg-dark-alt" />
          </div>

          {/* Delete Vehicle */}
          <Section title="Danger Zone">
            <button 
              onClick={() => setShowConfirm(true)} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Delete vehicle
            </button>
            <p className="text-xs text-gray-500 mt-2">This action cannot be undone.</p>

            {showConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-light dark:bg-dark p-6 rounded-xl shadow-xl flex flex-col items-center gap-4 max-w-sm mx-4">
                  <WarningIcon size={32} className="text-red-500" />
                  <p className="text-center">Are you sure you want to delete this vehicle?</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      {loading ? "Deleting..." : "Yes, Delete"}
                    </button>
                    <button onClick={() => setShowConfirm(false)} className="border border-light-alt dark:border-dark-alt bg-light dark:bg-dark hover:bg-light/80 dark:hover:bg-dark/80 px-4 py-2 rounded-lg text-sm transition-colors">
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