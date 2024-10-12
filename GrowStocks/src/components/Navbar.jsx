import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="h-24 w-screen text-white flex justify-between items-center ">
        <div className="pl-8"> 
            {/* <img src= "src/assets/GrowStocks.svg"/> */}
            <Link to="/home" className='font-roboto font-normal bold text-3xl hover:text-'>GrowStocks.</Link>
        </div>
        <div>
            <ul className="flex font-roboto font-normal italic">
                <li className="px-8 text-xl hover:text-blue-700"><Link to="/about">About</Link></li>
                <li className="px-8 text-xl hover:text-blue-700" ><Link to="/stocks">Stocks</Link></li>
                <li className="px-8 text-xl hover:text-blue-700"><Link to="/ipos">IPOs</Link></li>
                <li className="px-8 text-xl hover:text-blue-700"><Link to="/mutual">Mutual Funds</Link></li>
                <li className="px-8 text-xl flex font-roboto font-normal italic hover:text-blue-700"><Link to="/signup">SignUp</Link></li>
                <li className="flex font-roboto font-normal italic px-8 text-xl hover:text-blue-700"><Link to="/login">Login</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
