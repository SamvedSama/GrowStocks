import React from 'react'
import { mutuals as initialmutuals } from '../../constant'; // Import mutuals
import { useState, useEffect} from 'react';
const Mutual = () => {
  
  const [selectedUnit, setselectedUnit] = useState(null);
  const [mutuals]=useState(initialmutuals);

  const removeStock = (stock)=>{
    {/*code to remove the stock from the watchlist*/}
  }

  const openMutualInfo = (mutual) => {
    setselectedUnit(mutual); 
  };

  const closemutualInfo = () => {
    setselectedUnit(null); 
  };

  return (
    <>
        <div>
        <span className="flex justify-center text-3xl text-white">My mutuals</span>
        <br />
        {mutuals.map((mutual, index) => (
            <div className={`bg-[#0f172a] p-4 rounded  mt-6 ml-8 mr-6 hover:border border-white transition duration-300 relative ${index % 2 === 0 }`} key={mutual.mutualname} onClick={()=>openmutualInfo(mutual)} >
              <div className="flex justify-between items-center text-white">
                <div>
                  <p className="font-semibold">{mutual.mutualname}</p>
                  <p>Mkt Price: {mutual.mktPrice}</p>
                  <p>Avg Price: {mutual.avgPrice}</p>
                  <p>Quantity: {mutual.quantity}</p>
                </div>
                <div>
                  <p>Current Price: {mutual.currentPrice}</p>
                  <p>Unrealized P&L: {mutual.unrealizedPL}</p>
                  <p>Realized P&L: {mutual.realizedPL}</p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ml-auto"
                  onClick={(event) => {event.stopPropagation();handleBuy(mutual)}}>
                  BUY
                </button>
              
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition ml-10"
                    onClick={(event) =>{event.stopPropagation(); handleSell(mutual)}}
                  >
                    SELL
                </button>
              </div>
            </div>  
          ))}
      </div>

      {selectedUnit &&(
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="bg-[#475569] p-6 rounded w-3/5 h-3/5 relative flex text-white">
                
                <div className="absolute left-20 top-[180px]">Graph</div>
                <h2 className="text-xl font-bold">{selectedUnit.mutualname}</h2>
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
              className="absolute top-0 right-2 mt-4 text-black py-2 px-4 rounded hover:bg-[#f44336]" onClick={closemutualInfo}>
              X
            </button>
              </div>
            </div>
          )}
    
    </>
  
  )
}

export default Mutual