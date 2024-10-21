import React from 'react'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div>
        <div className="mt-10 py-12 text-center bg-white text-gray-900">
            <h1 className="text-8xl self-auto overflow-hidden whitespace-nowrap border-r-4 animate-typing">INVEST NOW. EARN NOW.</h1><br />
            <span className=" font-bold">We are a flourishing business which wil provide you with all the latest and upto date Stocks, IPOs and Mutual Funds to keep you at the top of your financial state!</span>
            {/* <img src="src/assets/stock.jpg" alt="Stock Pic" class="h-96 w-92 self-right"/> */}
        </div>
        <div className='flex pt-32 pl-10 items-center justify-center'>
            <Link to="/login"><button className="ml-2 text-black hover:text-white">Stocks </button></Link>
            <span> |
            </span>
            {/* <svg width="25" height="25" class="ml-2">
                <circle cx="10" cy="10" r="10" fill="#FFFFFF" />
            </svg> */}
            <Link to="/login"><button className="ml-2 text-black hover:text-white">IPOs</button></Link>
            <span> |</span>
            {/* <svg width="25" height="25" class="ml-2">
                <circle cx="10" cy="10" r="10" fill="#FFFFFF" />
            </svg> */}
            <Link to="/login"><button className="ml-2 text-black hover:text-white">Mutual Funds</button></Link>
        </div>
    </div>
  )
}

export default Hero
