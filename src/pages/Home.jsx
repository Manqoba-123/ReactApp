import React, { useEffect } from 'react'
import {collection, getDoc, getDocs, limit, orderBy, query} from 'firebase/firestore'
import {db} from '../firebase'
import Slider from '../components/Slider'
import Spinner from '../components/Spinner'
import { useState } from 'react'

export default function Home() {

  return (
    <div>
      <Slider />
    </div>
  )
}
