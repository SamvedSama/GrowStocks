import React from 'react'
import { CgUser, CgProfile, CgChart, CgDollar, CgFileDocument, CgCommunity } from 'react-icons/cg';

const Hero = () => {
  return (
    <div className="bg-black text-white p-8">
        <div className="mt-10 py-12 text-center bg-white text-gray-900">
          <h1 className="text-8xl self-auto overflow-hidden whitespace-nowrap border-r-4 animate-typing">INVEST NOW. EARN NOW.</h1><br />
          <span className=" font-bold">We are a flourishing business which wil provide you with all the latest and upto date Stocks, IPOs and Mutual Funds to keep you at the top of your financial state!</span>    
        </div>
        <br />
      <h1 className="text-4xl font-bold text-center mb-6">
        Open Your Demat Account
      </h1>
      <p className="text-center text-lg mb-10">
        Manage your investments in IPOs, stocks, and mutual funds seamlessly with a single account.
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
        <div className="flex flex-col items-center text-center">
          <CgUser className="text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Trust</h3>
          <p className="text-sm">Trusted by millions of investors worldwide for secure transactions.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <CgProfile className="text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Legacy</h3>
          <p className="text-sm">Over 20 years of expertise in financial markets and services.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <CgChart className="text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Seamless Investment</h3>
          <p className="text-sm">Invest in stocks, IPOs, and mutual funds with ease.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <CgDollar className="text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Earn Interest</h3>
          <p className="text-sm">Get returns on idle funds in your trading account.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <CgFileDocument className="text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Research Insights</h3>
          <p className="text-sm">Access in-depth research reports to make informed decisions.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <CgCommunity className="text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
          <p className="text-sm">Paperless onboarding process with a few simple steps.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero