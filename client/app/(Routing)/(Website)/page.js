"use client";
import React, { useEffect } from 'react'
import FeaturedCategories from '@/Components/(Website)/Home/FCategory'
import ImageSlider from '@/Components/(Website)/Home/ImageSlider'
import { SingleProductDisplay } from '@/Components/(Website)/Home/Product-Slider-1'
const page = () => {
  return (
    <div>
      <ImageSlider />
      <FeaturedCategories />
      <SingleProductDisplay />
    </div>
  )
}

export default page
