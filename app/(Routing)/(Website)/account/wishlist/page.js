import Wishlist from '@/Components/(Website)/Account/Wishlist'
import React from 'react'
const initialWishlistItems = [
    { id: 1, name: "Premium Headphones", price: 10, quantity: 1, image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg" },
    { id: 2, name: "Wireless Mouse", price: 10, quantity: 1, image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg" },
    { id: 3, name: "Mechanical Keyboard", price: 10, quantity: 1, image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg" }
]
const page = () => {
  return (
    <div>
      <Wishlist initialWishlistItems={initialWishlistItems}/>
    </div>
  )
}

export default page
