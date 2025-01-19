import FeaturedCategories from '@/Components/Home/FCategory'
import ImageSlider from '@/Components/Home/ImageSlider'
import { SingleProductDisplay } from '@/Components/Home/Product-Slider-1'
import React from 'react'

const page = () => {
  return (
    <div>
      <ImageSlider/>
      <FeaturedCategories/>
      <SingleProductDisplay/>
    </div>
  )
}

export default page
