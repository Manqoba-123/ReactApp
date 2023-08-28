import React, { useEffect } from 'react'
import {collection, getDoc, getDocs, limit, orderBy, query, where} from 'firebase/firestore'
import {db} from '../firebase'
import Slider from '../components/Slider'
import Spinner from '../components/Spinner'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from '../components/ListingItem'

export default function Home() {
  //for offers
  const [offerListings, setOfferListings] = useState(null);
  useEffect(()=> {
    async function fetchListings(){
      try {
        // getting the reference
        const listingsRef = collection(db, "listings");
        //creating the query
        const q = query(listingsRef, where("offer", "==", true),
        orderBy("timestamp", "desc"), limit(5));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  //for rent
  const [rentListings, setRentListings] = useState(null);
  useEffect(()=> {
    async function fetchListings(){
      try {
        // getting the reference
        const listingsRef = collection(db, "listings");
        //creating the query
        const q = query(listingsRef, where("type", "==", "rent"),
        orderBy("timestamp", "desc"), limit(5));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  //for sale
  const [saleListings, setSaleListings] = useState(null);
  useEffect(()=> {
    async function fetchListings(){
      try {
        // getting the reference
        const listingsRef = collection(db, "listings");
        //creating the query
        const q = query(listingsRef, where("type", "==", "sale"),
        orderBy("timestamp", "desc"), limit(5));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  return (
    <div>
      <Slider />
      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        {offerListings && offerListings.length > 0
        && (
          <div className='m-2 mb-6'>
            <h2 className='text-2xl font-semibold px-3'>Recent Offers</h2>
            <Link to='/offers'>
              <p className='px-3 text-sm text-blue-400 hover:text-blue-800'>
                Show more offers</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-4'>
              {offerListings.map((listing)=>(
                <ListingItem key={listing.id}
                listing={listing.data} id={listing.id}/>
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0
        && (
          <div className='m-2 mb-6'>
            <h2 className='text-2xl font-semibold px-3'>Place to rent</h2>
            <Link to='/category/rent'>
              <p className='px-3 text-sm text-blue-400 hover:text-blue-800'>
                Show more place to rent</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-4'>
              {rentListings.map((listing)=>(
                <ListingItem key={listing.id}
                listing={listing.data} id={listing.id}/>
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0
        && (
          <div className='m-2 mb-6'>
            <h2 className='text-2xl font-semibold px-3'>Place to buy</h2>
            <Link to='/category/sale'>
              <p className='px-3 text-sm text-blue-400 hover:text-blue-800'>
                Show more place to buy</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-4'>
              {saleListings.map((listing)=>(
                <ListingItem key={listing.id}
                listing={listing.data} id={listing.id}/>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
