import React, { useState } from 'react';

const VirtualKeyboard = () => {
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (character) => {
    setInputValue((prev) => prev + character); // Append the clicked character to the input value
  };

 

  const handleBackspace = () => {
    setInputValue((prev) => prev.slice(0, -1)); // Remove the last character
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
              } else {
                handleButtonClick(key); // Add character to input
              }
            }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
