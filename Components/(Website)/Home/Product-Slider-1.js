"use client"
import { ProductCard } from "@/Components/ui/ProductCard"
import axios from "axios";
import { useEffect, useState } from "react";
const product = [
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
    id: 6,
    title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    price: 1199.99,
    originalPrice: 1499.99,
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
    id: 6,
    title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    price: 1199.99,
    originalPrice: 1499.99,
    category: "Women's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
  {
    id: 6,
    title: "Gaming Laptop 15.6\" 144Hz RTX 3060",
    image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
    price: 1199.99,
    originalPrice: 1499.99,
    category: "Men's Fashion",
    slugUrl: "Wireless-Noise-Cancelling-Headphones",
  },
]

export function SingleProductDisplay() {
  const [products, setproducts] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_BASE_IMAGES_PATH;
  async function GetAllProducts() {
    const response = await axios.get(BASE_URL + '/api/product');
    const result = response.data;
    setproducts(
      result.map((product) => ({
        id: product._id,
        title: product.Name,
        image: BASE_IMAGES_PATH + product.Media.Images[0].Url,
        price: (product.Discount != 0) ? Number((product.Price) - (((product.Price) / 100) * product.Discount.Percentage)) : Number(product.Price),
        originalPrice: Number(product.Price),
        slugUrl: product.Slug
      }))
    );
  }

  useEffect(() => {
    GetAllProducts();
  }, [])

  return (
    <>
      <section className="p-4 bg-white">
        <h2 className="md:text-2xl text-xl font-bold md:mb-6 mb-4 text-gray-700"> Just For You</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {
            products.map((productdata, index) => {
              return <ProductCard {...productdata} key={index} />
            })
          }
        </div>
      </section>
    </>
  )
}

