import React, { useState, useEffect } from 'react';
import './Navbar.css'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    setIsModalOpen(true);
    setIsExiting(false);
  };

  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsExiting(false);
    }, 300);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/users/register', { email, locationName: location });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      toast.success('Registration successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      closeModal();
    } catch (error) {
      toast.error('Error registering. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className='bg-blue-500 p-4 flex justify-between items-center font-bold text-2xl'>
        <div className='text-white'>Navbar</div>
        {!isLoggedIn && (
          <button
            className='bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105'
            onClick={handleLoginClick}
          >
            Register
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className={`modal-overlay ${isExiting ? 'exit' : ''}`}>
          <div className={`modal-content ${isExiting ? 'exit' : ''}`}>
            <h2 className='text-3xl font-bold mb-6 text-center'>Register</h2>
            <div className='mb-6'>
              <label htmlFor='email' className='block text-lg font-medium mb-2'>Email</label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='location' className='block text-lg font-medium mb-2'>Location</label>
              <input
                type='text'
                id='location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='flex justify-end space-x-4'>
              <button
                className='bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-all duration-300 ease-in-out'
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out'
                onClick={handleLogin}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
