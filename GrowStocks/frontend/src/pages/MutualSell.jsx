import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../url';
import { useNavigate } from 'react-router-dom';
import { mutuals } from '../../constant';


const MutualSell = () => {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const path = window.location.pathname;
    const segments = path.split('/');
    const mutualName = segments[2];
    const navigate = useNavigate();

    const mutual = mutuals.find((mutual) => mutual.mutualname === mutualName);
    if (!mutual) {
        return <div>Mutual not found</div>;
    }

    useEffect(() => {
        setAmount(mutual.minprice);
    }, []);

    const handleSellPay = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
          const response = await axios.post(url+"/api/auth/mutualsell", {
            mutualName,
            amount,
          },
          { withCredentials: true }
          );
          console.log("Message is: ",response.data);
          setMessage(response.data.message);
          navigate("/mutual");
        } catch (error) {
          setMessage(error.response.data.error || "Transaction failed.");
        } finally {
          setLoading(false);
        }
    }

    

    return (
        <div className="p-4 max-w-md mx-auto my-36 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Sell Mutual</h1>
                <form onSubmit={handleSellPay}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Mutual Name</label>
                    <input
                    type="text"
                    readOnly
                    value={mutualName}
                    className="w-full bg-gray-400 px-3 py-2 border rounded cursor-not-allowed"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                    type="number"
                    value={amount}
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-400 cursor-not-allowed"
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Sell Now"}
                </button>
                </form>
                {message && <p className="mt-4 text-sm">{message}</p>}
            </div>
        )
    }

export default MutualSell