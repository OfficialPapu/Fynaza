"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Breadcrumb } from "@/Components/ui/Breadcrumb"
import { Home, LayoutGrid, ShoppingCart } from "lucide-react"
import { useParams } from "next/navigation"

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
    const { Category } = useParams()
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { label: "Category", href: "/category", icon: <LayoutGrid className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { label: Category.charAt(0).toUpperCase() + Category.slice(1), href: `/category/${Category}`, icon: "" },
    ])

    return (
        <>
            <div className="my-2">
                <Breadcrumb items={BreadcrumbView} />
            </div>
            <div className="min-h-[70vh] bg-white">
                <div className="container mx-auto p-4 rounded-lg">
                    <motion.h1
                        className="text-2xl md:text-4xl font-bold md:mb-8 mb-6 text-gray-700"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Exquisite Jewellery
                    </motion.h1>

                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {subcategories.map((subcategory) => (
                            <motion.div key={subcategory.name} variants={itemVariants} className="w-full">
                                <Link
                                    href={`/category/jewellery/${subcategory.name.toLowerCase()}`}
                                    className="group block w-full shadow-md rounded-md overflow-hidden"
                                >
                                    <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 transform">
                                        <div className="relative aspect-square">
                                            <img
                                                src={subcategory.image || "/placeholder.svg"}
                                                alt={subcategory.name}
                                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
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

export default CategoryItemPage

