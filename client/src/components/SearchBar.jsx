import { Search } from 'lucide-react';
import React from 'react'

const SearchBar = () => {
  return (
    <form className='w-full md:max-w-md relative flex-1'>
      <input 
        type="search"
        placeholder='Search..'
        className='w-full bg-transparent dark:bg-transparent rounded-md px-3.5 py-1.25 pr-6.5 placeholder:text-gray-700 dark:placeholder:text-light/30 ring ring-light-alt dark:ring-dark-alt focus:ring-gray-400 focus:dark:ring-gray-700 focus:outline-none duration-300 transition-all'
      />
      <button type='submit' className='bg-light-alt dark:bg-dark-alt px-3 w-fit h-full absolute top-1/2 right-0 -translate-y-1/2 rounded-r-md flex items-center justify-center duration-300 transition-all' title='Search'>
          <Search size={18} strokeWidth={1.5} className='' />
      </button>
    </form>
  )
}

export default SearchBar;