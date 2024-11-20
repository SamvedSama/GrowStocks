import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import axios from 'axios';
import { url } from '../url';


const Hamburgernav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try{
        const response = await axios.get(url+"/api/auth/logout", {withCredentials: true});
        if(response.status === 200){
          navigate("/home");
        }
    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
      {/* Top navigation bar */}
      <div className="p-4 mt-2 flex justify-between items-center shadow-md relative z-10">
        {/* Left section: Hamburger menu */}
        <div className="relative">
          <Hamburger
            toggled={isOpen}
            toggle={toggleMenu}
            color="#fff" // Customize the hamburger color
            size={30} // Customize the size of the hamburger icon
          />

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg w-40 p-4 z-20">
              <ul>
                <Link to="/welcome">
                  <li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">Home</li>
                </Link>
                <Link to="/mystocks">
                  <li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">My Stocks</li>
                </Link>
                <Link to="/mutual">
                  <li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">My Mutual Funds</li>
                </Link>
                <Link to="/myipos">
                  <li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">My IPOs</li>
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

        {/* Center section: Title */}
        <div className="flex-1 text-center">
          <p className="text-4xl text-white font-semibold text-center ml-12">My Portfolio</p>
        </div>

        {/* Right section: Logout button */}
        <div className="text-right">
          <button className="px-6 py-2 border text-white border-white rounded-full hover:bg-white hover:text-slate-800 transition duration-500" onClick={(event) => { event.stopPropagation(); handleLogout(); }}>
            Logout
          </button>
        </div>
      </div>
      <br />
      <hr />
      <br />
    </>
  );
};

export default Hamburgernav;
