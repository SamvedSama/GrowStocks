import React, { useState,useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {Link,useNavigate} from 'react-router-dom'
import { stocks as initialStocks } from '../../constant'; 
import { mutuals as initialMutuals } from '../../constant'; 
import { WatchlistData as initialWatchlist } from '../../constant'; 
import { CgBookmark, CgMathPlus } from "react-icons/cg";
import { url } from '../url';
import Hamburgernav from '../components/Hamburgernav';
import axios from 'axios';

const UponLogin = () => {
  const [stocks] = useState(initialStocks);
  const [mutuals] = useState(initialMutuals);
  const [WatchlistData] = useState(initialWatchlist);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [portfolioValue,setPortfoliovalue] = useState(0);
  const [selectedUnit, setselectedUnit] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const res = await axios.get(url + "/api/auth/user", { withCredentials: true });
      console.log("User data:", res.data);
      setUserId(res.data._id);  
      setFirstname(res.data.firstname);  // Store the firstname
      setPortfoliovalue(res.data.balance)
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component mounts
  }, []);

  useEffect(() => {
    if (userId) {
      fetchWatchlist();  // Fetch the watchlist after userId is available
    }
  }, [userId]);
  

  const fetchWatchlist = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
  
    setIsLoading(true); // Set loading to true when fetching watchlist
  
    try {
      const response = await axios.get(`${url}/api/auth/watchlist`, {
        params: { userId },
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 200) {
        setWatchlist(response.data.watchlist || []); // Set watchlist to state
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      setError("Failed to fetch watchlist.");
    } finally {
      setIsLoading(false); // Set loading to false when done
    }
  };
  
  const updateWatchlist = async (stock) => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
  
    const updateState = (add) => {
      setWatchlist((prevWatchlist) => {
        if (add) {
          return [...prevWatchlist, stock]; // Add stock to array
        }
        return prevWatchlist.filter((item) => item.stockname !== stock.stockname); // Remove stock
      });
    };
  
    try {
      // Check if the stock is already in the watchlist
      const stockExists = watchlist.some((item) => item.stockname === stock.stockname);
      updateState(!stockExists);  // Update the state optimistically
  
      const response = await axios.post(
        `${url}/api/auth/watchlist/${stockExists ? 'remove' : 'add'}`,
        { 
          userId, 
          stockname: stock.stockname, 
          currentPrice: stock.currentPrice
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.status >= 200 && response.status < 300) {
        console.log(stockExists ? 'Stock removed from watchlist' : 'Stock added to watchlist');
      } else {
        console.error('Unexpected response status:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
      setError("Error updating watchlist.");
      updateState(watchlist.some((item) => item.stockname === stock.stockname)); // Revert the optimistic update on error
    }
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
    navigate(`/buy/${unit.stockname}`);
  };

  const handlebuymutual=(mutual)=>{
    navigate(`/mutual/${mutual.mutualname}`);
  };

  const handleIPOApply=(ipo)=>{
    navigate(`/ipo/${ipo.mutualname}`);
  };

  

  return (
    <>

    {/* Top navigation bar */}

    <div className="mt-2 justify-between items-center shadow-md">
      {/* Left section: Hamburger menu */}
      <div className="relative">
        {/* Hamburger icon */}
        <Hamburgernav size={24} toggled={isOpen} toggle={setIsOpen} color="white" />
      </div>
    </div>
    {/* Center section: MARKET TODAY */}
    <p className="text-4xl text-white font-semibold text-center">MARKET TODAY</p>
      <br />
    {/* 2nd section */}

    <div className='h-20 bg-white mt-5 flex justify-center items-center'>
      <p className='text-4xl'>Hello <span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700'>{firstname}</span>, Your balance is {isVisible ? `₹${portfolioValue}` : '₹******'}</p>
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
              <div className="absolute top-2 right-2 hover:scale-110">
                <button onClick={(event) => { event.stopPropagation(); updateWatchlist(stock); }}>
                  {watchlist.some((item) => item.stockname === stock.stockname) ? (<CgBookmark className="transition-transform duration-200 hover:scale-150" />) : (<CgMathPlus className="transition-transform duration-200 hover:scale-150" />)}
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
      <div className='mb-8'>
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
                  onClick={(event) => {event.stopPropagation();handlebuymutual(mutual)}}
                >
                  BUY
                </button>
              </div>
            </div>  
          ))}</div>
        <div className='mb-8'>
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
                  onClick={(event) => {event.stopPropagation();handleIPOApply(mutual)}}
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