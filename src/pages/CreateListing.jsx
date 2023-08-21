import React, { useState } from 'react'

export default function CreateListing() {
    //Hook
    const [formData, setFormData] = useState({
        type: "rent",
        name:"",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: false,
        regularPrice:0,
        discountedPrice: 0,

    });
    //Destructuring the hook
    const {type, name, bedrooms,
         bathrooms, parking, furnished,
          address, description, offer,
          regularPrice, discountedPrice} = formData;
    function onChange(){}
  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center mt-6 font-bold'>
            Create Listing
        </h1>
        <form>
            <p className='text-lg mt-6 font-semibold'>
                Sell / Rent
            </p>
            <div className='flex'>
                <button type='button' id='type' value='sale' onClick={onChange}
                 className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md
                 rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                 transition duration-150 ease-in-out w-full ${
                    type === "rent" ? "bg-white text-black" : "bg-green-500 text-white"
                 }`}>
                    Sell
                </button>
                <button type='button' id='type' value='rent' onClick={onChange}
                 className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md
                 rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                 transition duration-150 ease-in-out w-full ${
                    type === "sale" ? "bg-white text-black" : "bg-green-500 text-white"
                 }`}>
                    rent
                </button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Name</p>
            <input type='text' id='name' value={name}
             onChange={onChange}
             placeholder='Property Name' maxLength='32'
             minLength='10' required
              className='w-full px-4 py-2 text-xl text-gray-600 border-yellow-700 
              transition duration-150 ease-in-out focus:text-slate-700 
              focus:bg-white focus:border-red-500 rounded mb-6'/>
              <div className='flex space-x-6 mb-6'>
                <div>
                    <p className='text-lg font-semibold'>Beds</p>
                    <input type='number' id='bedrooms' value={bedrooms}
                    onChange={onchange} required
                    min='1' 
                    max='50' 
                    className='px-4 py-2 text-lg text-gray-700 bg-white border-yellow-700
                    transition duration-150 ease-in-out focus:text-slate-700 
              focus:bg-white focus:border-red-500 rounded mb-6 w-full text-center'/>
                </div>
                <div>
                    <p className='text-lg font-semibold'>Baths</p>
                    <input type='number' id='bathrooms' value={bathrooms}
                    onChange={onchange} required
                    min='1' 
                    max='50' 
                    className='px-4 py-2 text-lg text-gray-700 bg-white border-yellow-700
                    transition duration-150 ease-in-out focus:text-slate-700 
              focus:bg-white focus:border-red-500 rounded mb-6 w-full text-center'/>
                </div>
              </div>
              <p className='text-lg mt-6 font-semibold'>
                Parking Spot
            </p>
            <div className='flex'>
                <button type='button' id='parking' value={true} onClick={onChange}
                 className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md
                 rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                 transition duration-150 ease-in-out w-full ${
                    !parking ? "bg-white text-black" : "bg-green-500 text-white"
                 }`}>
                    Yes
                </button>
                <button type='button' id='parking' value={false} onClick={onChange}
                 className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md
                 rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                 transition duration-150 ease-in-out w-full ${
                    parking ? "bg-white text-black" : "bg-green-500 text-white"
                 }`}>
                    No
                </button>
            </div>
            <p className='text-lg mt-6 font-semibold'>
                Furnished
            </p>
            <div className='flex'>
                <button type='button' id='furnished' value={true} onClick={onChange}
                 className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md
                 rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                 transition duration-150 ease-in-out w-full ${
                    !furnished ? "bg-white text-black" : "bg-green-500 text-white"
                 }`}>
                    Yes
                </button>
                <button type='button' id='furnished' value={false} onClick={onChange}
                 className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md
                 rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                 transition duration-150 ease-in-out w-full ${
                    furnished ? "bg-white text-black" : "bg-green-500 text-white"
                 }`}>
                    no
                </button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Address</p>
            <textarea type='text' id='address' value={address}
             onChange={onChange}
             placeholder='Address' 
              className='w-full px-4 py-2 text-xl text-gray-600 border-yellow-700 
              transition duration-150 ease-in-out focus:text-slate-700 
              focus:bg-white focus:border-red-500 rounded mb-6'/>
            <p className='text-lg font-semibold'>Description</p>
            <textarea type='text' id='description' value={description}
             onChange={onChange}
             placeholder='Description' 
              className='w-full px-4 py-2 text-xl text-gray-600 border-yellow-700 
              transition duration-150 ease-in-out focus:text-slate-700 
              focus:bg-white focus:border-red-500 rounded mb-6'/>
               <p className='text-lg font-semibold'>
                Offer
            </p>
            <div className='flex'>
                <button type='button' id='offer' value={true} onClick={onChange}
                 className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md
                 rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                 transition duration-150 ease-in-out w-full ${
                    !offer ? "bg-white text-black" : "bg-green-500 text-white"
                 }`}>
                    Yes
                </button>
                <button type='button' id='furnished' value={false} onClick={onChange}
                 className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md
                 rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
                 transition duration-150 ease-in-out w-full ${
                    offer ? "bg-white text-black" : "bg-green-500 text-white"
                 }`}>
                    no
                </button>
            </div>
            <div className='flex items-center mb-6'>
                <div className=''>
                    <p className='text-lg font-semibold mt-6'>Regular Price</p>
                    <div className='flex w-full justify-center items-center space-x-6 '>
                        <input type='number' id='regularPrice' value={regularPrice}
                        onChange={onchange} required
                        min='50' 
                        max='500000000' 
                        className='px-4 py-2 text-lg text-gray-700 bg-white border-yellow-700
                        transition duration-150 ease-in-out focus:text-slate-700 
                  focus:bg-white focus:border-red-500 rounded w-full text-center' />
                  {type === 'rent' && (
                        <div className=''>
                            <p className='w-full text-md whitespace-nowrap'>R / Month</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            {offer && (
                <div className='flex items-center mb-6'>
                <div className=''>
                    <p className='text-lg font-semibold mt-6'>Discounted Price</p>
                    <div className='flex w-full justify-center items-center space-x-6 '>
                        <input type='number' id='discountedPrice' value={discountedPrice}
                        onChange={onchange} required={offer}
                        min='50' 
                        max='500000000' 
                        className='px-4 py-2 text-lg text-gray-700 bg-white border-yellow-700
                        transition duration-150 ease-in-out focus:text-slate-700 
                  focus:bg-white focus:border-red-500 rounded w-full text-center' />
                  {type === 'rent' && (
                        <div className=''>
                            <p className='w-full text-md whitespace-nowrap'>R / Month</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            )}
            <div className='mb-6'>
                <p className='text-lg font-semibold'>Images</p>
                <p className='text-slate-500'>The first image will be the cover (max 6)</p>
                <input type='file' id='images' onChange={onChange}
                accept='.jpeg,.png,.jpg' multiple required
                className='w-full px-3 py-1.5 text-slate-600
                bg-white border border-yellow-600 rounded
                transition duration-150 ease-in-out focus:bg-slate-200 focus:border-slate-500' />
            </div>
            <button type="submit" className='w-full mb-6 px-7 py-3 bg-blue-400
             font-medium text-white text-sm uppercase
             rounded shadow-md hover:bg-blue-500 hover:shadow-lg
             focus:bg-blue-800 active:bg-blue-800
             focus:shadow-lg active:shadow-lg transition
             duration-150 ease-in-out'>Create listing</button>
        </form>
    </main>
  )
}
