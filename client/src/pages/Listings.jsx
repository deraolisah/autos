// Listings.jsx - Main Component with Full Functionality
import React, { useState, useEffect, useMemo } from 'react';
import VehicleGrid from '../components/VehicleGrid';
import SearchBar from '../components/SearchBar';
import { ChevronDown, ChevronLeft, ChevronRight, Filter, RefreshCcw, SlidersHorizontal, X } from 'lucide-react';
import { useVehicle } from '../contexts/vehicleContext';

/* ─── Filter Group Component ───────────────────────────────────── */
const FilterGroup = ({ label, name, options, selectedValues, onChange }) => {
  const [open, setOpen] = useState(true);

  const handleChange = (value) => {
    const currentSelected = selectedValues[name] || [];
    let newSelected;
    
    if (currentSelected.includes(value)) {
      newSelected = currentSelected.filter(v => v !== value);
    } else {
      newSelected = [...currentSelected, value];
    }
    
    onChange(name, newSelected);
  };

  const isSelected = (value) => {
    return (selectedValues[name] || []).includes(value);
  };

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
                type="checkbox"
                name={name}
                value={opt.value}
                checked={isSelected(opt.value)}
                onChange={() => handleChange(opt.value)}
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


/* ─── Filter Tag Component ─────────────────────────────────────── */
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

/* ─── Custom Hook for Responsive Items Per Page ────────────────── */
const useResponsiveItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 8 : 9);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  return itemsPerPage;
};

/* ─── Main Listings Component ──────────────────────────────────── */
const Listings = () => {
  const { vehicles } = useVehicle();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    price: [],
    condition: [],
    fuel: []
  });
  
  const itemsPerPage = useResponsiveItemsPerPage();

  // Reset to first page when filters, search, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters, searchQuery, sortBy]);

  // Filter options mapping
  const filterOptions = {
    type: {
      label: 'Vehicle Type',
      options: [
        { value: 'cars', label: 'Cars', filterKey: 'type' },
        { value: 'suvs', label: 'SUVs', filterKey: 'type' },
        { value: 'trucks', label: 'Trucks', filterKey: 'type' },
        { value: 'pickups', label: 'Pick-ups', filterKey: 'type' },
      ]
    },
    price: {
      label: 'Price Range',
      options: [
        { value: 'under15', label: 'Under $15k', min: 0, max: 15000 },
        { value: '15to30', label: '$15k – $30k', min: 15000, max: 30000 },
        { value: '30to60', label: '$30k – $60k', min: 30000, max: 60000 },
        { value: 'above60', label: 'Above $60k', min: 60000, max: Infinity },
      ]
    },
    condition: {
      label: 'Condition',
      options: [
        { value: 'cpo', label: 'Certified Pre-Owned', filterKey: 'condition' },
        { value: 'new', label: 'New', filterKey: 'condition' },
        { value: 'used', label: 'Used', filterKey: 'condition' },
      ]
    },
    fuel: {
      label: 'Fuel Type',
      options: [
        { value: 'electric', label: 'Electric', filterKey: 'fuelType' },
        { value: 'petrol', label: 'Petrol', filterKey: 'fuelType' },
        { value: 'diesel', label: 'Diesel', filterKey: 'fuelType' },
        { value: 'hybrid', label: 'Hybrid', filterKey: 'fuelType' },
      ]
    }
  };

  // Helper function to get vehicle price (assuming vehicle has price field)
  const getVehiclePrice = (vehicle) => {
    return vehicle.price || vehicle.amount || 0;
  };

  // Filter vehicles based on selected filters
  const filteredVehicles = useMemo(() => {
    let filtered = [...vehicles];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(vehicle => 
        vehicle.name?.toLowerCase().includes(query) ||
        vehicle.make?.toLowerCase().includes(query) ||
        vehicle.model?.toLowerCase().includes(query) ||
        vehicle.year?.toString().includes(query)
      );
    }

    // Apply type filter
    if (selectedFilters.type.length > 0) {
      filtered = filtered.filter(vehicle => 
        selectedFilters.type.includes(vehicle.type?.toLowerCase())
      );
    }

    // Apply price filter
    if (selectedFilters.price.length > 0) {
      filtered = filtered.filter(vehicle => {
        const price = getVehiclePrice(vehicle);
        return selectedFilters.price.some(range => {
          const priceRange = filterOptions.price.options.find(opt => opt.value === range);
          return priceRange && price >= priceRange.min && price <= priceRange.max;
        });
      });
    }

    // Apply condition filter
    if (selectedFilters.condition.length > 0) {
      filtered = filtered.filter(vehicle => 
        selectedFilters.condition.includes(vehicle.condition?.toLowerCase())
      );
    }

    // Apply fuel type filter
    if (selectedFilters.fuel.length > 0) {
      filtered = filtered.filter(vehicle => 
        selectedFilters.fuel.includes(vehicle.fuelType?.toLowerCase())
      );
    }

    return filtered;
  }, [vehicles, searchQuery, selectedFilters]);

  // Sort vehicles
  const sortedAndFilteredVehicles = useMemo(() => {
    const sorted = [...filteredVehicles];
    
    switch(sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => getVehiclePrice(a) - getVehiclePrice(b));
        break;
      case 'price-desc':
        sorted.sort((a, b) => getVehiclePrice(b) - getVehiclePrice(a));
        break;
      case 'alpha':
        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'date':
        sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        // Default sort by date or id
        sorted.sort((a, b) => (b._id || '').localeCompare(a._id || ''));
    }
    
    return sorted;
  }, [filteredVehicles, sortBy]);

  // Generate active filter tags
  const activeFilterTags = useMemo(() => {
    const tags = [];
    
    Object.entries(selectedFilters).forEach(([category, values]) => {
      values.forEach(value => {
        const option = filterOptions[category].options.find(opt => opt.value === value);
        if (option) {
          tags.push({
            category,
            value,
            label: option.label
          });
        }
      });
    });
    
    return tags;
  }, [selectedFilters]);

  // Handle filter changes
  const handleFilterChange = (filterName, selectedValues) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: selectedValues
    }));
  };

  // Remove a single filter tag
  const removeFilterTag = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(v => v !== value)
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      type: [],
      price: [],
      condition: [],
      fuel: []
    });
    setSearchQuery('');
    setSortBy('');
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const totalItems = sortedAndFilteredVehicles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVehicles = sortedAndFilteredVehicles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="container p-0! flex items-start gap-px h-full relative">
      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed md:relative top-14 md:top-0! left-0 z-50 md:z-auto
          w-60 min-w-60 h-full md:min-h-screen
          bg-light dark:bg-dark
          pb-14!
          border-r border-light-alt dark:border-dark-alt
          flex flex-col overflow-y-auto
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between gap-2 py-4 px-3 border-b border-light-alt dark:border-dark-alt duration-300 transition-all mb-4">
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest">
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Filters
          </span>

          <button 
            onClick={clearAllFilters}
            className="hover:underline text-xs cursor-pointer hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        </div>

        <FilterGroup 
          label="Vehicle Type"
          name="type"
          options={filterOptions.type.options}
          selectedValues={selectedFilters}
          onChange={handleFilterChange}
        />

        <FilterGroup 
          label="Price Range"
          name="price"
          options={filterOptions.price.options}
          selectedValues={selectedFilters}
          onChange={handleFilterChange}
        />

        <FilterGroup 
          label="Condition"
          name="condition"
          options={filterOptions.condition.options}
          selectedValues={selectedFilters}
          onChange={handleFilterChange}
        />

        <FilterGroup 
          label="Fuel Type"
          name="fuel"
          options={filterOptions.fuel.options}
          selectedValues={selectedFilters}
          onChange={handleFilterChange}
        />
      </aside>

      {/* ── Main Content ── */}
      <main className="min-w-0 w-full h-full p-4 pb-0 flex-1">
        {/* Topbar */}
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-3 mb-3 flex-wrap">
          <div className='w-full md:w-fit flex items-start justify-between gap-2'>
            <div className="flex items-baseline gap-1.5">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Vehicles</h2>
              <span className="text-sm text-gray-400">
                ({totalItems} {totalItems === 1 ? 'result' : 'results'})
              </span>
            </div>

            {/* Mobile filter button */}
            <button 
              className='flex items-center md:hidden text-xs bg-light dark:bg-light-alt/5 ring ring-light-alt dark:border-dark-alt p-2.5 rounded-md gap-1.5 hover:bg-light-alt hover:dark:bg-dark-alt duration-300 transition-all' 
              onClick={() => setSidebarOpen(prev => !prev)} 
              title='Filters' 
              aria-label="Open filters"
            > 
              <Filter size={14} strokeWidth={1.5} />
            </button>            
          </div>

          <div className="w-full md:w-fit flex items-center gap-2 flex-1 md:justify-end">
            {/* Search */}
            <SearchBar 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
            />

            {/* <SearchBar 
              value={searchQuery}
              onChange={handleSearchChange}
              onClear={() => setSearchQuery('')}
            /> */}

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 bg-light-alt/5 dark:bg-light-alt/5 border border-light-alt dark:border-dark-alt rounded-md px-2.5 text-xs text-gray-500 dark:text-gray-400 outline-none cursor-pointer hover:bg-light-alt dark:hover:bg-dark-alt duration-300 transition-all"
              title="Sort"
            >
              {/* <option value="">Sort by</option> */}
              <option value="date">Date listed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="alpha">Alphabetical</option>
            </select>            
          </div>
        </div>

        {/* Active filter tags */}
        {activeFilterTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-4 min-h-6.5">
            {activeFilterTags.map(tag => (
              <FilterTag 
                key={`${tag.category}-${tag.value}`} 
                label={tag.label} 
                onRemove={() => removeFilterTag(tag.category, tag.value)} 
              />
            ))}
            {activeFilterTags.length > 1 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-gray-500 hover:text-red-500 underline ml-2"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* No results message */}
        {totalItems === 0 && (
          <div className="flex flex-col items-center gap-2 justify-center py-12 text-center">
            <div className="text-gray-400">No vehicles found</div>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-500 hover:underline"
            >
              Clear all filters
            </button>

            <button className='flex items-center gap-1 p-4 py-1.5 rounded-full bg-light-alt/60 dark:bg-dark-alt/60 hover:bg-light-alt dark:hover:bg-dark-alt' onClick={()=> {window.reload()}}>
              <RefreshCcw size={14} />
              Refresh
            </button>
          </div>
        )}

        {/* Vehicle grid with pagination */}
        {totalItems > 0 && (
          <div className="flex-1">
            <VehicleGrid 
              vehicles={paginatedVehicles}
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              loading={false}
            />
          </div>
        )}
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className='fixed top-0 left-0 z-10 bg-black/60 w-full h-full flex md:hidden cursor-pointer'
        />
      )}
    </section>
  );
};

export default Listings;