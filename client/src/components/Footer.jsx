import React from 'react'

const Footer = ({ isHome }) => {
  return (
    <footer className={`container py-12 p-4 border-t border-light-alt dark:border-dark-alt duration-300 transition-all ${isHome ? "hidden" : "flex"}`}>
      Footer
    </footer>
  )
}

export default Footer;