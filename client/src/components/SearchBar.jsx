// SearchBar.jsx
import { Search, X } from 'lucide-react';
import React, { useState } from 'react';

const SearchBar = ({ value = '', onChange, onClear, placeholder = 'Search..' }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onChange) {
      onChange({ target: { value: localValue } });
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    // Optional: Real-time search (uncomment for live search)
    if (onChange) {
      onChange(e);
    }
  };

  const handleClear = () => {
    setLocalValue('');
    if (onChange) {
      onChange({ target: { value: '' } });
    }
    if (onClear) {
      onClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full md:max-w-md relative flex-1'>
      <input 
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className='w-full bg-transparent dark:bg-transparent rounded-md px-3.5 py-1.25 pr-12 placeholder:text-gray-700 dark:placeholder:text-light/30 ring ring-light-alt dark:ring-dark-alt focus:ring-gray-400 focus:dark:ring-gray-700 focus:outline-none '
      />
      
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className='absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 '
          title='Clear search'
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      )}
      
      <button 
        type='submit' 
        className='bg-light-alt/60 dark:bg-dark-alt/60 px-3 w-fit h-full absolute top-1/2 right-0 -translate-y-1/2 rounded-r-md flex items-center justify-center  hover:bg-light-alt dark:hover:bg-dark-alt'
        title='Search'
      >
        <Search size={18} strokeWidth={1.5} />
      </button>
    </form>
  );
};

export default SearchBar;