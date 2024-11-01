import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex justify-center items-center mt-40">
  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
    
    <form>
      {/* First Name Input */}
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your first name"
          required
        />
      </div>

      {/* Last Name Input */}
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your last name"
          required
        />
      </div>

      {/* Date of Birth Input */}
      <div className="mb-4">
        <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      
      {/* Password Input */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      
      {/* Signup Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Sign Up
      </button>
      
      {/* Login Link */}
      <p className="text-center text-gray-600 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  </div>
</div>

  );
};

export default Signup;
