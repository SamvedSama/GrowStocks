import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  
  return (
    <>
      <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      {/* <Home/> */}
      <Navbar/>
      <Hero/>
      </div>
    </>
  )
}
