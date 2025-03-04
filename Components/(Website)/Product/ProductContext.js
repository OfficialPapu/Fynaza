"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "@/lib/axios";
import { Home, Box } from "lucide-react"
import { usePathname } from 'next/navigation';

const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
    const pathname = usePathname();
    const Slug = pathname.split("/").pop();
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { label: "Product", href: "#", icon: <Box className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { label: "", href: "" },
    ])

    const [Product, setProduct] = useState([]);
    const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_BASE_IMAGES_PATH;

    async function GetProductInfo() {
        const response = await axios.get('api/product/' + Slug);
        const result = response.data;
        setBreadcrumbView((prv) =>
            prv.map((item, index) =>
                index === 2 ? { ...item, label: result[0].Name } : item
            )
        );
        setProduct(result[0]);
    }

    useEffect(() => {
        GetProductInfo();
    }, [])



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

    return (

        <>
            <ProductContext.Provider value={{ BreadcrumbView, Product, Slug, BASE_IMAGES_PATH, handleShare }} >{children}</ProductContext.Provider >
        </>

    );
}
export const useProduct = () => useContext(ProductContext);
