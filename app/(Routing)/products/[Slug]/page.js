"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/thumbs"
import { Thumbs } from "swiper/modules"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, Share2, Home, Box } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Breadcrumb } from "@/Components/ui/Breadcrumb"
import { Badge } from "@/Components/ui/badge"

const productImages = [
  "https://dreamskinnepal.com/Assets/Product/Media/Images/Product%20Images/2025/01/img_6788e34cd03938.24305690_1.png",
  "https://dreamskinnepal.com/Assets/Product/Media/Images/Product%20Images/2025/01/img_6788e34cd09ff2.61893500_2.png",
  "https://justopjewelry.com/wp-content/uploads/2025/01/9112097-9112098-9112099-9112102_05.jpg",
  "https://justopjewelry.com/wp-content/uploads/2025/01/9112097-9112098-9112099-9112102_05.jpg",
  "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
  "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
  "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
  "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
  "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
  "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg",
]

const sizes = ["5", "6", "7", "8", "9", "10"]
const colors = [
  { name: "Black/White", value: "black-white" },
  { name: "All Black", value: "black" },
  { name: "Grey", value: "grey" },
  { name: "Navy", value: "navy" },
]

const handleShare = () => {
  if (navigator.share) {
    navigator
      .share({
        title: "Skechers Women's Slip-Ins Summits - 25% OFF",
        text: "Check out these awesome sneakers! Now only $59.99 (was $79.99)",
        url: window.location.href,
      })
      .catch(console.error)
  } else {
    // Fallback for browsers that don't support Web Share API
    alert("Sharing is not supported on this browser, but you can copy this link: " + window.location.href)
  }
}

export default function ProductDetail() {
  const [BreadcrumbView, setBreadcrumbView] = useState([
    { label: "Home", href: "/", icon: <Home className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { label: "Product", href: "#", icon: <Box className="w-3 h-3 sm:w-4 sm:h-4" /> },
  ])

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <>
      <div className="my-2">
        <Breadcrumb items={BreadcrumbView} />
      </div>
      <div className="min-h-screen bg-white rounded-lg relative overflow-hidden">
        <div className="mx-auto px-4 py-8">
          <div className="grid SliderWrapper">
            {/* Image Gallery */}
            <div className="relative flex flex-col md:flex-row h-[400px] gap-1">
              {/* Thumbnails on the left */}
              <div className="md:flex flex-col gap-2 lg:h-[400px] md:h-[300px] h-[400px] MiniImageBox">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  slidesPerView={6}
                  spaceBetween={10}
                  modules={[Thumbs]}
                  watchSlidesProgress
                  direction="vertical"
                  loop={true}
                >
                  {productImages.map((image, index) => (
                    <SwiperSlide key={index} className="MiniSwiper">
                      <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product thumbnail ${index + 1}`}
                          width={56}
                          height={56}
                          className="object-cover w-full h-full opacity-[0.7]"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Main image */}
              <Swiper
                modules={[Thumbs]}
                slidesPerView={1}
                spaceBetween={20}
                thumbs={{ swiper: thumbsSwiper }}
                loop={true}
                className="md:w-[400px] md:h-[400px]"
              >
                {productImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative rounded-lg lg:h-[400px] md:h-[300px] h-[400px] border w-[400px]">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-contain rounded-lg"
                        priority
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Skechers Women's Slip-Ins Summits - Enslee Slip Resistant Sneakers
                  <Button variant="ghost" className="rounded-full h-10 w-10 border ml-2"><Heart className="w-5 h-5" /></Button>
                  <Button variant="ghost" className="rounded-full h-10 w-10 border ml-2"><Share2 className="w-5 h-5" /></Button>
                </h1>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-5 h-5 fill-gray-300 text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-600">1,515 ratings</span>
                </div>
              </div>

              <div className="space-y-4 flex flex-col gap-3 w-full">
                <div className="cursor-default">
                  <Badge className="bg-[#e5f8ed] text-[#00b853] border-none" variant="outline">In Stock</Badge>
                  <Badge variant="destructive">Out of stock</Badge>
                </div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.ac
              </div>

              <div className="space-y-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-red-600">Rs. 59.99</div>
                  <div className="text-xl text-gray-500 line-through">Rs. 79.99</div>
                  <div className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">25% OFF</div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

