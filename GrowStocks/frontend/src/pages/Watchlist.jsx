import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../url';
import { CgBookmark } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom'; // Add this for navigation

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // State to store userId
  const [firstname, setFirstname] = useState(''); // State to store firstname
  const navigate = useNavigate(); // Initialize navigate hook

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${url}/api/auth/user`, { withCredentials: true });
      setUserId(res.data._id);
      setFirstname(res.data.firstname);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data");
    }
  };

  const fetchWatchlistFromBackend = async () => {
    try {
      const response = await axios.get(`${url}/api/auth/watchlist`, { params: { userId } });
      
      if (response.data.watchlist && response.data.watchlist.length === 0) {
        setWatchlistData([]);
      } else {
        setWatchlistData(response.data.watchlist);
      }
    } catch (err) {
      console.error("Error fetching watchlist:", err);
      setError("Empty Watchlist");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component mounts
  }, []);

  useEffect(() => {
    if (userId) {
      fetchWatchlistFromBackend(); // Fetch watchlist after userId is set
    }
  }, [userId]);

  const updateWatchlist = async (stock) => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
  
    const updateState = (add) => {
      setWatchlistData((prevWatchlist) => {
        if (add) {
          return [...prevWatchlist, stock]; // Add stock to array
        }
        return prevWatchlist.filter((item) => item.stockname !== stock.stockname); // Remove stock
      });
    };
  
    try {
      // Check if the stock is already in the watchlist
      const stockExists = watchlistData.some((item) => item.stockname === stock.stockname);
      console.log('here');
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
      updateState(watchlistData.some((item) => item.stockname === stock.stockname)); // Revert the optimistic update on error
    }
  };

  if (isLoading) return <p className="text-center text-lg text-white">Loading your watchlist...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          Watchlist for <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700">{firstname || "Loading..."}</span>
        </h2>
        {watchlistData.length > 0 ? (
          <div className="flex flex-col gap-6">
            {watchlistData.map((stock, index) => (
              <div
                key={stock._id || index}
                className="bg-[#0f172a] p-6 rounded mt-6 mx-6 hover:border border-white transition duration-300 relative w-full"
              >
                <div className="flex justify-between items-center text-white">
                <div className="flex justify-between items-center text-white">
                  <div>
                    <p className="font-semibold text-2xl">{stock.stockname}</p>
                    <p className="text-xl mt-2">Current Price: {stock.currentPrice}</p> {/* Added mt-2 to create gap */}
                  </div>
                </div>
                </div>
                <div className="absolute top-2 right-2 hover:scale-110 text-white">
                  <button onClick={(event) => { event.stopPropagation(); updateWatchlist(stock); }}>
                    <CgBookmark className="transition-transform duration-200 hover:scale-150 text-xl" />
                  </button>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ml-auto"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate('/buy/:stockname', { state: { stock } }); // Navigate to TransStock page with stock data
                    }}
                  >
                    BUY
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">Your watchlist is empty.</p>
        )}
      </div>
    </>
  );
};

export default Watchlist;