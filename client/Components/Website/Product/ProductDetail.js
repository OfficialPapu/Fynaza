"use client"
import React from 'react'
import { Breadcrumb } from "@/Components/ui/Breadcrumb"
import ProductCarousel from "@/Components/Website/Product/ProductCarousel"
import ActionSection from "@/Components/Website/Product/ActionSection"
import ProductDescription from "@/Components/Website/Product/ProductDescription"
import { ProductProvider, useProduct } from '@/Components/Website/Product/ProductContext'

const ProductDetail = () => {
    return (
        <>
            <ProductProvider>
                <ProductDetailInfo />
            </ProductProvider>
        </>
    )
}
function ProductDetailInfo() {
    const { Product, BreadcrumbView } = useProduct();
    return (
        <>
            {Product && Object.keys(Product).length > 0 ?
                <>
                    <div className="my-2">
                        <Breadcrumb items={BreadcrumbView} />
                    </div>
                    <div className="min-h-screen bg-white rounded-lg relative overflow-hidden">
                        <div className="mx-auto px-4 pb-8 pt-4">
                            <div className="grid SliderWrapper">
                                <ProductCarousel />
                                <ActionSection />
                            </div>
                        </div>
                        <ProductDescription />
                    </div>
                </>
                : "Not Found"}
        </>
    )
}

export default ProductDetail;
