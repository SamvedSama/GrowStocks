import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { stocks as initialStocks } from '../../constant'; 
import { mutuals as initialMutuals } from '../../constant'; 
import { WatchlistData as initialWatchlist } from '../../constant'; 
import { CgBookmark, CgMathPlus } from "react-icons/cg";

const UponLogin = () => {
  const [stocks] = useState(initialStocks);
  const [mutuals] = useState(initialMutuals);
  const [WatchlistData] = useState(initialWatchlist);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const portfolioValue = 123456; // Replace this with your actual value
  const [selectedUnit, setselectedUnit] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [watchlist, setWatchlist] = useState({});

  const updateWatchlist = (stock) => {

    setWatchlist((prevWatchlist) => {
      if(prevWatchlist[stock.stockname]){
        const newWatchlist={...prevWatchlist};
        delete newWatchlist[stock.stockname];
        return newWatchlist;
      }
      else{
        return {...prevWatchlist,[stock.stockname]:stock}
      }
  });
  };

  const openStockInfo = (stock) => {
    setselectedUnit(stock); 
  };

  const addedToWatchList = (stock) => {
    if(isAdded){
      {/*code to remove stock from watchlist*/}
    }
    else{
      {/*code to add stock to watchlist*/}
    }
    setIsAdded((prev)=>!prev); 
  };

  const closeStockInfo = () => {
    setselectedUnit(null); 
  };
  
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleBuy=(unit)=>{
    prompt(`Buying ${unit.stockname || unit.mutualname}`);
  };

  const handleIPOApply=(ipo)=>{
    {/**/}
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
      <Link to="/myfunds"><button className="px-6 py-2 border text-white border-white rounded-full hover:bg-white hover:text-slate-800 transition duration-500">FUNDS</button></Link>
      
    </div>

    {/* 2nd section */}

    <div className='h-20 bg-white mt-5 flex justify-center items-center'>
      <p className='text-4xl'>Hello <span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700'>Samved</span>, Your portfolio value is {isVisible ? `$${portfolioValue}` : '$******'}</p>
      <span><button className=' text-4xl p-2 rounded-full text-slate-950 hover:bg-blue-600 transition duration-300' onClick={toggleVisibility}>{isVisible? <FaEyeSlash /> : <FaEye />}</button></span>
    </div>
    <div className="grid grid-cols-3 gap-4 mt-4 text-white divide-x">
      <div>
        <span className="flex justify-center text-3xl ">Stocks</span>
        <br />
        {stocks.map((stock, index) => (
            <div className={`bg-[#0f172a] p-4 rounded  mt-6 ml-8 mr-6 hover:border border-white transition duration-300 relative ${index % 2 === 0 }`} key={stock.stockname} onClick={()=>openStockInfo(stock)} >
              <div className="flex justify-between items-center text-white">
                <div>
                  <p className="font-semibold">{stock.stockname}</p>
                  <p>Mkt Price: {stock.mktPrice}</p>
                  <p>Avg Price: {stock.avgPrice}</p>
                  <p>Quantity: {stock.quantity}</p>
                </div>
                <div>
                  <p>Current Price: {stock.currentPrice}</p>
                  <p>Unrealized P&L: {stock.unrealizedPL}</p>
                  <p>Realized P&L: {stock.realizedPL}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2 hover:scale:110">
                <button onClick={(event)=>{event.stopPropagation(); updateWatchlist(stock) }}>
                  {watchlist[stock.stockname] ? <CgBookmark className="transition-transform duration-200 hover:scale-150" /> : <CgMathPlus className="transition-transform duration-200 hover:scale-150" />}
                </button>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ml-auto"
                  onClick={(event) => {event.stopPropagation();handleBuy(stock)}}>
                  BUY
                </button>
              </div>
            </div>  
          ))}
      </div>
      <div>
        <span className="flex justify-center text-3xl ">Mutual Funds</span>
        <br />
        {mutuals.map((mutual, index) => (
            <div className={`bg-[#0f172a] p-4 rounded  mt-6 ml-8 mr-6 hover:border border-white transition duration-300 min-h-[185px] ${index % 2 === 0 }`} key={mutual.mutualname} onClick={()=>openStockInfo(mutual)} >
              <div className="flex justify-between items-center text-white">
                <div>
                  <p className="font-semibold">{mutual.mutualname}</p>
                  <p>Min price {mutual.minprice}</p>
                  <p>Avg Price: {mutual.oneYreturns}</p>
                </div>
              </div>

              <div className="flex justify-between mt-9">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ml-auto"
                  onClick={(event) => {event.stopPropagation();handleBuy(stock)}}
                >
                  BUY
                </button>
              </div>
            </div>  
          ))}</div>
        <div>
        <span className="flex justify-center text-3xl">IPOs</span>
        <br />
        {mutuals.map((mutual, index) => (
            <div className={`bg-[#0f172a] p-4 rounded  mt-6 ml-8 mr-6 hover:border border-white transition duration-300 min-h-[185px] ${index % 2 === 0 }`} key={mutual.mutualname} onClick={()=>openStockInfo(mutual)} >
              <div className="flex justify-between items-center text-white">
                <div>
                  <p className="font-semibold">{mutual.mutualname}</p>
                  <p>Min price {mutual.minprice}</p>
                  <p>Avg Price: {mutual.oneYreturns}</p>
                </div>
              </div>

              <div className="flex justify-between mt-9">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ml-auto"
                  onClick={(event) => {event.stopPropagation();handleIPOApply(ipo)}}
                >
                  APPLY
                </button>
              </div>
            </div>  
          ))}
        </div>
      </div>
    
     

      

      {selectedUnit &&(
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="bg-[#475569] p-6 rounded w-3/5 h-3/5 relative flex text-white">
                
                <div className="absolute left-20 top-[180px]">Graph</div>
                <h2 className="text-xl font-bold">{selectedUnit.stockname}</h2>
                  <div className="absolute bottom-20 right-20 text-left text-2xl">                    
                    <p>Market Price: {selectedUnit.mktPrice}</p>
                    <p>Average Price: {selectedUnit.avgPrice}</p>
                    <p>Quantity: {selectedUnit.quantity}</p>
                    <p>Current Price: {selectedUnit.currentPrice}</p>
                    <p>Unrealized P&L: {selectedUnit.unrealizedPL}</p>
                    <p>Realized P&L: {selectedUnit.realizedPL}</p>
                    <p>ISIN Index: {selectedUnit.ISIN}</p>
                </div>
                {/* BUY Button */}
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition bottom-5 right-5 absolute"
                  onClick={() => handleBuy(selectedUnit)}
                >
                  BUY
                </button>
                {/* Close button */}
                <button
              className="absolute top-0 right-2 mt-4 text-black py-2 px-4 rounded hover:bg-[#f44336]" 
              onClick={closeStockInfo}>
              X
            </button>
              </div>
            </div>
          )}
    
    </>
  );
};

export default UponLogin;
