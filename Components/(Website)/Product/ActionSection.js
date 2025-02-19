import React from 'react'
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Star, Heart, Share2, ShoppingBasket, ShoppingBag } from "lucide-react"

const ActionSection = () => {
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
        <div className="space-y-6">
            <div>
                <h1 className="sm:text-3xl text-xl font-bold text-gray-900">
                    Skechers Women's Slip-Ins Summits - Enslee Slip Resistant Sneakers
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
                    <Badge className="bg-[#e5f8ed] text-[#00b853] border-none" variant="outline">In Stock</Badge>
                    {/* <Badge variant="destructive">Out of stock</Badge> */}
                </div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.ac
            </div>

            <div className="space-y-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="sm:text-3xl text-2xl font-bold text-red-600">Rs. 59.99</div>
                    <div className="sm:text-xl text-md text-gray-500 line-through">Rs. 79.99</div>
                    <div className="bg-red-100 text-red-800 sm:text-sm text-xs font-semibold px-2 py-1 rounded">25% OFF</div>
                </div>
                <div className="flex gap-4">
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
