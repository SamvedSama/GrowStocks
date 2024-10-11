import React from 'react'

const Hero = () => {
  return (
    <div>
        <div class="pt-36 pl-10 text-center">
            <h1 class="text-9xl pl-8 self-auto overflow-hidden whitespace-nowrap border-r-4 animate-typing">INVEST NOW. EARN NOW.</h1><br />
            <span class="pl-10 font-bold">We are a flourishing business which wil provide you with all the latest and upto date Stocks, IPOs and Mutual Funds to keep you at the top of your financial state!</span>
            {/* <img src="src/assets/stock.jpg" alt="Stock Pic" class="h-96 w-92 self-right"/> */}
        </div>
        <div className='flex pt-32 pl-10 items-center justify-center'>
            <button class="bg-gray-500 rounded p-8 ml-2 text-white">Stocks</button>
            <svg width="25" height="25" class="ml-2">
                <circle cx="10" cy="10" r="10" fill="#FFFFFF" />
            </svg>
            <button class="bg-gray-500 rounded p-8 ml-2 text-white">IPOs</button>
            <svg width="25" height="25" class="ml-2">
                <circle cx="10" cy="10" r="10" fill="#FFFFFF" />
            </svg>
            <button class="bg-gray-500 rounded p-8 ml-2 text-white">Mutual Funds</button>
        </div>
    </div>
  )
}

export default Hero
