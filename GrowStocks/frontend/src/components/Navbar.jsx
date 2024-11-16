import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="h-24 w-screen flex justify-between items-center ">
        <div className="pl-8"> 
            {/* <img src= "src/assets/GrowStocks.svg"/> */}
            <Link to="/home" className='font-roboto font-bold text-3xl text-white'>GrowStocks.</Link>
        </div>
        <div>
            <ul className="flex font-roboto font-bold">
                <li className="px-8 text-xl text-white hover:text-blue-700"><Link to="/about">About</Link></li>
                <li className="px-8 text-xl flex font-roboto font-bold text-white hover:text-blue-700"><Link to="/signup">SignUp</Link></li>
                <li className="flex font-roboto font-bold px-8 text-xl text-white hover:text-blue-700"><Link to="/login">Login</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
