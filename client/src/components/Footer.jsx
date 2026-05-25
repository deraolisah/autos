import React from 'react';
import { XLogoIcon } from '@phosphor-icons/react';

const Footer = ({ isHome }) => {
  return (
    <footer className={`container flex-col items-start justify-between gap-2 py-10 p-4 border-t border-light-alt dark:border-dark-alt  ${isHome ? "hidden" : "flex"}`}>

      <div className='flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-200'>
        Footer
        <XLogoIcon size={20} color="#b2e10e" weight="thin" />
      </div>

      <div>
        <p className='text-sm text-gray-500 dark:text-gray-400'>© 2024 Autos Exclusive. All rights reserved.</p>
        <p className='text-sm text-gray-500 dark:text-gray-400'>Designed and developed by Nathan.</p>
      </div>
    </footer>
  )
}

export default Footer;