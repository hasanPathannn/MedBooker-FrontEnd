import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { AppContext } from "../Context/AppContext";
import {toast} from 'react-toastify';
import axios from "axios";

const MyProfile = () => {
  const [isEdit,setIsEdit]=useState(false);
  const {token,userData,setUserData,backendUrl,loadUserProfile}=useContext(AppContext)
  
  const handleSave=async()=>{
    try{
      setIsEdit(false);
      const formData=new FormData();
      formData.append('name',userData.name);
      formData.append('address',userData.address);
      formData.append('phone',userData.phone);
      formData.append('image',userData.image);
      formData.append('gender',userData.gender);
      formData.append('dob',userData.dob);

      const {data}=await axios.post(backendUrl+'api/user/update-profile',formData,{headers:{token}});

      if(data.success){
        console.log(userData);
        toast.success(data.message);
        loadUserProfile();
      }
      else{
        console.log(data.message)
        toast.error(data.message);
      }

    }catch(err){
      console.log(err);

    }
  }


  return userData && (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-4">
          <div className="relative">
            <img
              src={userData.image ? userData.image : assets.profile_pic}
              alt="Profile"
              className="h-24 w-24 rounded-full border "
            />
            <input type="file" placeholder="Edit" onChange={(e)=>(setUserData(prev=>({...prev, image:e.target.files[0]})))}/>
          </div>
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            {
              isEdit ?  
              <input className="text-2xl font-semibold text-gray-800"
                placeholder="Enter Name"
                type="name"
                value={userData.name}
                onChange={(e)=>(setUserData(prev=>({...prev, name:e.target.value})))}

              ></input>
              :
              <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
            }
            
          </div>
        </div>
        
        <hr className="my-4" />

        <div>
          <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
          <p><strong>Email:</strong> 
        
              <input className="w-3/4"
                placeholder="Enter Email"
                type="email"
                value={userData.email}
              ></input>
         </p>     

          <p><strong>Phone:</strong> { 
          isEdit ?  
              <input className="w-3/4"
                placeholder=""
                value={userData.phone}
                onChange={(e)=>(setUserData(prev=>({...prev, phone:e.target.value})))}

              ></input>
              : userData.phone }</p>

          <p><strong>Address:</strong> { 
          isEdit ?  
              <input className="w-3/4"
                placeholder=""
                value={userData.address}
                onChange={(e)=>(setUserData(prev=>({...prev, address:e.target.value})))}

              ></input>
              : userData.address }</p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
          <p><strong>Gender:</strong> {
            isEdit ?  
            <select value={userData.gender} onChange={(e)=>setUserData((prev)=>({...prev,gender:e.target.value}))}>
              <option value="">Select</option>
              <option value="Male"> Male</option>
              <option value="Female">Female</option>
            </select>
            :
            (userData.gender)

          }</p>
          <p><strong>Birthday:</strong> {

              isEdit ? 
              <input type="date" value={userData.dob} onChange={(e)=>setUserData(prev=>({...prev,dob:e.target.value}))}   />
              :
              (userData.dob)
          }
         </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="w-full sm:w-auto rounded-lg border border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-200"onClick={()=>setIsEdit(true)}>Edit</button>
          <button className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={()=>handleSave() }>Save Information</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
