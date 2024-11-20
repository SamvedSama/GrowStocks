import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../url";
import { stocks } from "../../constant";
import { useNavigate } from "react-router-dom"; 

const StockTrans = () => {
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const path = window.location.pathname; // Gets '/buy/AAPL'
    const segments = path.split('/'); // Splits into ['', 'buy', 'AAPL']
    const stockName = segments[2]; // Extracts 'AAPL'
    const navigate = useNavigate();

    const stock = stocks.find((stock) => stock.stockname === stockName);

    if (!stock) {
        return <div>Stock not found</div>;
    }

    useEffect(() => {
      setPrice(stock.currentPrice);
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
          const response = await axios.post(url+"/api/auth/payment", {
            stockName,
            quantity,
            price,
          },
          { withCredentials: true }
          );
          setMessage(response.data.message);
          setTimeout(() => {
            navigate("/mystocks");
          }, 2000);
        } catch (error) {
          setMessage(error.response.data.error || "Payment failed.");
        } finally {
          setLoading(false);
        }
      };
    
      return (
        <div className="p-4 max-w-md mx-auto my-36 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Buy Stock</h1>
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Stock Name</label>
              <input
                type="text"
                readonly
                value={stockName}
                className="w-full bg-gray-400 px-3 py-2 border rounded cursor-not-allowed"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input  
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                min="5"
                step="10"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Price (per stock)</label>
              <input
                type="number"
                value={price}
                readonly
                className="w-full px-3 py-2 border rounded bg-gray-400 cursor-not-allowed"
                min="0"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </form>
          {message && <p className="mt-4 text-sm">{message}</p>}
        </div>
      );
    };
    

export default StockTrans
