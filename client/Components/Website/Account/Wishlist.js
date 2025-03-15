"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Home, Trash2, User } from "lucide-react"
import { Button } from "@/Components/ui/button"
import Link from "next/link";
import { Breadcrumb } from "@/Components/ui/Breadcrumb";

export default function Wishlist({ initialWishlistItems }) {
    const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> }, 
        { label: "Account", href: "/account", icon: <User className="w-4 h-4" /> }, 
        { label: "Wishlist", href: "/account/wishlist", icon: <Heart className="w-4 h-4" /> }
    ]);

    const removeFromWishlist = (id) => {
        setWishlistItems((items) => items.filter((item) => item.id !== id))
    }

    return (
        <div className="min-h-[70vh] bg-[#f3f7fa]">
            <div className="container mx-auto px-4 pb-8 pt-4">
                <div className="mb-2">
                    <Breadcrumb items={BreadcrumbView} />
                </div>
                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg mb-2 text-black">{item.name}</h2>
                                    <p className="text-gray-600 mb-4">Rs. {item.price.toFixed(2)}</p>
                                    <div className="flex justify-between">
                                        <button
                                            className="flex items-center justify-center rounded-full border p-3 transition-all duration-300 hover:bg-primary/10">
                                            <ShoppingCart className="h-4 w-4 text-black" />
                                        </button>
                                        <Button
                                            variant="outline"
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center min-h-[50vh] grid place-content-center">
                        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h2 className="text-2xl font-semibold mb-2 text-black">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-6">Looks like you haven't added any items to your wishlist yet.</p>
                        <Link href="/products">
                            <Button className="text-white bg-gray-800 hover:bg-gray-900">Explore Products</Button>
                        </Link>
                    </div>
                )}

            </div>
        </div>
    )
}

