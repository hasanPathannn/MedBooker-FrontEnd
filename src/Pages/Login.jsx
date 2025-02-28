import React, { use, useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from 'axios';
import { toast } from "react-toastify";

const Login = () => {
  const navigate=useNavigate();
  const full_name=useRef();
  const email=useRef();
  const password=useRef();
  const [state,setState]=useState('Sign-Up');
  const {backendUrl,setToken}=useContext(AppContext);
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(email.current.value,password.current.value)

    if(state==='Login'){
    const {data}= await axios.post(backendUrl+'api/user/login',{email:email.current.value, password:password.current.value});

    if(data.success){
      console.log(data);
      toast.success('Login successfull');
      setToken(data.token);
      localStorage.setItem('token',data.token);
      navigate('/')
    }
    else{
      toast.error('Invalid credentials');
    }
  }
  else{

    const {data}=await axios.post(backendUrl+'api/user/sign-up',{email:email.current.value, password:password.current.value, name:full_name.current.value})
    if(data.success){
      setToken(data.token);
      localStorage.setItem('token',data.token);
      toast.success('SignIn successfull');
      navigate('/')
    }
    else{
      console.log(data.message);
      toast.error(data.message);
    }
  }

  }

  const handleChange=(e)=>{
    setAccount({...account, [e.target.id]: e.target.value})
  }

  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">{state=== 'Sign-Up' ? 'Create Account' : 'Login'}</h2>
        <p className="mb-6 text-sm text-gray-600">Please {state} to book an appointment</p>
        <form onSubmit={(e)=>handleSubmit(e)} className="space-y-4">
          {state==='Sign-Up' ? <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input id="full_name"
              ref={full_name}
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div> : ''}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email"
              ref={email}
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password"
              ref={password}
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={(e)=>{}}
          >
            {state==='Sign-Up' ? 'Create account' : 'Login'}
          </button>
        </form>
        <button>
        {
          state==='Sign-Up' ?
          <div>
          <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a onClick={()=>{setState('Login')}} href="#" className="text-blue-600 hover:underline">Login</a>
        </p>
        </div> 
        : <div>
          <p className="mt-4 text-center text-sm text-gray-600">
          Dont have an account? <a onClick={()=>{setState('Sign-Up')}} href="#" className="text-blue-600 hover:underline">Sign-Up</a>
          </p>
        </div>
        }
        </button>
        
      </div>
    </div>
  );
};

export default Login;
