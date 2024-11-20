import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../url";
import { useNavigate } from "react-router-dom";

const Mutual = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [mutuals, setMutuals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const showMutuals = async () => {
    try {
      const res = await axios.get(url + "/api/auth/mutuals", { withCredentials: true });
      console.log("Mutuals data:", res.data);
      setMutuals(res.data);
    } catch (err) {
      console.error("Error fetching mutuals:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    showMutuals();
  }, []);

  const openMutualInfo = (mutual) => {
    setSelectedUnit(mutual);
  };

  const closeMutualInfo = () => {
    setSelectedUnit(null);
  };

  const handleBuy = (unit) => {
    navigate(`/mutual/${unit.mutualName}`);
  };

  const handleSell = (unit) => {
    navigate(`/sellmutual/${unit.mutualName}`);
  };

  return (
    <>
      <div>
        <span className="flex justify-center text-3xl text-white">My Mutuals</span>
        <br />
        {isLoading ? (
          <div className="text-white text-center">Loading...</div>
        ) : mutuals.length === 0 ? (
          <div className="text-white text-center">No mutuals purchased yet</div>
        ) : (
          mutuals.map((mutual, index) => (
            <div
              className={`bg-[#0f172a] p-4 rounded mt-6 ml-8 mr-6 hover:border border-white transition duration-300 relative`}
              key={index}
              onClick={() => openMutualInfo(mutual)}
            >
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <p className="font-semibold">{mutual.mutualName}</p>
                  <p>Invested Amount: {mutual.amount}</p>
                  <p>Investment Type: {mutual.investmentType}</p>
                  {mutual.investmentType === "sip" && mutual.sipDay && (
                    <p>SIP Day: {mutual.sipDay}</p>
                  )}
                  <p>Investment Date: {new Date(mutual.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ml-auto"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleBuy(mutual);
                  }}
                >
                  BUY
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition ml-10"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSell(mutual);
                  }}
                >
                  SELL
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Mutual;
