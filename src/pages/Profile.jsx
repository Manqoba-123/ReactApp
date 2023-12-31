import { getAuth, updateProfile } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import {FcHome} from 'react-icons/fc'
import ListingItem from '../components/ListingItem';

export default function Profile() {
  const auth  = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name:auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name, email} = formData;

  function onLogout() {
    auth.signOut();
    navigate('/');
  }
  function onChange(e) {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit(e) {
    try {
      if(auth.currentUser.displayName !== name){
        //update display name in fire base authentication
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update the name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile changes were successfully")
    } catch (error) {
      toast.error("Profile changes were not successfully"); 
    }

  }
  useEffect(()=>{
    async function fetchUserListings(){
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef, 
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  async function onDelete(listingId){
    if(window.confirm("Confirm deleting?")){
      await deleteDoc(doc(db, 'listings', listingId));
      const updateListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updateListings);
      toast.success("Listings deleted");
    }
  }

  function onEdit(listingId){
    navigate(`/edit-listing/${listingId}`)
  }

  return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
          {/* Name input */}

          <input type='text' id='name' value={name}
          disabled={!changeDetails}
          onChange={onChange} 
          className={`w-full px-4 py-2 text-xl text-slate-800
           bg-white border-slate-600 rounded transition ease-in-out mb-6 ${changeDetails 
           && 'bg-red-200 focus:bg-red-200'}`}/>
          {/* Email input */}

          <input type='email' id='email' value={email}
          disabled={!changeDetails}
          onChange={onChange}
          className={`w-full px-4 py-2 text-xl text-slate-800
           bg-white border-slate-600 rounded transition ease-in-out mb-6 ${changeDetails && 'bg-red-200 focus-bg-red-200'}`}/>

           <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center'>Do you want to change your profile details?
            <span onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState);
            }}
            className='text-red-700 hover:text-blue-800 cursor-pointer 
            transition ease-in-out duration-200 ml-1'>
              {changeDetails ? "Confirm changes" : "edit"}
            </span>
            </p>
            <p onClick={onLogout} className='text-blue-500 hover:text-red-400 
            transition ease-in-out duration-200 cursor-pointer'>Sign out</p>
           </div>
        </form>
        <button type="submit" className='w-full bg-blue-500 text-white
         uppercase px-7 py-3 text-sm font-md rounded shadow-md hover:bg-blue-700
          transition duration-150 ease-in-out hover:shadow-lg
          active:bg-blue-900'>
          <Link to='/create-listing' className='flex justify-center
           items-center'>
            <FcHome className='mr-2 text-3xl bg-red-500 rounded-full p-1 border-2' />
            Sell or rent your home
          </Link>
        </button>
      </div>
    </section>
    <div className='max-w-6xl px-3 mt-6 mx-auto'>
      {!loading && listings.length > 0 && (
        <>
          <h2 className='text-2xl text-center font-semibold '>My Listings</h2>
          <ul className='sm:grid sm:grid-cols-2
          lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6'>
            {listings.map((listing)=>(
              <ListingItem 
                key={listing.id} 
                id={listing.id} 
                listing={listing.data}
                onDelete={()=>onDelete(listing.id)}
                onEdit={()=>onEdit(listing.id)}
              />
            )
            )}
          </ul>
        </>
      )}
    </div>
    </>
  )
}
