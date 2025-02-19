import React from 'react'
import Image from "next/image"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/thumbs"
import { Thumbs } from "swiper/modules"

const ProductCarousel = ({productImages}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
    return (
        <div className="relative flex flex-col md:flex-row gap-1 lg:h-[400px] sm:h-[350px] h-[300px]">
            {/* Thumbnails on the left */}
            <div className="md:flex flex-col gap-2 lg:h-[400px] sm:h-[350px] MiniImageBox">
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
                className="lg:h-[400px] lg:w-[400px] sm:h-[350px] sm:w-[350px] h-[300px] w-[300px]"
            >
                {productImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative rounded-lg border lg:h-[400px] lg:w-[400px] sm:h-[350px] sm:w-[350px] h-[300px] w-[300px]">
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

    )
}

export default ProductCarousel
