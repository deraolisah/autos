import React, { useState } from 'react'
import VehicleGrid from '../components/VehicleGrid';
import SearchBar from '../components/SearchBar';
import { ChevronDown, Filter, SlidersHorizontal } from 'lucide-react';
import { useVehicle } from '../contexts/vehicleContext';

/* ─── Filter group accordion ─────────────────────────────────────── */
const FilterGroup = ({ label, name, options }) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(options[0]?.value ?? '');

  return (
    <div className="filter-group">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="filter-group-btn"
        aria-expanded={open}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <div className="filter-options">
          {options.map(opt => (
            <label key={opt.value} className="filter-label">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => setSelected(opt.value)}
                className="filter-radio"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}

      <hr className="filter-divider" />
    </div>
  );
};

/* ─── Active filter tag ───────────────────────────────────────────── */
const FilterTag = ({ label, onRemove }) => (
  <span className="filter-tag">
    {label}
    <button onClick={onRemove} aria-label={`Remove ${label} filter`} className="filter-tag-remove">
      <X size={11} strokeWidth={2} />
    </button>
  </span>
);


const Listings1 = () => {
    const { vehicles } = useVehicle();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTags, setActiveTags] = useState(['SUVs', '$15k – $30k', 'New']);
    
    const removeTag = tag => setActiveTags(prev => prev.filter(t => t !== tag));
    
    const filterGroups = [
        {
          label: 'Vehicle Type',
          name: 'type',
          options: [
            { value: 'trucks', label: 'Trucks' },
            { value: 'cars', label: 'Cars' },
            { value: 'suvs', label: 'SUVs' },
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
            { value: 'new', label: 'New' },
            { value: 'used', label: 'Used' },
            { value: 'cpo', label: 'Certified Pre-Owned' },
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
        <section className='container px-0! flex h-full relative'>
            <aside className={`w-full max-w-55 min-w-55 h-screen md:h-full bg-light dark:bg-dark border-r border-light-alt dark:border-dark-alt flex flex-col overflow-y-auto py-0 pb-20 duration-300 transition-all fixed top-0 md:relative z-100 md:z-50 ${sidebarOpen ? '' : '-translate-x-55 md:translate-x-0'}`}>
                <div className="flex items-center gap-2 py-4 px-3 border-b border-light-alt dark:border-dark-alt duration-300 transition-all mb-4 sidebar-header">
                    <SlidersHorizontal size={13} strokeWidth={1.5} />
                    <span className="text-sm font-medium tracking-[0.08em] uppercase sidebar-header-text">Filters</span>
                </div>
    
                {filterGroups.map(group => (
                    <FilterGroup key={group.name} {...group} />
                ))}
            </aside>

            {/* <aside className={`w-full md:max-w-1/5 max-w-68 h-screen md:min-h-auto pb-24! p-4 px-4 bg-light dark:bg-dark border-r border-gray-300 dark:border-dark-alt relative top-0 md:top-0 z-100 flex flex-col overflow-y-auto duration-300 transition-all ${sidebarOpen ? "translate-x-0" : "-translate-x-68 md:translate-x-0"}`}>
                <div className='w-full h-full flex flex-col gap-4'>
                    <h4 className="flex items-center gap-1.5"> 
                        <SlidersHorizontal size={14} strokeWidth={1.5} /> 
                        <span> Filters </span>
                    </h4>

                    <div className='flex flex-col gap-1'>
                        <button className='w-full flex items-center justify-between bg-light-alt dark:bg-dark-alt gap-2 p-2 px-3 rounded-md cursor-pointer duration-300 transition-all'> 
                            <span className='text-xs text-nowrap'> Vehicle Type </span>
                            <ChevronDown size={16} />
                        </button>
                        
                        <ul className='mx-1 text-xs'>
                            <label htmlFor='typeInput1' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                Trucks 
                                <input id='typeInput1' type='radio' />
                            </label>
                            <label htmlFor='typeInput2' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                Cars 
                                <input id='typeInput2' type='radio' />
                            </label>
                            <label htmlFor='typeInput3' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                SUVs 
                                <input id='typeInput3' type='radio' />
                            </label>
                            <label htmlFor='typeInput4' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                Pick-ups 
                                <input id='typeInput4' type='radio' />
                            </label>
                        </ul>

                        <hr className='my-2 h-px border-0 bg-light-alt dark:bg-dark-alt duration-300 trnasition-all' />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <button className='w-full flex items-center justify-between bg-light-alt dark:bg-dark-alt gap-2 p-2 px-3 rounded-md cursor-pointer duration-300 transition-all'> 
                            <span className='text-xs text-nowrap'> Price </span>
                            <ChevronDown size={16} />
                        </button>
                        
                        <ul className='mx-1 text-xs'>
                            <label htmlFor='typeInput1' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                Trucks 
                                <input id='typeInput1' type='radio' />
                            </label>
                            <label htmlFor='typeInput2' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                Cars 
                                <input id='typeInput2' type='radio' />
                            </label>
                            <label htmlFor='typeInput3' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                SUVs 
                                <input id='typeInput3' type='radio' />
                            </label>
                            <label htmlFor='typeInput4' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                Pick-ups 
                                <input id='typeInput4' type='radio' />
                            </label>
                        </ul>

                        <hr className='my-2 h-px border-0 bg-light-alt dark:bg-dark-alt duration-300 transition-all' />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <button className='w-full flex items-center justify-between bg-light-alt dark:bg-dark-alt gap-2 p-2 px-3 rounded-md cursor-pointer duration-300 transition-all'> 
                            <span className='text-xs text-nowrap'> Vehicle Type </span>
                            <ChevronDown size={16} />
                        </button>
                        
                        <ul className='mx-1 text-xs'>
                            <label htmlFor='typeInput1' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                New 
                                <input id='typeInput1' type='radio' />
                            </label>
                            <label htmlFor='typeInput2' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                Used 
                                <input id='typeInput2' type='radio' />
                            </label>
                            <label htmlFor='typeInput3' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                SUVs 
                                <input id='typeInput3' type='radio' />
                            </label>
                            <label htmlFor='typeInput4' className='w-full flex items-center justify-between hover:bg-light-alt hover:dark:bg-dark-alt rounded px-2 p-1.5'>
                                Pick-ups 
                                <input id='typeInput4' type='radio' />
                            </label>
                        </ul>

                        {/* <hr className='my-2 h-px border-0 bg-light-alt dark:bg-dark-alt duration-300 transition-all' /> 
                    </div>


                </div>
            </aside> */}

            <main className='w-full md:max-w-4/5 h-full p-4 flex-1 -ml-68 md:ml-0'>
                <h2 className='font-bold md:text-lg'> Vehicles Found ({vehicles.length}) </h2>
                <div className='w-full flex items-center justify-between gap-2 mt-3'>
                    <button className='flex items-center md:hidden text-sm bg-light-alt dark:bg-dark-alt p-2.5 py-3 rounded-md gap-1.5' onClick={()=> {setSidebarOpen(prev => !prev)}} title='Filter'> 
                        <Filter size={14} strokeWidth={1.5} />
                        {/* <span> Filters </span> */}
                        <ChevronDown size={14} strokeWidth={1.5} />
                    </button>
                    <SearchBar />
                    <select className='text-xs bg-light-alt dark:bg-dark-alt border border-light-alt dark:border-dark-alt py-2.5 px-1.5 rounded-md focus:outline-none duration-300 transition-all' title='Sort'>
                        <option value={"Sort"}> Sort By </option>
                        <option value={"Sort"}> Date </option>
                        <option value={"Sort"}> Alphabet </option>
                    </select>
                </div>
                <VehicleGrid />
            </main>
            
            {sidebarOpen && (<div onClick={() => {setSidebarOpen(false)}} className='fixed top-0 left-0 z-10 bg-black/60 w-full h-full flex md:hidden cursor-pointer'/>)}
        </section>
    )
}

export default Listings1;