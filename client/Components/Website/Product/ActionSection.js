import React from 'react'
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Star, Heart, Share2, ShoppingBasket, ShoppingBag } from "lucide-react"
import { useProduct } from '@/Components/Website/Product/ProductContext'

const ActionSection = () => {
    const { Product, BASE_IMAGES_PATH, handleShare } = useProduct();
    let DiscountPrice = "";
    if (Product.Discount.Percentage != 0) {
        DiscountPrice = Number((Product.Price) - (((Product.Price) / 100) * Product.Discount.Percentage));
    }
    return (
        <div className="space-y-6">
            <div>
                <h1 className="sm:text-3xl text-xl font-bold text-gray-900">
                    {Product.Name}
                    <span className="ml-2">
                        <Button variant="ghost" className="rounded-full h-10 w-10 border ml-2"><Heart className="w-5 h-5" /></Button>
                        <Button variant="ghost" className="rounded-full h-10 w-10 border ml-2"><Share2 className="w-5 h-5" /></Button>
                    </span>
                </h1>

                <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                        {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="w-5 h-5 fill-gray-300 text-gray-300" />
                    </div>
                    <span className="text-sm text-gray-600">1,515 ratings</span>
                </div>
            </div>

            <div className="space-y-4 flex flex-col gap-3 w-full">
                <div className="cursor-default">
                    {Product.Stock.Quantity > 0 ? <><Badge className="bg-[#e5f8ed] text-[#00b853] border-none" variant="outline">In Stock</Badge></>
                        : <><Badge variant="destructive">Out of stock</Badge></>}
                </div>
            </div>

            <div className="space-y-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    {Product.Discount.Percentage != 0 ? <>
                        <div className="sm:text-3xl text-2xl font-bold text-red-600">Rs. {DiscountPrice}</div>
                        <div className="sm:text-xl text-md text-gray-500 line-through">Rs. {Product.Price.toFixed(2)}</div>
                        <div className="bg-red-100 text-red-800 sm:text-sm text-xs font-semibold px-2 py-1 rounded">{Product.Discount.Percentage}% OFF</div></>
                        : <>
                            <div className="sm:text-3xl text-2xl font-bold text-red-600">Rs. {Product.Price.toFixed(2)}</div>
                        </>
                    }

                </div>
                <div className="flex gap-4 border">
                    <Button variant="outline" className="flex-1">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Add to Cart
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleShare}>
                        <ShoppingBasket className="w-4 h-4 mr-2" />
                        Buy Now
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default ActionSection
