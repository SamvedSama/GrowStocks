import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import { url } from "../url";
import {useNavigate } from "react-router-dom";

const Mystocks = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  const showstocks = async () => {
    try {
      const res = await axios.get(url+"/api/auth/stocks", { withCredentials: true });
      console.log("Stocks data:", res.data);
      setStocks(res.data); // Assuming res.data contains the stocks
    } catch (err) {
      console.error("Error fetching stocks:", err);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    showstocks();
  }, []);

  const openStockInfo = (stock) => {
    setSelectedUnit(stock);
  };

  const closeStockInfo = () => {
    setSelectedUnit(null);
  };

  const handleSell = (unit) => {
    navigate(`/sell/${unit.details.stockName}`);
  }
  const handleBuy = (unit) => {
    navigate(`/buy/${unit.details.stockName}`);
  };
 
  return (
    <>
      <div>
        <span className="flex justify-center text-3xl text-white">My Stocks</span>
        <br />
        {isLoading ? (
          <div className="text-white text-center">Loading...</div>
        ) : stocks.length === 0 ? (
          <div className="text-white text-center">No stock purchased yet</div>
        ) : (
          stocks.map((stock, index) => (
            <div
              className={`bg-[#0f172a] p-4 rounded mt-6 ml-8 mr-6 hover:border border-white transition duration-300 relative`}
              key={index}
              onClick={() => openStockInfo(stock)}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{stock.details.stockName}</p>
                  <p className="text-white">Buying Price: {stock.details.totalAmount}</p>
                  <p className="text-white">Quantity: {stock.details.quantity}</p>
                </div>
                <div className="text-right text-white">
                  <p>Unrealized P&L: {stock.details.unrealizedpandl}</p>
                  <p>Date: {new Date(stock.details.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ml-auto"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleBuy(stock);
                  }}
                >
                  BUY
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition ml-10"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSell(stock);
                  }}
                >
                  SELL
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedUnit && (
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
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition bottom-5 right-5 absolute"
              onClick={() => handleBuy(selectedUnit)}
            >
              BUY
            </button>
            <button
              className="absolute top-0 right-2 mt-4 text-black py-2 px-4 rounded hover:bg-[#f44336]"
              onClick={closeStockInfo}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Mystocks;
