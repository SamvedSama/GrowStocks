import React from 'react';
import { CgPhone, CgMail, CgSupport } from "react-icons/cg";

const ContactUs = () => {
  return (
    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">CUSTOMER CARE PAGE</h1>

      {/* Contact Information Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Call Us At</h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center text-xl">
            <CgPhone className="text-2xl text-blue-500 mr-2" />
            <span>+91 9113020818</span>
          </div>
          <div className="flex items-center text-xl">
            <CgPhone className="text-2xl text-blue-500 mr-2" />
            <span>+91 9535464786</span>
          </div>
          <div className="flex items-center text-xl">
            <CgPhone className="text-2xl text-blue-500 mr-2" />
            <span>+91 9008490106</span>
          </div>
        </div>
        <p className="text-center mt-4 text-sm">
          09:00 AM – 06:00 PM 
        </p>
      </div>

      {/* Email Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Email Us</h2>
        <div className="flex justify-center items-center">
          <div className="text-center">
            <div className="flex items-center justify-center text-xl mb-2">
              <CgMail className="text-2xl text-blue-500 mr-2" />
              <span>support@growstocks.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Query Section */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Submit Your Query</h2>
        <form className="space-y-4">
          <textarea
            placeholder="Enter your question here"
            className="bg-gray-700 text-white p-4 w-full rounded-md"
            rows="4"
          ></textarea>
          <div className="flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;