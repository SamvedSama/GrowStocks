import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../url";
import { useNavigate } from "react-router-dom";
import { ipos } from "../../constant";

const IPOTrans = () => {
  const [quantity, setQuantity] = useState(0);
  const [pricePerQuantity, setPricePerQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const path = window.location.pathname;
  const segments = path.split('/');
  const ipoName = segments[2];
  const navigate = useNavigate();

  useEffect(() => {
    const ipo = ipos.find((ipo) => ipo.mutualname === ipoName);
    if (ipo) {
      setPricePerQuantity(ipo.minprice);
    }
  }, [ipoName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quantity || !pricePerQuantity) {
      setIsError(true);
      setMessage("All fields are required.");
      return;
    }

    const totalAmount = quantity * pricePerQuantity;

    try {
      const response = await axios.post(
        `${url}/api/auth/ipo`,
        { ipoName, quantity, pricePerQuantity, totalAmount },
        { withCredentials: true }
      );
      setIsError(false);
      setMessage(response.data.message || "Investment successful.");
      setTimeout(() => navigate("/myipos"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Payment failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">IPO Investment</h2>
        <label htmlFor="ipoName" className="block font-medium mb-2">IPO Name</label>
        <input
          type="text"
          id="ipoName"
          className="w-full p-2 border rounded mb-4 bg-gray-400 cursor-not-allowed"
          value={ipoName}
          readOnly
        />
        <label htmlFor="quantity" className="block font-medium mb-2">Quantity</label>
        <input
          type="number"
          id="quantity"
          className="w-full p-2 border rounded mb-4"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter Quantity"
          required
          min="1"
          step="5"
        />
        <label htmlFor="pricePerQuantity" className="block font-medium mb-2">Price Per Quantity</label>
        <input
          type="number"
          id="pricePerQuantity"
          className="w-full p-2 border rounded mb-4 bg-gray-400 cursor-not-allowed"
          value={pricePerQuantity}
          readOnly
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Invest
        </button>
        {message && (
          <p className={`mt-4 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default IPOTrans;