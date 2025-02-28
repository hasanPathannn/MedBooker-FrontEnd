import React, { useContext, useEffect, useState} from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const [appointments, setAppointments]=useState();
  const {backendUrl,userData,token}=useContext(AppContext);

  const userAppointments=async()=>{
    const userId=userData._id;
    
    const {data}= await axios.post(backendUrl+'api/user/my-appointments',{userId:userId},{headers:{token}});
    if(data.success){
      setAppointments(data.userAppointmentData);
      console.log(appointments);
    }
    else{
      console.log(data.message);
    }
  }

  const cancelAppointment=async(id)=>{
    if(!id){
      console.log('id Not found');
    }

    const {data}=await axios.post(backendUrl+'api/user/cancel-appointment',{id:id});
    if(data.success){
      toast.success('Appointment Cancelled');
      userAppointments();

    }
    else{
      console.log(data.message);
      toast.error(data.message);
    }
  }

  useEffect(()=>{
    userAppointments();
  },[userData])
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">My Appointments</h2>
      {appointments && appointments.map((appointment, index) => (
        <div key={index} className="mt-4 flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <img
              src={appointment.docData.image}
              alt="Doctor"
              className="h-30 w-24 border"
            />
            <div>
              <h3 className="text-lg font-semibold">{appointment.docData.name}</h3>
              <p className="text-gray-600">{appointment.docData.speciality}</p>
              <p className="text-gray-700 font-semibold">Address:</p>
              <p className="text-gray-600">{appointment.docData.address}</p>
              <p className="text-gray-700 font-semibold">Date & Time:</p>
              <p className="text-gray-600">{appointment.slotDate} | {appointment.slotTime}</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col space-y-2">
            {appointment.payment === false ? (
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Pay here</button>
            ) : appointment.isCompleted === true ? (
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white" disabled>Paid</button>
            ) : null}
            <button onClick={()=>cancelAppointment(appointment._id)} className="rounded-lg border border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-200">Cancel appointment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
