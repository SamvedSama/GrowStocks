import React from 'react';
import { CgCommunity, CgTrending, CgBolt, CgUser } from "react-icons/cg";

const About = () => {
  return (
    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">WELCOME TO GrowStocks</h1>

      <section className="mb-8">
        <div className="flex items-start mb-4">
          <CgCommunity className="text-5xl mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold">Our Commitment</h2>
            <p className="mt-2">
              We’re dedicated to maintaining transparency and delivering reliable information to our users. 
              All features are designed to empower individuals to make informed decisions while building 
              their financial literacy. We continuously update our tools to reflect the ever-changing dynamics 
              of the stock market, ensuring that you stay ahead.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-start mb-4">
          <CgTrending className="text-5xl mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold">Our Vision for the Future</h2>
            <p className="mt-2">
              As we grow, our goal is to become more than a stock tracking platform—GrowStocks aims to be a 
              hub for investment education and a trusted companion for your financial journey. We are 
              committed to fostering a community where investors of all levels can connect, learn, and succeed together.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-start mb-4">
          <CgBolt className="text-5xl mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold">Why Choose GrowStocks?</h2>
            <p className="mt-2">
              At GrowStocks, we combine cutting-edge technology with user-friendly features to make navigating 
              the stock market effortless. Whether you're monitoring your favorite stocks or experimenting with 
              investment strategies through dummy portfolios, our platform provides accurate data and actionable 
              insights to support your financial goals.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-start mb-4">
          <CgUser className="text-5xl mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold">Join Us</h2>
            <p className="mt-2">
              Start exploring the world of stocks with confidence. Sign up with GrowStocks today and take the 
              first step toward achieving your financial dreams. With our intuitive platform, your journey 
              to smarter investing begins here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;