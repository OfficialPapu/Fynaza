import Image from "next/image"
import { Badge } from "@/Components/ui/badge"
import { ShoppingCart, Heart } from 'lucide-react'
import React from 'react'

interface ProductCardProps {
  title: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
}

export function ProductCard({
  title,
  image,
  price,
  originalPrice,
  rating,
  reviews
}: ProductCardProps) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl md:max-w-[350px]">
      <div className="relative h-[250px]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge 
          variant="destructive" 
          className="absolute left-4 top-4 px-2 py-1"
        >
          {discount}% OFF
        </Badge>
        <button
          className="bg-white absolute right-4 top-4 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-content-center"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({reviews} reviews)</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">Rs. {price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 line-through ml-2">
              Rs. {originalPrice.toFixed(2)}
            </span>
          </div>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 w-10 rounded-full">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

