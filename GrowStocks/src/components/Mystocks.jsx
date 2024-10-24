  import React, { useState, useEffect} from 'react';
  import {Link} from 'react-router-dom'
  import { stocks as initialStocks } from '../../constant'; // Import stocks
  
  
  const Mystocks = () => {
  const [selectedUnit, setselectedUnit] = useState(null);
  const [stocks]=useState(initialStocks);

  const removeStock = (stock)=>{
    {/*code to remove the stock from the watchlist*/}
  }

  const openStockInfo = (stock) => {
    setselectedUnit(stock); 
  };

  const closeStockInfo = () => {
    setselectedUnit(null); 
  };

  return (
    <>
        <div>
        <span className="flex justify-center text-3xl text-white">My Stocks</span>
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

              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ml-auto"
                  onClick={(event) => {event.stopPropagation();handleBuy(stock)}}>
                  BUY
                </button>
              
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition ml-10"
                    onClick={(event) =>{event.stopPropagation(); handleSell(stock)}}
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
  )
  };

  export default Mystocks;
<div className="flex justify-between mt-4">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    onClick={() => handleSell(stock)}
                  >
                    SELL
                  </button>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    onClick={() => handleBuy(stock)}
                  >
                    BUY
                  </button>
                </div>