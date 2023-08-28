
import React, { useEffect } from 'react'
import {collection, getDoc, getDocs, limit, orderBy, query} from 'firebase/firestore'
import {db} from '../firebase'
import Spinner from '../components/Spinner'
import { useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectFade, Autoplay, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css/bundle'
import { useNavigate } from 'react-router-dom'


export default function Slider() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
      async function fetchListings(){
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, orderBy("timestamp", "desc"), limit(10));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        });
        setListings(listings);
        setLoading(false);
      }
      fetchListings();
    }, []);
  
    if(loading){
      return <Spinner />;
    }
    if(listings.length === 0){
      return <></>
    }
  return (
    listings && (
    <>
        <Swiper slidesPerView={1} modules={[EffectFade, Navigation, Pagination,  Autoplay]}
       navigation pagination={{type: "progressbar"}}
       effect='fade' autoplay={{delay: 3000}}>
            {listings.map(({data, id})=> (
                <SwiperSlide key={id} onClick={()=>navigate(
                    `/category/${data.type}/${id}`
                )}>
                    <div style={{background:`url(
                        ${data.imgUrls[0]} ) center, no-repeat`, backgroundSize:'cover'}}
                    className='relative w-full h-[300px] overflow-hidden'>

                    </div>
                    <p className='text-[#f1faee] absolute left-1
                    top-3 bg-slate-700 font-medium max-w-[90%] shadow-lg rounded-tr-2xl
                    rounded-bl-2xl text-center text-sm px-2'>{data.name}</p>
                    <p className='text-[#f1faee] absolute right-1
                    bottom-1 bg-red-700 font-semibold max-w-[90%] shadow-lg rounded-tr-2xl
                    rounded-bl-2xl text-center text-sm px-2'>
                        R{data.discountedPrice ?? data.regularPrice}
                        {data.type == "rent" && "/ Month"}</p>
                </SwiperSlide>
            ))}
       </Swiper>
    </>
    )
  )
}
