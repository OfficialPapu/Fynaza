import React from 'react'
import SubCategory from '@/Components/Website/Category/SubCategory'
const products = [
  {
    id: 1,
    title: "Wireless Noise-Cancelling Headphones",
    image: "https://justopjewelry.com/wp-content/uploads/2025/01/9112097-9112098-9112099-9112102_05.jpg",
    price: 199.99,
    originalPrice: 299.99,
    category: "Men's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    id: 2,
    title: "Smart Fitness Tracker with Heart Rate Monitor",
    image: "https://justopjewelry.com/wp-content/uploads/2025/01/SH0010030%E7%99%BD%E5%BA%95%E5%9B%BE-1340X1785-e1736758839743.jpg",
    price: 89.99,
    originalPrice: 89.99,
    category: "Men's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    id: 3,
    title: "4K Ultra HD Smart TV 55-inch",
    image: "https://justopjewelry.com/wp-content/uploads/2024/12/SH0010027%E7%99%BD%E5%BA%95-1340X1785-e1735792153763.jpg",
    price: 599.99,
    originalPrice: 799.99,
    category: "Men's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    id: 4,
    title: "Portable Bluetooth Speaker Waterproof",
    image: "https://justopjewelry.com/wp-content/uploads/2024/12/9111974-9111966-9111982-9111978_01.jpg",
    price: 79.99,
    originalPrice: 99.99,
    category: "Men's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    id: 5,
    title: "Digital SLR Camera with 18-55mm Lens",
    image: "https://justopjewelry.com/wp-content/uploads/2024/12/SH0010062_01.jpg",
    price: 649.99,
    originalPrice: 799.99,
    category: "Women's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    id: 6,
    title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    price: 1199.99,
    originalPrice: 1499.99,
    category: "Women's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    id: 7,
    title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    price: 1199.99,
    originalPrice: 1499.99,
    category: "Women's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    id: 8,
    title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    price: 1199.99,
    originalPrice: 1499.99,
    category: "Women's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    id: 9,
    title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    price: 1199.99,
    originalPrice: 1499.99,
    category: "Women's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    id: 10,
    title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    price: 1199.99,
    originalPrice: 1499.99,
    category: "Men's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
]
const categories = ["Men's Fashion", "Women's Fashion"];

const page = () => {
  return (
    <div>
      <SubCategory products={products} categories={categories}/>
    </div>
  )
}

export default page
