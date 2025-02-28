import React,{useEffect, useState} from 'react'
import { createContext } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';


export const AppContext=createContext();

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const[doctors,setDoctors]=useState([]);
    const [token,setToken]=useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const[userData,setUserData]=useState({});
    

    const currencySymbol='$';

    const getDoctorsData=async()=>{
      try{
        console.log("getDoctorsData")
          const {data} = await axios.get(backendUrl+'api/doctor/list')
          if(data.success){
            setDoctors(data.doctors);
            toast.success(data.message);
          }
          else{
            toast.error(data.message);
          }
      }
      catch(err){
        
        toast.error(err.message);
      }
    }

    const loadUserProfile=async()=>{
      try{
        const {data}=await axios.get(backendUrl+'api/user/get-profile',{headers:{token}});
        if(data.success){
          setUserData(data.userData);
         
        }
        else{
          toast.error(data.message);
        }

      }
      catch(err){
        console.log(err);
        toast.error(err.message);
      }
    }

    const value={
      doctors,currencySymbol,
      token,userData,backendUrl,setToken,setUserData,getDoctorsData,loadUserProfile
  }


    

   

    useEffect(()=>{
      console.log(backendUrl)
      console.log('hi')
        getDoctorsData();
    },[])

    useEffect(()=>{
      if(token){
        loadUserProfile();
      }
      else{
        setUserData({});
      }
    },[token])

  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider