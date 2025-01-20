"use client"
import React from 'react'
import { useParams } from 'next/navigation'

const Page = () => {
  const { subCategory } = useParams();  
  return (
    <div>
      Sub Category : {subCategory}
    </div>
  )
}

export default Page;
