import React, { useState } from "react";
import axios from "axios";
import { url } from "../url";

const StockTrans = () => {
    const [stockName, setStockName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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
        } catch (error) {
          setMessage(error.response.data.error || "Payment failed.");
        } finally {
          setLoading(false);
        }
      };
    
      return (
        <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Buy Stock</h1>
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Stock Name</label>
              <input
                type="text"
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
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
                min="1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Price (per stock)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded"
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