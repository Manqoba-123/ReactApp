import React from 'react'
import  {FcGoogle} from 'react-icons/fc'

export default function Google() {
  return (
    <button className='flex items-center justify-center w-full  bg-red-400 text-white px-7 py-3 
    text-sm font-medium uppercase rounded shadow-md hover:bg-red-800 
    transtion duration-200 ease-in-out hover:shadow-lg active:bg-red-900' 
     type='submit'>
         <FcGoogle className='mr-2 text-2xl bg-white rounded-full'/> Continue with google
    </button> 
  )
}
