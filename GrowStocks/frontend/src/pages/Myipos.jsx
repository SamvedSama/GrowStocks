import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { url } from "../url";
import { useNavigate } from "react-router-dom";

const Myipos = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [ipos, setIpos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleBuyIPO = (ipo) => {
    navigate("/ipo/:mutualname");
  }
  // Fetch IPO investments from the backend
  const showIpos = async () => {
    try {
      const res = await axios.get(url + "/api/auth/findipos", { withCredentials: true });
      console.log("IPO data:", res.data);
      setIpos(res.data); // Assuming res.data contains the IPO investments
    } catch (err) {
      console.error("Error fetching IPO data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    showIpos();
  }, []);

  return (
    <div>
      <span className="flex justify-center text-3xl text-white">My IPOs</span>
      <br />
      {isLoading ? (
        <div className="text-white text-center">Loading...</div>
      ) : ipos.length === 0 ? (
        <div className="text-white text-center">No IPO investments yet</div>
      ) : (
        ipos.map((ipo, index) => (
          <div
            className="bg-[#0f172a] p-4 rounded mt-6 ml-8 mr-6 hover:border border-white transition duration-300 relative"
            key={index}
          >
            <div className="flex justify-between items-center">
            <div>
                  <p className="text-white font-semibold">{ipo.details.ipoName}</p>
                  <p className="text-white">Total Amount: {ipo.details.totalAmount}</p>
                  <p className="text-white">Quantity: {ipo.details.quantity}</p>
                </div>
                <div className="text-right text-white">
                  <p>Price per Quantity: {ipo.details.pricePerQuantity}</p>
                  <p>Date: {new Date(ipo.details.date).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="flex justify-between mt-4">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ml-auto" onClick={(event) => {
                    event.stopPropagation();
                    handleBuyIPO(ipo);
                  }}>Buy
            </button>
            </div>
            </div>
        ))
      )}
    </div>
  );
};

export default Myipos;
