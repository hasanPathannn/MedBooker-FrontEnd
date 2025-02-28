import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { AppContext } from '../Context/AppContext'

const Navbar = () => {
    const navigate=useNavigate();

    const [showMenu,setShowMenu]=useState(false);
    const {token,setToken,userData}=useContext(AppContext);

    const handleSubmit=async()=>{
        try{
            if(token){
                setToken(false);
                localStorage.removeItem('token');
            }
        }
        catch(err){
            console.log(err)
            toast.error(err);
        }
    }

  return (
    
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-33 cursor-pointer' src={assets.logo} alt="Logo"/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li  className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>

            <NavLink to='/doctors'>
                <li className='py-1' >Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>

            <NavLink to='/about'>
                <li className='py-1'  >About</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>

            <NavLink to='/contact'>
                <li  className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>

        </ul>

        <div className='flex items-center gap-4'>
            {
            token ? 
            <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-8 rounded-full' src={userData.image} alt=""/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>Profile</p>
                    <p onClick={()=>navigate('/my-appointments')}  className='hover:text-black cursor-pointer'>Appointments</p>
                    <p onClick={()=>{handleSubmit()}}  className='hover:text-black cursor-pointer' >Logout</p>
                    </div>
                   
                </div>

            </div> : 
            <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
            }
            
        </div>
    </div>
    
  )
}

export default Navbar