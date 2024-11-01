import React from 'react';
import {useState} from 'react';
import VirtualKeyboard from '../components/Keyboard';
// import Hamburgernav from '../components/Hamburgernav';
import {Link} from 'react-router-dom'
const Myfunds = () => {
  
    const [isOpen, setIsOpen]=useState(false);
    const [isOpen2, setIsOpen2]=useState(false);
    const [isOpenham, setIsOpenham]=useState(false);

    const toggleMenu = () => {
      setIsOpenham(!isOpenham);
    };


    const togglewithdraw = () => {
      setIsOpen(!isOpen);
    };


    const toggleadd = () => {
      setIsOpen2(!isOpen2);
    };
   let amountInBank=1234;
  return (
    
    <section className="bg-black min-h-screen text-white">
      <div className="px-6 py-4 mx-auto">
        {/* Top Bar with Date and Market Indexes */}
        <div className="flex justify-between items-center text-sm mb-4">
          <div>DATE:</div>
          <div>NIFTY:        SENSEX:</div>
        </div>

        {/* Sidebar Icon and Title */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
        {/* Hamburger icon */}
            <div className="cursor-pointer flex flex-col space-y-1" onClick={toggleMenu}>
              <div className="w-8 h-1 bg-white"></div>
              <div className="w-8 h-1 bg-white"></div>
              <div className="w-8 h-1 bg-white"></div>
            </div>

        {/* Menu items */}
          {isOpenham && (
            <ul className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg w-40">
              <Link to="/mystocks"><li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">
                My stocks
              </li></Link>
              <Link to="/mutual"><li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">
                My mutual funds
              </li></Link>
              <Link to="/watchlist"><li className="p-2 text-slate-950 hover:bg-gray-100 cursor-pointer">
                Watchlist
              </li></Link>
            </ul>
          )}
        </div>
          <h1 className="text-4xl font-semibold mx-auto">MY FUNDS</h1>
        </div>

        {/* Available Amount */}
        <div className="text-center my-6">
          <p className="text-lg font-light mx-auto">AVAILABLE AMOUNT:</p>
          <p className="text-4xl font-bold">{amountInBank}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 my-6">
          <button className="bg-gray-200 text-black rounded-lg px-5 py-3 font-medium hover:bg-gray-300 focus:outline-none" onClick={togglewithdraw}>
            WITHDRAW TO BANK
          </button>
          <button className="bg-gray-200 text-black rounded-lg px-5 py-3 font-medium hover:bg-gray-300 focus:outline-none" onClick={toggleadd}>
            ADD FROM BANK
          </button>
        </div>
{/* this is for the withdraw and adding money windows*/ }
        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-3/5 relative">            
              <p className="mt-2 text-black font-bold ">Enter the amount you want to withdraw</p><br></br>
              <VirtualKeyboard/>  
              
              <button
                className="absolute top-0 right-2 mt-4  text-black py-2 px-4 rounded  "
                onClick={togglewithdraw}
              >
                X
              </button>
          </div>
        </div>
      )}

{isOpen2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-3/5 relative">            
              <p className="mt-2 text-black font-bold ">Enter the amount you want to withdraw</p><br></br>
              <VirtualKeyboard/>  
              
              <button
                className="absolute top-0 right-2 mt-4  text-black py-2 px-4 rounded  "
                onClick={toggleadd}
              >
                X
              </button>
          </div>
        </div>
      )}

        {/* Latest Transactions Table */}
        <div className="mt-8">
          <div className="border-t border-gray-600 py-2">
            <p className="text-lg font-semibold">LATEST TRANSACTIONS</p>
          </div>
          <table className="w-full mt-4 text-sm">
            <thead className="text-left border-b border-gray-600">
              <tr>
                <th className="pb-2">NAME</th>
                <th className="pb-2">SELL/BUY</th>
                <th className="pb-2">QTY</th>
                <th className="pb-2">TRANSACTION ID</th>
                <th className="pb-2">INVESTMENT TYPE</th>
                <th className="pb-2">DATE</th>
              </tr>
            </thead>
           {/* <tbody>
               Dummy Data
              <tr>
                <td className="py-2">Company A</td>
                <td className="py-2">BUY</td>
                <td className="py-2">10</td>
                <td className="py-2">TX123456</td>
                <td className="py-2">Stocks</td>
                <td className="py-2">2024-10-12</td>
              </tr>
              <tr>
                <td className="py-2">Company B</td>
                <td className="py-2">SELL</td>
                <td className="py-2">5</td>
                <td className="py-2">TX654321</td>
                <td className="py-2">Bonds</td>
                <td className="py-2">2024-10-10</td>
              </tr>
            </tbody>*/}
          </table>
        </div>
      </div> 
    </section>
  );
}

export default Myfunds;
