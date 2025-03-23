import React from 'react'
import { TabsTrigger, TabsList } from "@/Components/ui/tabs"
import { useProduct } from '../ProductContext';
const TabsListComp = () => {
    const { Reviews } = useProduct();
    return (
        <TabsList className="w-full flex flex-wrap gap-2 justify-start rounded-none h-auto p-0 bg-transparent mb-6">
            <TabsTrigger
                value="description"
                className="text-sm md:text-base rounded-full data-[state=active]:bg-gray-800 data-[state=active]:text-white border-2 border-gray-800 px-6 py-2 transition-all duration-200 hover:bg-black/5 data-[state=active]:hover:bg-gray-900 text-black"
            >
                Description
            </TabsTrigger>
            <TabsTrigger
                value="additional"
                className="text-sm md:text-base rounded-full data-[state=active]:bg-gray-800 data-[state=active]:text-white border-2 border-gray-800 px-6 py-2 transition-all duration-200 hover:bg-black/5 data-[state=active]:hover:bg-gray-900 text-black"
            >
                Additional Info
            </TabsTrigger>
            <TabsTrigger
                value="reviews"
                className="text-sm md:text-base rounded-full data-[state=active]:bg-gray-800 data-[state=active]:text-white border-2 border-gray-800 px-6 py-2 transition-all duration-200 hover:bg-black/5 data-[state=active]:hover:bg-gray-900 text-black" >
                Reviews ({Reviews.length})
            </TabsTrigger>
        </TabsList>
    )
}

export default TabsListComp;
