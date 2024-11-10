import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Hamburgernav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
              <Link to="/mystocks"><li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">My stocks</li></Link>
              <Link to="/mutual"><li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">My mutual funds</li></Link>
              <Link to="/watchlist"><li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">Watchlist</li></Link>
            </ul>
          )}
        </div>

        {/* Center section: MARKET TODAY */}
        <p className="text-4xl text-white font-semibold ml-40 text-center relative">MY PORTFOLIO</p>

        {/* Right section: FUNDS and LOGOUT buttons */}
        <div className="flex space-x-4"> {/* Flex container to align buttons horizontally */}
          <Link to="/myfunds">
            <button className="px-6 py-2 border text-white border-white rounded-full hover:bg-white hover:text-slate-800 transition duration-500">
              FUNDS
            </button>
          </Link>
          <Link to="/home">
            <button className="px-6 py-2 border text-white border-white rounded-full hover:bg-white hover:text-slate-800 transition duration-500">
              LOGOUT
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hamburgernav;