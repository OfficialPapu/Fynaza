import React from 'react'
import SubCategory from '@/Components/Website/Category/SubCategory'
const Products = [
  {
    ID: 1,
    Title: "Wireless Noise-Cancelling Headphones",
    ImageUrl: "https://justopjewelry.com/wp-content/uploads/2025/01/9112097-9112098-9112099-9112102_05.jpg",
    Price: 199.99,
    Discount: 10,
    Category: "Men's Fashion",
    SlugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    ID: 2,
    Title: "Smart Fitness Tracker with Heart Rate Monitor",
    ImageUrl: "https://justopjewelry.com/wp-content/uploads/2025/01/SH0010030%E7%99%BD%E5%BA%95%E5%9B%BE-1340X1785-e1736758839743.jpg",
    Price: 89.99,
    Discount: 10,
    Category: "Men's Fashion",
    SlugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    ID: 3,
    Title: "4K Ultra HD Smart TV 55-inch",
    ImageUrl: "https://justopjewelry.com/wp-content/uploads/2024/12/SH0010027%E7%99%BD%E5%BA%95-1340X1785-e1735792153763.jpg",
    Price: 599.99,
    Discount: 10,
    Category: "Men's Fashion",
    SlugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    ID: 4,
    Title: "Portable Bluetooth Speaker Waterproof",
    ImageUrl: "https://justopjewelry.com/wp-content/uploads/2024/12/9111974-9111966-9111982-9111978_01.jpg",
    Price: 79.99,
    Discount: 10,
    Category: "Men's Fashion",
    SlugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    ID: 5,
    Title: "Digital SLR Camera with 18-55mm Lens",
    ImageUrl: "https://justopjewelry.com/wp-content/uploads/2024/12/SH0010062_01.jpg",
    Price: 649.99,
    Discount: 10,
    Category: "Women's Fashion",
    SlugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    ID: 6,
    Title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    ImageUrl: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    Price: 1199.99,
    Discount: 10,
    Category: "Women's Fashion",
    SlugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    ID: 7,
    Title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    ImageUrl: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    Price: 1199.99,
    Discount: 10,
    Category: "Women's Fashion",
    SlugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    ID: 8,
    Title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    ImageUrl: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    Price: 1199.99,
    Discount: 10,
    Category: "Women's Fashion",
    SlugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    ID: 9,
    Title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    ImageUrl: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    Price: 1199.99,
    Discount: 10,
    Category: "Women's Fashion",
    SlugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    ID: 10,
    Title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    ImageUrl: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    Price: 1199.99,
    Discount: 10,
    Category: "Men's Fashion",
    SlugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
]
const Categories = ["Men's Fashion", "Women's Fashion"];

const page = () => {
  return (
    <div>
      <SubCategory Products={Products} Categories={Categories} />
    </div>
  )
}

export default page
