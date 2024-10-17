import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const Mystocks = () => {
  const [stocks, setStocks] = useState([
    { stockname: 'AAPL', mktPrice: 150, avgPrice: 145, quantity: 10, currentPrice: 152, unrealizedPL: 20, realizedPL: 10 },
    { stockname: 'GOOGL', mktPrice: 2750, avgPrice: 2700, quantity: 5, currentPrice: 2800, unrealizedPL: 250, realizedPL: 50 },
    { stockname: 'TSLA', mktPrice: 800, avgPrice: 780, quantity: 15, currentPrice: 820, unrealizedPL: 300, realizedPL: 150 },
  ]);
  
  const handleBuy = (stock) => {
    alert(`Buying more of ${stock.stockname}`);
  };

  const handleSell = (stock) => {
    alert(`Selling ${stock.stockname}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center bg-white p-4 rounded shadow-md">
        <div className="text-lg font-semibold">DATE:</div>
        <div className="text-lg font-semibold">NIFTY: SENSEX:</div> 
      </div>

      <h1 className="mt-6 text-2xl font-bold text-center">My stocks</h1>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">MY STOCKS</h2>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {stocks.map((stock, index) => (
            <div className={`bg-white p-4 rounded shadow-md ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={stock.stockname}>
              <div className="flex justify-between items-center">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mystocks;
