import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {Link} from 'react-router-dom'


const UponLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const portfolioValue = 123456; // Replace this with your actual value
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>

    {/* Top navigation bar */}

    <div className="p-4 mt-2 flex justify-between items-center shadow-md">
      {/* Left section: Hamburger menu */}
      <div className="relative">
        {/* Hamburger icon */}
        <div className="cursor-pointer flex flex-col space-y-1" onClick={toggleMenu}>
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white"></div>
        </div>

        {/* Menu items */}
        {isOpen && (
          <ul className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg w-40">
            <Link to="/mystocks"><li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">
              My stocks
            </li></Link>
            <Link to="/mutual"><li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">
              My mutual funds
            </li></Link>
            <Link to="/watchlist"><li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">
              Watchlist
            </li></Link>
          </ul>
        )}
      </div>

      {/* Center section: MARKET TODAY */}
      <p className="text-4xl text-white font-semibold">MARKET TODAY</p>

      {/* Right section: FUNDS button */}
      <button className="px-6 py-2 border text-white border-white rounded-full hover:bg-white hover:text-slate-800 transition duration-500">FUNDS</button>

    </div>

    {/* 2nd section */}

    <div className='h-20 bg-white mt-5 flex justify-center items-center'>
        <p className='text-4xl'>Hello <span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700'>Samved</span>, Your portfolio value is {isVisible ? `$${portfolioValue}` : '$******'}</p>
        <span><button className=' text-4xl p-2 rounded-full text-slate-950 hover:bg-blue-600 transition duration-300' onClick={toggleVisibility}>{isVisible? <FaEyeSlash /> : <FaEye />}</button></span>
    </div>
    </>
  );
};

export default UponLogin;
