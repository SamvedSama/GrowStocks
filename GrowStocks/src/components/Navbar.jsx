import React from 'react'

const Navbar = () => {
  return (
    <nav className="h-24 w-screen text-black flex justify-between items-center ">
        <div className="pl-8"> 
            {/* <img src= "src/assets/GrowStocks.svg"/> */}
            <a href="/home" className='font-roboto font-normal bold text-3xl'>GrowStocks.</a>
        </div>
        <div>
            <ul className="flex font-roboto font-normal italic">
                <li className="px-8 text-xl hover:text-white"><a href="/about">About</a></li>
                <li className="px-8 text-xl hover:text-white" ><a href="/stocks">Stocks</a></li>
                <li className="px-8 text-xl hover:text-white"><a href="/ipos">IPO</a></li>
                <li className="px-8 text-xl hover:text-white"><a href="/mutual">Mutual Funds</a></li>
                <button className='px-8 text-xl flex font-roboto font-normal italic hover:text-white'>Signup</button>
                <button className='flex font-roboto font-normal italic px-8 text-xl hover:text-white'>Login</button>
            </ul>
        </div>
        
        
    </nav>
  )
}

export default Navbar
