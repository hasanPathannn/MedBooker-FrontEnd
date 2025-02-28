import React from "react";
import { assets } from "../assets/assets";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h2 className="text-3xl font-bold text-center mb-8">ABOUT <span className="text-primary">US</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img src={assets.about_image} alt="Doctors" className="rounded-lg shadow-lg w-3/4 md:w-2/3 object-cover mx-auto" />
        </div>
        <div>
          <p className="text-gray-700 mb-4 text-sm md:text-base">
            Welcome to MedBooker, your trusted partner in managing your healthcare needs conveniently and efficiently. At MedBooker, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-gray-700 mb-4 text-sm md:text-base">
            MedBooker is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MedBooker is here to support you every step of the way.
          </p>
          <h3 className="font-semibold text-lg">Our Vision</h3>
          <p className="text-gray-700 text-sm md:text-base">
            Our vision at MedBooker is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center my-12">WHY <span className="text-primary">CHOOSE US</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div className="p-6 border rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:bg-blue-500 hover:text-white">
          <h3 className="font-bold text-xl mb-2">EFFICIENCY:</h3>
          <p className="text-gray-700 hover:text-white text-sm md:text-base">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:bg-blue-500 hover:text-white">
          <h3 className="font-bold text-xl mb-2">CONVENIENCE:</h3>
          <p className="text-gray-700 hover:text-white text-sm md:text-base">Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:bg-blue-500 hover:text-white">
          <h3 className="font-bold text-xl mb-2">PERSONALIZATION:</h3>
          <p className="text-gray-700 hover:text-white text-sm md:text-base">Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
