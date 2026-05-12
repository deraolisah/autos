import React, { useState } from 'react';
import VehicleGrid from '../components/VehicleGrid';
import SearchBar from '../components/SearchBar';
import { ChevronDown, Filter, SlidersHorizontal, X } from 'lucide-react';
import { useVehicle } from '../contexts/vehicleContext';

/* ─── Filter Group ───────────────────────────────────────────────── */
const FilterGroup = ({ label, name, options }) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(options[1]?.value ?? '');

  return (
    <div className="py-0">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium hover:bg-light-alt dark:hover:bg-dark-alt cursor-pointer duration-300 transition-all"
        aria-expanded={open}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="flex flex-col gap-0.5 px-2.5 pb-2 pt-1">
          {options.map(opt => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:bg-light-alt dark:hover:bg-dark-alt hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors duration-150"
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => setSelected(opt.value)}
                className="appearance-none w-3.5 h-3.5 bg-light dark:bg-dark rounded-full border-[1.5px] border-light-alt dark:border-dark-alt checked:border-blue-500 checked:bg-yellow-500 relative shrink-0 cursor-pointer duration-300 transition-all"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}

      <hr className="mx-4 my-1 border-0 h-px bg-light-alt dark:bg-dark-alt duration-300 transition-all" />
    </div>
  );
};

/* ─── Filter Tag ─────────────────────────────────────────────────── */
const FilterTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 bg-yellow-400 dark:bg-yellow-500 text-dark text-xs font-medium pl-2.5 p-1 rounded-full">
    {label}
    <button
      onClick={onRemove}
      aria-label={`Remove ${label} filter`}
      className="flex items-center bg-yellow-600 hover:bg-yellow-200 p-1 rounded-full cursor-pointer duration-300 transition-all"
    >
      <X size={12} strokeWidth={2} />
    </button>
  </span>
);

/* ─── Listings Page ──────────────────────────────────────────────── */
const Listings = () => {
  const { vehicles } = useVehicle();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTags, setActiveTags] = useState([ 'SUVs', '$15k – $30k', 'New' ]);

  const removeTag = tag => setActiveTags(prev => prev.filter(t => t !== tag));

  const filterGroups = [
    {
      label: 'Vehicle Type',
      name: 'type',
      options: [
        { value: 'cars', label: 'Cars' },
        { value: 'suvs', label: 'SUVs' },
        { value: 'trucks', label: 'Trucks' },
        { value: 'pickups', label: 'Pick-ups' },
      ],
    },
    {
      label: 'Price Range',
      name: 'price',
      options: [
        { value: 'under15', label: 'Under $15k' },
        { value: '15to30', label: '$15k – $30k' },
        { value: '30to60', label: '$30k – $60k' },
        { value: 'above60', label: 'Above $60k' },
      ],
    },
    {
      label: 'Condition',
      name: 'condition',
      options: [
        { value: 'cpo', label: 'Certified Pre-Owned' },
        { value: 'new', label: 'New' },
        { value: 'used', label: 'Used' },
      ],
    },
    {
      label: 'Fuel Type',
      name: 'fuel',
      options: [
        { value: 'electric', label: 'Electric' },
        { value: 'petrol', label: 'Petrol' },
        { value: 'diesel', label: 'Diesel' },
        { value: 'hybrid', label: 'Hybrid' },
      ],
    },
  ];

  return (
    <section className="container p-0! flex h-full relative">
      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed md:relative top-14 md:top-0 left-0 z-50 md:z-auto
          w-60 min-w-60 h-full
          bg-light dark:bg-dark
          border-r border-light-alt dark:border-dark-alt
          pb-14!
          flex flex-col overflow-y-auto
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between gap-2 py-4 px-3 border-b border-light-alt dark:border-dark-alt duration-300 transition-all mb-4">
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest">
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Filters
          </span>

          <span className='hover:underline text-xs cursor-pointer hover:text-red-500'> x clear </span>
        </div>

        {filterGroups.map(group => (
          <FilterGroup key={group.name} {...group} />
        ))}
      </aside>


      {/* ── Main ── */}
      <main className="min-w-0  w-full h-full p-4 flex-1">

        {/* Topbar */}
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-3 mb-3 flex-wrap">
          <div className='w-full md:w-fit flex items-start justify-between gap-2'>
            <div className="flex items-baseline gap-1.5">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Vehicles</h2>
              <span className="text-sm text-gray-400">({vehicles.length} found)</span>
            </div>

            {/* Mobile filter button */}
            <button className='flex items-center md:hidden text-xs bg-light dark:bg-light-alt/5 ring ring-light-alt dark:ring-dark-alt p-2.5 rounded-md gap-1.5 hover:bg-light-alt hover:dark:bg-dark-alt duration-300 transition-all' onClick={()=> {setSidebarOpen(prev => !prev)}} title='Filters' aria-label="Open filters"> 
                <Filter size={14} strokeWidth={1.5} />
                {/* <span> Filters </span> */}
                {/* <ChevronDown size={14} strokeWidth={1.5} /> */}
            </button>            
          </div>

          <div className="w-full md:w-fit flex items-center gap-2 flex-1 md:justify-end">
            {/* Search */}
            <SearchBar />

            {/* Sort */}
            <select
              className="h-9 bg-light-alt/5 dark:bg-light-alt/5 border border-light-alt dark:border-dark-alt rounded-md px-2.5 text-xs text-gray-500 dark:text-gray-400 outline-none cursor-pointer hover:bg-light-alt dark:hover:bg-dark-alt duration-300 transition-all"
              title="Sort"
              >
              <option value="">Sort by</option>
              <option value="date">Date listed</option>
              <option value="price-asc">Price: Low-High</option>
              <option value="price-desc">Price: High-Low</option>
              <option value="alpha">Alphabetical</option>
            </select>            
          </div>
        </div>

        {/* Active filter tags */}
        {activeTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-4 min-h-6.5">
            {activeTags.map(tag => (
              <FilterTag key={tag} label={tag} onRemove={() => removeTag(tag)} />
            ))}
          </div>
        )}

        {/* Vehicle grid — scrollable */}
        <div className="flex-1">
          <VehicleGrid />
        </div>
      </main>

      {sidebarOpen && (<div onClick={() => {setSidebarOpen(false)}} className='fixed top-0 left-0 z-10 bg-black/60 w-full h-full flex md:hidden cursor-pointer'/>)}
    </section>
  );
};

export default Listings;