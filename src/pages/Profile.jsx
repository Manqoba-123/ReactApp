import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const auth  = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name, email} = formData;

  function onLogout() {
    auth.signOut();
    navigate('/');
  }
  return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
          {/* Name input */}

          <input type='text' id='name' value={name}
          disabled className='w-full px-4 py-2 text-xl text-slate-800
           bg-white border-slate-600 rounded transtion ease-in-out mb-6'/>
          {/* Email input */}

          <input type='email' id='email' value={email}
          disabled className='w-full px-4 py-2 text-xl text-slate-800
           bg-white border-slate-600 rounded transtion ease-in-out mb-6'/>

           <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center'>Do you want to change your profile details?
            <span className='text-red-700 hover:text-blue-800 cursor-pointer 
            transtion ease-in-out duration-200 ml-1'>Edit</span>
            </p>
            <p onClick={onLogout} className='text-blue-500 hover:text-red-400 
            transtion ease-in-out duration-200 cursor-pointer'>Sign out</p>
           </div>
        </form>
      </div>
    </section>
    </>
  )
}
