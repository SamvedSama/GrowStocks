import React, { useState } from "react";
import axios from "axios";
import { url } from "../url"; // Ensure this points to your backend URL

const MutualTrans = () => {
  const [investmentType, setInvestmentType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [sipDay, setSipDay] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) < 500) {
        setError("Minimum investment amount is 500 INR");
        return;
    }

    setError("");
    setMessage("Processing...");

    try {
      const response = await axios.post(url+'/api/auth/investment', {
        investmentType,
        amount: Number(amount),
        sipDay: investmentType === "sip" ? sipDay : null,
      },
      { withCredentials: true });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Mutual Fund Investment</h1>
      <form onSubmit={handleSubmit}>
        {/* Investment Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Investment Type</label>
          <select
            value={investmentType}
            onChange={(e) => setInvestmentType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="one-time">One-Time</option>
            <option value="sip">SIP</option>
          </select>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Amount (INR)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value.replace(/\D/g, "")))}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter amount (min 500)"
            required
          />
        </div>

        {/* SIP Day */}
        {investmentType === "sip" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">SIP Day</label>
            <input
              type="number"
              value={sipDay}
              onChange={(e) => setSipDay(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded"
              min="1"
              max="28"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Invest Now
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default MutualTrans;
