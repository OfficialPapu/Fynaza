"use client"
import { ProductCard } from "@/Components/ui/ProductCard"
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

export function SingleProductDisplay() {
  const [products, setproducts] = useState([]);
  const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_BASE_IMAGES_PATH;
  async function GetAllProducts() {
    const response = await axios.get('api/product');
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

