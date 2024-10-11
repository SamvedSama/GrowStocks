import React from 'react'

const Navbar = () => {
  return (
    <nav className="h-24 w-screen text-black flex justify-between items-center ">
        <div className="pl-8"> 
            <img src="" alt="" />
            <a href="/home">GrowStocks</a>
        </div>
        <div>
            <ul className="flex">
                <li className="px-8"><a href="/about">About</a></li>
                <li className="px-8"><a href="/stocks">Stocks</a></li>
                <li className="px-8"><a href="/ipos">IPO</a></li>
                <li className="px-8"><a href="/mutual">Mutual Funds</a></li>
                <li className="px-8"><button>Signup</button></li>
                <li className="px-8"><button>Login</button></li>
            </ul>
        </div>
        
        
    </nav>
  )
}

export default Navbar
