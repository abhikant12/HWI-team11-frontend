import React from 'react';
import GraphComponent from './Graph';
import MAPS from './MAPS';
import Navbar from './Navbar';


function MapFun() {
  return (
    <div className='flex flex-col h-screen'>
      
      <Navbar/>

      {/* Main Content */}
      <div className='flex flex-col md:flex-row justify-center items-center flex-1 p-4 space-x-3'>
       
        {/* Form Card */}
        <div className='flex flex-col space-y-4 bg-white shadow-lg rounded-lg p-6 mb-4 md:mb-0 md:mr-4 w-full md:w-1/3'>
           
            <div className='flex flex-col'>
              <label htmlFor='source' className='text-lg font-medium'> City </label>
              <input type='text' id='source' className='border border-gray-300 p-2 rounded-md' />
            </div>
          
            <div>
                <button className='bg-green-800 hover:bg-green-700 text-white p-3 rounded-md font-bold w-full transition duration-200 ease-in-out transform hover:scale-105'>
                    Get Route
                </button>         
            </div>
            
            <div>
               <GraphComponent />
            </div>
         
        </div>

        {/* Map Area */}
        <div className=''>
            <MAPS />
        </div>
      </div>
    </div>
  );
}

export default MapFun;
