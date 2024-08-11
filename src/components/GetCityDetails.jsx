import React from 'react';
import { useNavigate } from 'react-router-dom';
import GraphComponent from './Graph';
import MAPS from './MAPS';
import Navbar from './Navbar';

function GetCityDetail() {

  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/chat');
  };

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />

      {/* Main Content */}
      <div className='flex flex-col md:flex-row justify-center items-center flex-1 p-4 space-x-3'>
       
        {/* Form Card */}
        <div className='flex flex-col space-y-4 bg-white shadow-lg rounded-lg p-6 mb-4 md:mb-0 md:mr-4 w-full md:w-1/3'>
           
          <div className='flex flex-col'>
            <label htmlFor='source' className='text-lg font-medium'>City</label>
            <input type='text' id='source' className='border border-gray-300 p-2 rounded-md' />
          </div>
          
          <div>
            <button className='bg-green-800 hover:bg-green-700 text-white p-3 rounded-md font-bold w-full transition duration-200 ease-in-out transform hover:scale-105'>
              Get Details
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

      {/* Chat Icon with Tooltip */}
      <div className='relative'>
        <div 
          className='fixed flex justify-center items-center bottom-11 right-11 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg cursor-pointer transition duration-200 ease-in-out transform hover:scale-110'
          onClick={handleChatClick}
          onMouseEnter={() => document.getElementById('tooltip').style.opacity = 1}
          onMouseLeave={() => document.getElementById('tooltip').style.opacity = 0}
        > 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-8 h-8 -mt-1"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7l-4 4V10a2 2 0 012-2h2m10 0a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        </div>
        <div 
          id='tooltip' 
          className='absolute bottom-[109px] right-1 bg-gray-800 text-white text-sm rounded-lg py-2 px-4 opacity-0 transition-opacity duration-200 ease-in-out'
        >
          Weather AI Assistance
          <div className='absolute top-full right-[60px] transform translate-y-[0px]'>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L8 8L16 0H0Z" fill="#1f2937"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetCityDetail;
