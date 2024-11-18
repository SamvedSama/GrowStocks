import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';

const Hamburgernav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top navigation bar */}
      <div className="p-4 mt-2 flex justify-between items-center shadow-md relative z-10">
        {/* Left section: Hamburger menu */}
        <div className="relative">
          {/* Hamburger icon */}
          <Hamburger
            toggled={isOpen}
            toggle={toggleMenu}
            color="#fff" // Customize the hamburger color
            size={30} // Customize the size of the hamburger icon
          />

          {/* Menu items, positioned below the hamburger */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg w-40 p-4 z-20">
              <ul>
                <Link to="/welcome">
                  <li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">Home</li>
                </Link>
                <Link to="/mystocks">
                  <li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">My stocks</li>
                </Link>
                <Link to="/mutual">
                  <li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">My mutual funds</li>
                </Link>
                <Link to="/watchlist">
                  <li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">Watchlist</li>
                </Link>
                <Link to="/myfunds">
                  <li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">My Funds</li>
                </Link>
              </ul>
            </div>
          )}
        </div>

        <div className="flex-1 text-center">
          <p className="text-4xl text-white font-semibold text-center ml-12">My Portfolio</p>
        </div>

        {/* Right section: FUNDS button */}
        <Link to="/myfunds">
          <button className="px-6 py-2 border text-white border-white rounded-full hover:bg-white hover:text-slate-800 transition duration-500">
            FUNDS
          </button>
        </Link>
      </div>
      <br />
      <hr />
    <br />
    </>
  );
};

export default Hamburgernav;
