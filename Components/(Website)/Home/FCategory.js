'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/carousel"

const categories = [
  {
    name: 'Fashion',
    icon: 'https://api.spicezgold.com/download/file_1734525204708_fash.png',
    href: '#',
    bgColor: 'bg-[#e8f5e9]'
  },
  {
    name: 'Electronics',
    icon: 'https://api.spicezgold.com/download/file_1734525218436_ele.png',
    href: '#',
    bgColor: 'bg-[#fce4ec]'
  },
  {
    name: 'Bags',
    icon: 'https://api.spicezgold.com/download/file_1734525231018_bag.png',
    href: '#',
    bgColor: 'bg-[#f3e5f5]'
  },
  {
    name: 'Footwear',
    icon: 'https://api.spicezgold.com/download/file_1734525239704_foot.png',
    href: '#',
    bgColor: 'bg-[#e3f2fd]'
  },
  {
    name: 'Groceries',
    icon: 'https://api.spicezgold.com/download/file_1734525248057_gro.png',
    href: '#',
    bgColor: 'bg-[#fce4ec]'
  },
  {
    name: 'Beauty',
    icon: 'https://api.spicezgold.com/download/file_1734525255799_beauty.png',
    href: '#',
    bgColor: 'bg-[#e0f2f1]'
  },
  {
    name: 'Wellness',
    icon: 'https://api.spicezgold.com/download/file_1734525275367_well.png',
    href: '#',
    bgColor: 'bg-[#fce4ec]'
  },
  {
    name: 'Jewellery',
    icon: 'https://api.spicezgold.com/download/file_1734525286186_jw.png',
    href: '/category/jewellery/',
    bgColor: 'bg-[#fff3e0]'
  }
]

export default function CategoryCarousel() {
  return (
    <section className="p-4 bg-white">
      <h2 className="md:text-2xl text-xl font-bold md:mb-6 mb-4 text-gray-700">Featured Categories</h2>
      <Carousel opts={{ align: "start", loop: true, }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/4 lg:basis-basis-15 basis-1/3">
              <Link href={category.href} className="group">
                <div className="flex flex-col items-center gap-2">
                  <div className={`rounded-full p-4 ${category.bgColor} lg:w-28 lg:h-28 md:w-24 md:h-24 sm:w-20 sm:h-20 w-[4.2rem] h-[4.2rem] flex items-center justify-center group-hover:scale-105 group-hover:shadow-lg duration-300`}>
                    <Image
                      src={category.icon || "/placeholder.svg"}
                      alt={category.name}
                      width={100}
                      height={100}
                      className="object-contain md:w-12 md:h-12 w-8 h-8 lg:w-14 lg:h-14"
                    />
                  </div>
                  <span className="text-sm font-medium text-center text-gray-500">{category.name}</span>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

