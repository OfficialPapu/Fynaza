"use client";
import React from 'react'
import FeaturedCategories from '@/Components/(Website)/Home/FCategory'
import ImageSlider from '@/Components/(Website)/Home/ImageSlider'
import { SingleProductDisplay } from '@/Components/(Website)/Home/Product-Slider-1'
import ValidateToken from "@/Components/HOC/ValidateToken"
const page = () => {
  return (
    <div>
      <ImageSlider />
      <FeaturedCategories />
      <SingleProductDisplay />
    </div>
  )
}

export default ValidateToken(page)
