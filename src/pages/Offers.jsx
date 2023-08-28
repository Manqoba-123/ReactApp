import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

export default function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lasFetchListing, setLasFetchListing] = useState(null);

  useEffect(()=>{
    async function fetchListings(){
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, where("offer", "==", true),
        orderBy("timestamp", "desc"), limit(5));
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLasFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("cannot fetch listing");
      }
    }
    fetchListings();
  }, []);

  async function onFetchMore(){
    try {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, where("offer", "==", true),
      orderBy("timestamp", "desc"), startAfter(lasFetchListing), limit(3));
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLasFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings((prevState)=> [
        ...prevState, ...listings
      ]);
      setLoading(false);
    } catch (error) {
      toast.error("cannot fetch listing");
    }
  }
  return (
    <div className='mx-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center font-semibold mb-6'>Offers</h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3
            xl:grid-cols-4 2xl:grid-cols-5'>
              {listings.map((listing)=>(
                <ListingItem  key={listing.id}
                id={listing.id}
                listing={listing.data}/>
              ))}
            </ul>
          </main>
          {lasFetchListing && (
            <div className='flex justify-center
            items-center'>
              <button className='bg-yellow-200 
              px-3 py-1.5 text-slate-600
               rounded mb-6 mt-6 hover:scale-125 
               transition-scale duration-150 ease-in-out uppercase '
               onClick={onFetchMore}>Load more</button>
            </div>
          )}
        </>
      ) : <p>No Offers at the moment</p>}
    </div>
  )
}
