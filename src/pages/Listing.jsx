import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectFade, Autoplay, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css/bundle'
import {AiOutlineShareAlt} from 'react-icons/ai'

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
    </main>
  )
}