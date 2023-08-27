import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectFade, Autoplay, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css/bundle'
import {AiOutlineShareAlt} from 'react-icons/ai'
import {SiGooglemaps} from 'react-icons/si'
import {FaBed, FaBath, FaParking, FaChair} from 'react-icons/fa'

export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLink, setShareLink] = useState(false);

    useEffect(()=>{
        async function fetchListing(){
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                setListing(docSnap.data());
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.listingId]);

    if(loading){
        return <Spinner />;
    }
  return (
    <main>
       <Swiper slidesPerView={1} modules={[EffectFade, Navigation, Pagination,  Autoplay]}
       navigation pagination={{type: "progressbar"}}
       effect='fade' autoplay={{delay: 3000}}>
        {listing.imgUrls.map((url, index)=>(
            <SwiperSlide key={index}>
                <div className='relative w-full overflow-hidden h-[300px]' style={{background:`url(${listing.imgUrls
                [index]}) center no-repeat`, backgroundSize:'cover'}}></div>
            </SwiperSlide>
        ))}
       </Swiper>
       <div className='fixed top-[13%] right-[3%] z-10 cursor-pointer
       bg-red-300 rounded-full border-2 border-blue-400 w-8 h-8
       flex justify-center items-center'
       onClick={()=>{
        navigator.clipboard.writeText(window.location.href);
        setShareLink(true);
        setTimeout(()=>{
            setShareLink(false);
        }, 2000);
       }}>
        <AiOutlineShareAlt className='text-xl text-slate-800 hover:scale-150 duration-150' />
       </div>
       {shareLink && (
        <p className='fixed top-[18%] z-10 bg-red-300
        right-[5%] font-semibold rounded-tl-md rounded-br-md
        border-2 border-blue-400 p-2 '>Link Copied</p>
       )}

       <div className='m-4 flex flex-col md:flex-row max-w-6xl
       lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5'>
        <div className='w-full h-[200px] lg-[400px]
        rounded-lg'>
            <p className='text-2xl font-bold mb-3 text-blue-700
            '>
                {listing.name} - R {listing.offer ?
                listing.discountedPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : listing.regularPrice.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              {listing.type === "rent" ? "/ month" : ""}
            </p>
            <p className='flex items-center mt-6 mb-3 font-semibold'>
                <SiGooglemaps className='text-green-700 mr-2' />
                {listing.address}
            </p>
            <div className='flex justify-start items-center
            space-x-4 w-[75%]'>
                <p className='bg-red-400 w-full max-w-[200px]
                rounded-md p-1 text-white text-center font-semibold
                shadow-md'>
                    {listing.type === 'rent' ? "Rent" : "Sale"}
                </p>
                {listing.offer &&(
                    <p className='w-full bg-green-500 rounded-md p-1 max-w-[200px]
                    font-semibold text-center shadow-md text-white'>
                        R {+listing.regularPrice - +listing.discountedPrice} discount
                    </p>
                )}
            </div>
            <p className='mt-3 mb-3'>
                <span className='font-semibold'>Description - </span>
                {listing.description}
            </p>
            <ul className='flex space-x-2 lg:space-x-10 text-sm
            font-semibold'>
                <li className='flex items-center whitespace-nowrap'>
                    <FaBed className='text-lg mr-1'/>
                    {+listing.bedrooms > 1 ?
                    `${listing.bedrooms} Beds` : '1 Bed'}
                </li>
                <li className='flex items-center whitespace-nowrap'>
                    <FaBath className='text-lg mr-1'/>
                    {+listing.bathrooms > 1 ?
                    `${listing.bathrooms} Baths` : '1 Bath'}
                </li>
                <li className='flex items-center whitespace-nowrap'>
                    <FaParking className='text-lg mr-1'/>
                    {+listing.parking ?
                    'Parking' : 'No parking'}
                </li>
                <li className='flex items-center whitespace-nowrap'>
                    <FaChair className='text-lg mr-1'/>
                    {+listing.furnished ?
                    'Furnished' : 'Not furnished'}
                </li>
            </ul>
        </div>
        <div className='bg-pink-800 w-full h-[200px] lg-[400px]
        rounded-lg z-10 overflow-x-hidden'>Map</div>
       </div>
    </main>
  )
}
