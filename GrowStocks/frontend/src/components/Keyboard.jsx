import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../url';

const VirtualKeyboard = ({ action, fetchBankAmount }) => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState(''); // Success message
  const handleButtonClick = (character) => {
    setInputValue((prev) => prev + character); // Append the clicked character to the input value
  };

 

  const handleBackspace = () => {
    setInputValue((prev) => prev.slice(0, -1)); // Remove the last character
  };

  const handleSubmit = async () => {
    const amount = parseInt(inputValue, 10);
    if (!isNaN(amount) && amount > 0) {
      try {
        const endpoint = action === 'deposit' ? '/api/auth/deposit' : '/api/auth/withdraw';
        await axios.post(url + endpoint, { amount }, { withCredentials: true });
        
        setMessage(`₹${amount} has been ${action === 'deposit' ? 'added' : 'withdrawn'} from your bank!`);
        fetchBankAmount(); // Refresh the bank amount in parent
        setInputValue('');
      } catch (error) {
        setMessage('Error updating bank amount. Please try again.');
        console.error(`Error ${action === 'deposit' ? 'depositing' : 'withdrawing'} funds:`, error);
      }
    } else {
      setMessage('Invalid amount entered. Please try again.');
    }
  };
  // Define the keys for the virtual keyboard
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '<-', '0', 'Submit', // 'C' for clear, '<-' for backspace
  ];

  return (
    <div className="virtual-keyboard">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border-2 text-black rounded p-2 mb-4 w-full" 
      />
      <div className="grid grid-cols-3 gap-2">
        {keys.map((key) => (
          <button
            key={key}
            className="bg-blue-500 text-white rounded py-2"
            onClick={() => {
                if (key === '<-') {
                handleBackspace(); // Handle backspace
              } else if (key === 'Submit') {
                handleSubmit(); // Handle submit
              } else {
                handleButtonClick(key); // Add character to input
              }
            }}
          >
            {key}
          </button>
        ))}
      </div>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default VirtualKeyboard;
