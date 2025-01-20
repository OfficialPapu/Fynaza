"use client"
import React from 'react'
import { useParams } from 'next/navigation';

const page = () => {
  const {subCategory} = useParams();
  return (
    <div>
     HI :{subCategory}
    </div>
  )
}

export default page
