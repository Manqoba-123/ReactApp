import React from 'react'
import  {FcGoogle} from 'react-icons/fc'
import { Auth } from 'firebase/auth'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';

export default function Google() {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if(!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email:user.email,
          timestamp: serverTimestamp(),
        });
        
      }
      toast.success("Well done you have signed up");
      navigate('/');
    } catch (error) {
      toast.error("Couldn't authorize with google")
    }
  }
  return (
    <button type='button' onClick={onGoogleClick} 
     className='flex items-center justify-center w-full  bg-red-400 text-white px-7 py-3 
    text-sm font-medium uppercase rounded shadow-md hover:bg-red-800 
    transtion duration-200 ease-in-out hover:shadow-lg active:bg-red-900' 
     >
         <FcGoogle className='mr-2 text-2xl bg-white rounded-full'/> Continue with google
    </button> 
  )
}
