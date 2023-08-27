import React from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import {MdEdit, MdLocationOn} from 'react-icons/md'
import {FaTrash} from 'react-icons/fa'
import {MdModeEdit} from 'react-icons/md'

export default function ListingItem({listing, id, onDelete, onEdit}) {
  return (
     <li className='relative bg-white flex flex-col justify-between
     items-center shadow-md hover:shadow-xl rounded-md
     overflow-hidden transition-shadow duration-150 m-[10px]'>
      <Link className='contents' to={`/category/${listing.type}/${id}`}>
        <img
         className='h-[170px] w-full object-cover hover:scale-105 
         transition-scale duration-200
         ease-in rounded-t-lg'
         loading='lazy'
         src={listing.imgUrls[0]} alt=''/>
        <Moment className='absolute top-0 bg-blue-400
         text-white uppercase text-sm font-semibold rounded-bl-lg rounded-tr-lg
         px-2 py-1 shadow-lg'
         fromNow>
          {listing.timestamp?.toDate()}
        </Moment>
        <div className='w-full p-[10px]'>
          <div className='flex items-center space-x-1'>
            <MdLocationOn className='h-4 w-4 text-green-500'/>
            <p className='font-semibold text-sm mb-[2px]
            text-gray-600 truncate'>{listing.address}</p>
          </div>
          <p className='font-semibold text-xl m-0 truncate'>{listing.name}</p>
          <p className='font-semibold mt-2 text-lg text-blue-400'>R
            {listing.offer 
            ? listing.discountedPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            :listing.regularPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-2 space-x-3">
            <div className="flex items-center  space-x-1">
              <p className='font-bold text-sm'>{listing.bedrooms > 1 ? `${listing.
              bedrooms} Beds` : '1 Bed'} </p>
            </div>
            <div className="">
              <p className='font-bold text-sm'>{listing.bathrooms > 1 ? `${listing.
              bathrooms} Baths` : '1 Bath'}</p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash className='absolute bottom-2 right-2 text-red-800
        cursor-pointer h-[14px] hover:scale-150 transition-scale duration-150'
        onClick={() => onDelete(listing.id)}/> 
      )}
      {onEdit && (
        <MdEdit className='absolute bottom-2 right-8
        cursor-pointer h-4 hover:scale-150 transition-scale duration-150'
        onClick={() => onEdit(listing.id)}/> 
      )}
    </li>
)
}
