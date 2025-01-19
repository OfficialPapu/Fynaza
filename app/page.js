import FeaturedCategories from '@/Components/Home/Featured Categories'
import ImageSlider from '@/Components/Home/ImageSlider'
import { SingleProductDisplay } from '@/Components/Product/Product'
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
