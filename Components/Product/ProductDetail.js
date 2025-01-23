"use client"
import React from 'react'
import { useState } from "react"
import { Home, Box } from "lucide-react"
import { Breadcrumb } from "@/Components/ui/Breadcrumb"
import ProductCarousel from "@/Components/Product/ProductCarousel"
import ActionSection from "@/Components/Product/ActionSection"
import ProductDescription from "@/Components/Product/ProductDescription"
const ProductDetail = ({ productImages }) => {
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { label: "Product", href: "#", icon: <Box className="w-3 h-3 sm:w-4 sm:h-4" /> },
    ])
    return (
        <>
            <div className="my-2">
                <Breadcrumb items={BreadcrumbView} />
            </div>
            <div className="min-h-screen bg-white rounded-lg relative overflow-hidden">
                <div className="mx-auto px-4 pb-8 pt-4">
                    <div className="grid SliderWrapper">
                        <ProductCarousel productImages={productImages} />
                        <ActionSection />
                    </div>
                </div>
                <ProductDescription />
            </div>
        </>
    )
}

export default ProductDetail
