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
    navigate(`/buy/${unit.mutualName}`);
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
                  <p>Mutual Name: {mutual.mutualName}</p>
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
              </div>
            </div>
          ))
        )}
      </div>

      {selectedUnit && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-[#475569] p-6 rounded w-3/5 h-3/5 relative flex text-white">
            <div className="absolute left-20 top-[180px]">Graph</div>
            <h2 className="text-xl font-bold">{selectedUnit.mutualName}</h2>
            <div className="absolute bottom-40 right-20 text-left text-0.5xl">
              <p>Units: {selectedUnit.mktPrice}</p>
              <p>Rating: {selectedUnit.rating}</p>
              <p>Average Cost: {selectedUnit.avgPrice}</p>
              <p>Investment Type: {selectedUnit.investmentType}</p>
              {selectedUnit.investmentType === "sip" && selectedUnit.sipDay && (
                <p>SIP Day: {selectedUnit.sipDay}</p>
              )}
              <p>Amount Invested: {selectedUnit.amount}</p>
              <p>Investment Date: {new Date(selectedUnit.date).toLocaleDateString()}</p>
            </div>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition bottom-5 right-5 absolute"
              onClick={() => handleBuy(selectedUnit)}
            >
              BUY
            </button>
            <button
              className="absolute top-0 right-2 mt-4 text-black py-2 px-4 rounded hover:bg-[#f44336]"
              onClick={closeMutualInfo}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Mutual;
