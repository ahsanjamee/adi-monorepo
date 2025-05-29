import React from 'react';

const Sidebanner = () => {
    return (
    <div className="w-full group">
       
    <div
      style={{
        paddingTop:'250px',
        backgroundImage: 'url("/logo/sidebann1.png")', // Path relative to public folder
        backgroundSize: 'cover', // Ensures the image covers the entire div
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents image from repeating
        height: '313px', // Give the div a defined height to see the background
        width: '515px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontSize: '1.5em',
        fontWeight: 'bold',
        textShadow: '1px 1px 4px hsl(0, 33.30%, 98.80%)',
        border: '2px solid #555'
      }}
    >
      
       <button
      className="
        bg-gradient-to-r from-green-500 to-green-900  /* Gradient background */
        text-white                                /* White text color */
        font-semibold                             /* Semi-bold font weight */
        py-1.5                                      /* Vertical padding */
        px-5                                      /* Horizontal padding */
        rounded-full                          /* Fully rounded corners (pill shape) */
        shadow-lg                                 /* Large shadow */
        hover:from-blue-600 hover:to-indigo-700   /* Darker gradient on hover */
        hover:shadow-xl                           /* Larger shadow on hover */
        transform hover:scale-105                 /* Slightly scale up on hover */
        transition-all duration-300 ease-in-out   /* Smooth transition for all changes */
        focus:outline-none                        /* Remove default focus outline */
        focus:ring-4                              /* Add a focus ring */
        focus:ring-blue-300                       /* Blue focus ring color */
        focus:ring-opacity-75                     /* Semi-transparent focus ring */
        active:scale-95                           /* Slightly shrink on active (click down) */
        cursor-pointer                            /* Indicate it's clickable */
        text-lg                                   /* Larger text size */
        w-full md:w-auto                          /* Full width on small screens, auto on medium+ */
      "
    >
     <a href="/search?category=treatment-consultancy&_id=632ab14a4d87ff2494210a29">Livestock & Agriculture Care</a>
    </button>
    </div>    
    </div>
  );
};

export default Sidebanner;
