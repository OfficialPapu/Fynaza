"use client"
import React from "react"
import { useState } from "react"
import { Home, LayoutGrid, PackageSearch } from "lucide-react"
import { Breadcrumb } from "@/Components/ui/Breadcrumb"
import { ProductCard } from "@/Components/ui/ProductCard"
import { useParams } from "next/navigation"
import { Button } from "@/Components/ui/button"
import Filter from "./Filter"

export default function subCategory({ Products, Categories }) {
  const maxPrice = Math.max(...Products.map(product => product.Price));
  const { Category } = useParams();
  const { subCategory } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(Products)

  const [BreadcrumbView, setBreadcrumbView] = useState([
    { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "Category", href: "/category", icon: <LayoutGrid className="w-4 h-4" /> },
    { label: Category.charAt(0).toUpperCase() + Category.slice(1), href: `/category/${Category}`, icon: "" },
    { label: subCategory.charAt(0).toUpperCase() + subCategory.slice(1), href: `/category/${Category}/${subCategory}`, icon: "" },
  ]);

  const resetFilters = () => {
    setFilteredProducts(Products); 
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="my-2">
          <Breadcrumb items={BreadcrumbView} />
        </div>
        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-md px-4 py-8">
          <Filter Products={Products} Categories={Categories} setFilteredProducts={setFilteredProducts} maxPrice={maxPrice} />
          <div className="w-full lg:w-3/4">
            <div className={"grid " + (filteredProducts.length > 0 ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "")}>
              {
                filteredProducts.length > 0 ?

                  (filteredProducts.map((product) => {
                    return <ProductCard {...product} key={product.ID}/>
                  })) : (
                    <div className="flex flex-col items-center justify-center h-[70vh] bg-[#f3f7fa] rounded-lg p-8">
                      <PackageSearch className="w-16 h-16 text-black mb-4" />
                      <h2 className="text-2xl font-bold text-black mb-2">No Products Found</h2>
                      <p className="text-gray-600 text-center mb-6">
                        We couldn't find any products matching your current filters. Try adjusting your search criteria.
                      </p>
                      <Button onClick={resetFilters} className="bg-black text-white hover:bg-gray-800 transition-colors">
                        Reset Filters
                      </Button>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

