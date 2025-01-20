"use client"
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const { Category } = useParams();  
  return (
    <div>
      Category : {Category}
    </div>
  )
}

export default Page;
