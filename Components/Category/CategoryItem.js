"use client"
import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Breadcrumb } from '../ui/Breadcrumb'
import { Home, LayoutGrid, ShoppingCart } from 'lucide-react'
import { useParams } from 'next/navigation'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
}

const CategoryItemPage = ({ subcategories }) => {
    const { Category } = useParams();
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Category", href: "/category", icon: <LayoutGrid className="w-4 h-4" /> },
        { label: Category.charAt(0).toUpperCase() + Category.slice(1), href: `/category/ + ${Category}`, icon: "" }
    ]);
    return (
        <>
            <div className='my-2'>
                <Breadcrumb items={BreadcrumbView} />
            </div>
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 py-12">
                    <motion.h1
                        className="text-2xl md:text-4xl font-bold mb-12 text-gray-700"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Exquisite Jewellery
                    </motion.h1>

                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {subcategories.map((subcategory) => (
                            <motion.div key={subcategory.name} variants={itemVariants}>
                                <Link href={`/category/jewellery/${subcategory.name.toLowerCase()}`} className="group block w-[200px] shadow-md rounded-md aspect-square">
                                    <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 transform">
                                        <div className="relative aspect-square">
                                            <Image
                                                src={subcategory.image || "/placeholder.svg"}
                                                alt={subcategory.name}
                                                fill="contain"
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <h2 className="absolute bottom-0 w-full text-sm md:text-base text-black py-2 text-center group-hover:bg-gray-700 group-hover:text-white transition-colors duration-500 bg-[#f3f7fa]">
                                                {subcategory.name}
                                            </h2>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default CategoryItemPage;
