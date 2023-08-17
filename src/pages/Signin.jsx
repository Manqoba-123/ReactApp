import React, { useState } from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import Google from "../components/Google"
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {email, password} = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if(userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error("Incorrect email or password");
    }
  }
  return (
    <section>
      <h1  className='text-3xl text-center mt-6 font-bold'>Sign in</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[70%] lg:w-[50%] mb-12 md:mb-6'>
         <img src='https://plus.unsplash.com/premium_photo-1669814666190-736a7a87fa78?ixlib=rb-4.0.3&
         ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9ja2VkfGVufDB8fDB8fHww&
          auto=format&fit=crop&w=1000&q=60'
          alt='locked' className='w-full rounded' />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
           <input type='email' id='email' value={email} 
           onChange={onChange}  placeholder='Email Address'
           className='w-full px-4 py-2 text-xl text-gray-700
           bg-white border-gray-400 rounded
           transition ease-in-out mb-6'/>
           <div className='relative mb-6'>
           <input type={showPassword ? 'text' : 'password'} id='password' value={password} 
           onChange={onChange}  placeholder='Password'
           className='w-full px-4 py-2 text-xl text-gray-700
           bg-white border-gray-400 rounded
           transition ease-in-out'/>
           {showPassword ? (
            <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={
              () => setShowPassword((prevState) => !prevState)
            }/>
          ) : <AiFillEye  className='absolute right-3 top-3 text-xl cursor-pointer' onClick={
            () => setShowPassword((prevState) => !prevState)
          }/>}
           {showPassword ? (
            <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={
              () => setShowPassword((prevState) => !prevState)
            }/>
          ) : <AiFillEye  className='absolute right-3 top-3 text-xl cursor-pointer' onClick={
            () => setShowPassword((prevState) => !prevState)
          }/>}
           </div>
           <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p className='mb-6'>Don't have account?
              <Link to='/sign-up' className='text-red-400 hover:text-red-600 transition duration-200 
              ease-in-out ml-1'>Sign up</Link>
            </p>
            <p>
              <Link to='/forgot-password' className='text-blue-400 hover:text-blue-900 transition duration-200
              ease-in-out'>Forgot Password?</Link>
            </p>
           </div>
           <button className='w-full bg-blue-400 text-white px-7 py-3 
          text-sm font-medium uppercase rounded shadow-md hover:bg-blue-800 
          transtion duration-200 ease-in-out hover:shadow-lg active:bg-blue-900' 
           type='submit'>Sign in</button>
           <div className='my-4 flex items-center before:border-t  before:flex-1  before:border-gray-900
           after:border-t after:flex-1  after:border-gray-900'>
            <p className='text-center font-semibold mx-4'>OR</p>
           </div>
           <Google />
          </form>
        </div>
      </div>
    </section>
  )
}
