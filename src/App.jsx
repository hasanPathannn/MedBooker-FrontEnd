import React from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Doctors from './Pages/Doctors'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import MyAppointments from './Pages/MyAppointments'
import Myprofile from './Pages/Myprofile'
import About from './Pages/About'
import Appointment from './Pages/Appointment'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'
import { ToastContainer} from 'react-toastify';



export const App = () => {
  return (
   <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:speciality' element={<Doctors/>}/>  
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/> 
      <Route path='/my-appointments' element={<MyAppointments/>}/> 
      <Route path='/my-profile' element={<Myprofile/>}/> 
      <Route path='/about' element={<About/>}/> 
      <Route path='/appointment/:docId' element={<Appointment/>}/> 
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
