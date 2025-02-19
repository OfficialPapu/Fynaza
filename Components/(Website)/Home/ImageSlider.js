'use client';
import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/Components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function ImageSlider() {
  const images = [
    {
      src: "./Test Images/LOVED ONES.jpg",
      alt: "SS'24 Poppies on the sea collection",
    },
    {
      src: "./Test Images/LOVED ONES.jpg",
      alt: "SS'24 Poppies on the sea collection",
    },
    {
      src: "./Test Images/LOVED ONES.jpg",
      alt: "SS'24 Poppies on the sea collection",
    },
  ];
  
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  return (
    <Carousel className="w-full mt-2 relative bg-white" opts={{ align: "start", loop: true, }} plugins={[plugin.current]}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full">
              <img src={image.src} alt={image.alt} className="object-cover rounded-lg" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  )
}

