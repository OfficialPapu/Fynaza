import Image from "next/image"
import { Badge } from "@/Components/ui/badge"
import { ShoppingCart, Heart } from 'lucide-react'
import { useRef, useState } from 'react'

import { ReactComponent as WishlistFillAnimationIcon } from '@/Components/ui/Wishlist Animation/wishlist-fill-animation.svg'
import { ReactComponent as WishlistEmptyIcon } from '@/Components/ui/Wishlist Animation/wishlist-empty.svg'
import { ReactComponent as WishlistFilledIcon } from '@/Components/ui/Wishlist Animation/wishlist-filled.svg'

const [isWishlisted, setIsWishlisted] = useState(false)
const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)
const wishlistAnimationTimeoutRef = useRef()

const onWishlistAdd = () => {
  setIsWishlisted(true)
  setIsAnimationPlaying(true)
  wishlistAnimationTimeoutRef.current = setTimeout(() => {
    setIsAnimationPlaying(false)
  }, 1850) // total animation duration
}

const onWishlistRemove = () => {
  clearTimeout(wishlistAnimationTimeoutRef.current)
  setIsWishlisted(false)
  setIsAnimationPlaying(false)
}

interface ProductCardProps {
  title: string
  image: string
  price: number
  originalPrice: number
}

export function ProductCard({
  title,
  image,
  price,
  originalPrice
}: ProductCardProps) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)
  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <Badge 
          variant="destructive" 
          className="absolute left-2 top-2 px-1.5 py-0.5 text-xs font-semibold"
        >
          {discount}% OFF
        </Badge>
        <button
          className="absolute right-2 top-2 h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full transition-all duration-300 flex items-center justify-center"
          aria-label="Add to wishlist">
          {/* <Heart className="h-5 w-5 text-gray-600" /> */}
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-primary">Rs. {price.toFixed(2)}</span>
            <span className="text-xs text-gray-500 line-through">
              Rs. {originalPrice.toFixed(2)}
            </span>
          </div>
          <button 
            className="flex items-center justify-center rounded-full bg-black p-2 text-white transition-all duration-300 hover:bg-primary/90"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

