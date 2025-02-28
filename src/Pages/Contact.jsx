import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h2 className="text-3xl font-bold text-center mb-8">CONTACT <span className="text-primary">US</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img 
            src={assets.contact_image} 
            alt="Doctor and Patient" 
            className="rounded-lg shadow-lg w-3/4 md:w-2/3 object-cover mx-auto" 
          />
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-2">OUR OFFICE</h3>
          <p className="text-gray-700 text-sm md:text-base mb-4">
            IT Hub<br />
            Indore,India
          </p>
          <p className="text-gray-700 text-sm md:text-base mb-4">
            Phone: 7869272347<br />
            Email: pathannnhasan@gmail.com
          </p>
          <h3 className="font-semibold text-xl mb-2">CAREERS AT MedBooker</h3>
          <p className="text-gray-700 text-sm md:text-base mb-4">
            Learn more about our teams and job openings.
          </p>
          <button className="px-6 py-2 border border-gray-700 rounded-lg transition-colors hover:bg-blue-500 hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
