import React,{useState,useEffect} from 'react';
import VirtualKeyboard from '../components/Keyboard';
import Hamburgernav from '../components/Hamburgernav';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { url } from '../url';
const Myfunds = () => {
  
    const [isOpen, setIsOpen]=useState(false);
    const [isOpen2, setIsOpen2]=useState(false);
    const [isOpenham, setIsOpenham]=useState(false);
    const [balance, setBalance] = useState(0);
    

    const toggleMenu = () => {
      setIsOpenham(!isOpenham);
    };



    const togglewithdraw = () => {
      setIsOpen(!isOpen);
    };


    const toggleadd = () => {
      setIsOpen2(!isOpen2);
    };

    const fetchBankAmount = async () => {
      try {
        const response = await axios.get(url + '/api/auth/balance', { withCredentials: true });
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching bank amount:', error);
      }
    };
  
    useEffect(() => {
      fetchBankAmount();
    }, []);
   
    // const latestTransactions = async () => {
    //   try {
    //     const response = await axios.get(url + '/api/auth/transactions', { withCredentials: true });
    //     console.log('Latest transactions:', response.data);
    //   } catch (error) {
    //     console.error('Error fetching latest transactions:', error);
    //   }
    // };
  
   return (
    
    <section className="bg-black min-h-screen text-white">
      <Hamburgernav/>
      <div className="px-6 py-4 mx-auto">
        {/* Top Bar with Date and Market Indexes */}
        <div className="flex justify-between items-center text-sm mb-4">
          <div>DATE: {new Date().toLocaleDateString()}</div>
          <div>NIFTY: 23518.50&nbsp; &nbsp;SENSEX: 77578.38</div>
        </div>

        {/* Sidebar Icon and Title */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-semibold mx-auto">MY FUNDS</h1>
        </div>

        {/* Available Amount */}
        <div className="text-center my-6">
          <p className="text-lg font-light mx-auto">AVAILABLE AMOUNT:</p>
          <p className="text-4xl font-bold">&#8377; {balance}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 my-6">
          <button className="bg-gray-200 text-black rounded-lg px-5 py-3 font-medium hover:bg-gray-300 focus:outline-none" onClick={togglewithdraw}>
          ADD TO BANK
          </button>
          <button className="bg-gray-200 text-black rounded-lg px-5 py-3 font-medium hover:bg-gray-300 focus:outline-none " onClick={toggleadd}>
            WITHDRAW FROM BANK
          </button>
        </div>
        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-3/5 relative">            
              <p className="mt-2 text-black font-bold ">Enter the amount you want to withdraw</p><br></br>
              <VirtualKeyboard action="withdraw" fetchBankAmount={fetchBankAmount}/>  
              
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
              <p className="mt-2 text-black font-bold ">Enter the amount you want to add</p><br></br>
              <VirtualKeyboard action="deposit" fetchBankAmount={fetchBankAmount}/>  
              
              <button
                className="absolute top-0 right-2 mt-4  text-black py-2 px-4 rounded  "
                onClick={toggleadd}
              >
                X
              </button>
          </div>
        </div>
      )}
      </div> 
    </section>
  );
}

export default Myfunds;