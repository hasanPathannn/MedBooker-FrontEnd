import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flec flex-col grid-cols-[3fr_1fr_1fr] sm:grid  gap-14 my-10 mt-40 text-sm'>
            {/* Left*/}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt=''/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>At medBooker, we understand the importance of your health and well-being. That's why we've created a simple, user-friendly interface that lets you find, schedule, and manage medical appointments with ease.</p>
            </div>

            {/* Middle*/}
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
            </div>

            {/* Right*/}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul  className='flex flex-col gap-2 text-gray-600'>
                    <li>+91-7869272347</li>
                    <li>pathannnhasan@gmail.com</li>
                </ul>
            </div>
        </div>

        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2025@ MedBooker - All Right Reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer