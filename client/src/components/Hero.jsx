import React from 'react'
import { Link } from 'react-router-dom';
import heroBg from "../assets/heroBg.png";



const Hero = () => {
  const hero = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  // const hero = heroBg;

  return (
    <section className='container mx-auto p-0! -mt-14'>
      <div className='aspect-3/2 md:aspect-2/1 w-full h-screen md:h-full flex flex-col gap-0.5 md:gap-2 items-center justify-center px-4 py-6 md:py-26 relative overflow-hidden' style={{
          backgroundImage: `url(${hero})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
      }}>
        <div className='absolute inset-0 w-full h-full bg-linear-to-t from-transparent to-white/90 dark:to-black z-0'></div>
        <p className='uppercase z-2'> Explore Our Luxury </p>
        <h1 className='text-3xl md:text-5xl font-bold uppercase z-2 mb-1'> Car Collection </h1>
        <Link to="/listings" className='text-xs sm:text-base  bg-primary px-4 py-2 rounded-md w-fit z-2'> Get Started </Link>
      </div>
    </section>
  )
}

export default Hero;