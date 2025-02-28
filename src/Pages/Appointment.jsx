import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../Component/RelatedDoctors';
import {toast} from "react-toastify"
import axios from 'axios';

const Appointment = () => {
  const navigate=useNavigate();
  const {docId}=useParams();
  const {doctors,currencySymbol,backendUrl, token,getDoctorsData}=useContext(AppContext);
  
  const [docInfo,setDocInfo]=useState(null);
  const [docSlot,setDocSlot]=useState([]);
  const [slotIndex,setSlotIndex]=useState();
  const [slotTime,setSlotTime]=useState();

  const dayofWeeks=['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];

  const fetchDocInfo= async()=>{
    const docInfo=doctors.find(doc=>doc._id===docId)
    setDocInfo(docInfo);
    console.log(docInfo);
  }

  const getAvailabeSlot=async()=>{
    setDocSlot([])
    const today=new Date();

    for(let i=0;i<7;i++){
      let currentDate=new Date(today);
      currentDate.setDate(today.getDate()+i);

      let endTime=new Date();
      endTime.setDate(today.getDate()+i);
      endTime.setHours(21,0,0,0);
      
      if(currentDate.getDate()===today.getDate()){
        currentDate.setHours(currentDate.getHours() >10 ? currentDate.getHours()+1: 10);
        currentDate.setMinutes(currentDate.getMinutes() <30 ? 30 : 0);
      }
      else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      
      let timeSlots=[];
      while(currentDate<endTime){
        let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'});
        
        let day=currentDate.getDate();
        let month=currentDate.getMonth()+1;
        let year=currentDate.getFullYear();

        const slotDate=day+"_"+month+"_"+year;
        const slotTime=formattedTime;

        const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if(isSlotAvailable){
          timeSlots.push({
            dateTime:new Date(currentDate),
            time:formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
      setDocSlot(prev=>([...prev,timeSlots]));
    }

  }

  const bookAppointment =async()=>{
    if(!token){
      toast.warn("Logint to book Appointment")
      navigate('/login');
    }

    try{
        const date =docSlot[slotIndex][0].dateTime
        console.log(date)
        let day=date.getDate();
        let month=date.getMonth()+1;
        let year=date.getFullYear();

        const slotDate = day+"_"+month+"_" + year

        const {data}= await axios.post(backendUrl+'api/user/book-appointment',{docInfo,slotDate,slotTime} ,{headers:{token}})
      
        if(data.success){
          toast.success(data.message);
          getDoctorsData();
          navigate('/my-appointments');
        }
        else{
          toast.error(data.message);
          console.log(data.message);
        }

    }catch(err){
      toast.error(err.message);
        console.log("caugth");
    }

  }

  useEffect(()=>{
  fetchDocInfo();
    },[docId,doctors])

  useEffect(()=>{
    getAvailabeSlot();
    
  },[docInfo])

  useEffect(()=>{
    console.log(docSlot);
  },[docSlot])

  return docInfo && (
  <div>
    <div className='flex flex-col sm:flex-row gap-4'>
      {/* Doc details */}
      <div >
        <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt=""/>
      </div>

      <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt=""/> </p>
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p>{docInfo.degree} - {docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
        </div>

        <div>
          <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /> </p>
          <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
        </div>
        <p className='text-gray-500 font-medium mt-4'>
          Appointment fees: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
        </p>
      </div>
    </div>
    {/** Booking Slot */}
    <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
      <p>Booking Slot</p>
      <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {
          docSlot.length && docSlot.map((item,index)=>(

            item.length>0 && 

            <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ? 'bg-primary text-white': ''}`} key={index}>
                <p>{item[0] && dayofWeeks[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
            </div>
          ))

        }
      </div>

      <div className='flex item-center gap-3 w-full overflow-x-scroll mt-4'>
        {docSlot.length && docSlot[slotIndex] && docSlot[slotIndex].map((item,index)=>(
            <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}> {item.time}</p>
        ))}
      </div>


    <button onClick={()=>bookAppointment()} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full'>Book Appointment</button>
    </div>
    {/** Related Doctors */}
    <RelatedDoctors docInfo={docInfo} />
  </div>
  )
}

export default Appointment