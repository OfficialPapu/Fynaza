'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { ProductCard } from "./Product-card"

const products = [
  {
    title: "Premium Wireless Noise-Cancelling Headphones",
    image: "/placeholder.svg?height=400&width=400",
    price: 249.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 1283
  },
  {
    title: "TWS Wireless Bluetooth Earbuds with Charging Case - Premium Sound Quality",
    image: "/placeholder.svg?height=400&width=300",
    price: 349,
    originalPrice: 1500,
    shipping: "Free Shipping",
    delivery: "Feb 2"
  },
  {
    title: "85W Super Fast Charger - Quick Charge Power Adapter",
    image: "/placeholder.svg?height=400&width=300",
    price: 450,
    originalPrice: 1999,
    shipping: "Free Shipping",
    delivery: "Feb 3"
  },
  {
    title: "Safety Always Ultra Thin Pads - Pack of 8",
    image: "/placeholder.svg?height=400&width=300",
    price: 30,
    originalPrice: 50,
    shipping: "Free Shipping",
    delivery: "Feb 4"
  },
  {
    title: "T800 Ultra Smartwatch 2.0 - Advanced Health Monitoring",
    image: "/placeholder.svg?height=400&width=300",
    price: 699,
    originalPrice: 1899,
    shipping: "Free Shipping",
    delivery: "Feb 5"
  },
  {
    title: "Premium Wireless Earphones - High Bass Quality",
    image: "/placeholder.svg?height=400&width=300",
    price: 299,
    originalPrice: 999,
    shipping: "Free Shipping",
    delivery: "Feb 6"
  }
]

export function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  return (
    <div className="relative max-w-md mx-auto">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
      {products.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute -left-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute -right-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  )
}

