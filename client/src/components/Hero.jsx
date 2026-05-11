import React from 'react'

const Hero = () => {
  return (
    <section className='container mx-auto p-0! -mt-14'>
        <div className='aspect-3/2 md:aspect-2/1 w-full flex items-center justify-center' style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            {/* <h1 className='text-3xl font-bold'> Hello World </h1> */}
        </div>
    </section>
  )
}

export default Hero;