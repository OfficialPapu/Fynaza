'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, Menu, Home, Heart, UserRound } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/Components/ui/navigation-menu'
import { SearchDesktop, SearchMobile } from './SearchBox/SearchBar'
import { useSelector } from 'react-redux'

const categories = [
    { name: 'FASHION', icon: '👕' },
    { name: 'ELECTRONICS', icon: '📱' },
    { name: 'BAGS', icon: '👜' },
    { name: 'FOOTWEAR', icon: '👟' },
    { name: 'GROCERIES', icon: '🛒' },
    { name: 'BEAUTY', icon: '💄' },
    { name: 'WELLNESS', icon: '🧘' },
    { name: 'Jewellery', icon: '🧘', href: "jewellery" },
]

export default function Navbar() {
    const CartItemCount = useSelector((state) => state.Cart.CartItems?.length);
    const isAuth = useSelector((state) => state.Login.isAuth);
    return (
        <div className="border-b lg:pb-0 bg-white">
            <div className="container mx-auto px-4">
                {/* Top Navigation */}
                <div className="flex items-center justify-between h-16 gap-4">

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="!h-12 !w-8" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="grid gap-4 py-4">
                                {categories.map((category) => (
                                    <Link
                                        key={category.name}
                                        href={"/category/" + category.href}
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
                                        <span>{category.icon}</span>
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/Main Logo.png" alt="Fynaza Logo" className='h-14' />
                    </Link>

                    <SearchDesktop />

                    {/* Cart & Wishlist */}
                    <div className="flex items-center gap-4 HideMobileView">
                        <Link href={isAuth ? "/account" : "/auth/login"}>
                            <Button variant="ghost" size="icon">
                                <UserRound className="!h-5 !w-5" />
                            </Button>
                        </Link>
                        <Link href="/account/cart">
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingBag className="h-6 w-6" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {CartItemCount}
                                </span>
                            </Button>
                        </Link>
                        <Link href="/account/wishlist">
                            <Button variant="ghost" size="icon" className="relative">
                                <Heart className="!h-5 !w-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    0
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Categories Navigation (Desktop) */}
                <div className="hidden lg:block border-t">
                    <NavigationMenu className="mx-auto">
                        <NavigationMenuList>
                            {categories.map((category) => (
                                <Link href={"/category/" + category.href} key={category.name}>
                                    <NavigationMenuItem key={category.name}>
                                        <NavigationMenuTrigger className="h-12">
                                            <span className="mr-2">{category.icon}</span>
                                            {category.name}
                                        </NavigationMenuTrigger>
                                    </NavigationMenuItem>
                                </Link>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <SearchMobile />

                {/* Mobile Bottom Navigation */}
                <div className="z-10 fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden">
                    <div className="flex justify-between items-center px-4 py-2">
                        <Link href="/" className="flex flex-col items-center gap-1">
                            <Home className="h-6 w-6" />
                            <span className="text-xs">Home</span>
                        </Link>
                        <button className="flex flex-col items-center gap-1">
                            <Search className="h-6 w-6" />
                            <span className="text-xs">Search</span>
                        </button>
                        <Link href="/account/cart" className="flex flex-col items-center gap-1 relative">
                            <ShoppingBag className="h-6 w-6" />
                            <span className="text-xs">Cart</span>
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 grid place-items-center">
                                {CartItemCount}
                            </span>
                        </Link>
                        <Link href="/account/wishlist" className="flex flex-col items-center gap-1 relative">
                            <Heart className="h-6 w-6" />
                            <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 grid place-items-center">
                                0
                            </span>
                            <span className="text-xs">Wishlist</span>
                        </Link>
                        <Link href="/account" className="flex flex-col items-center gap-1">
                            <UserRound className="h-6 w-6" />
                            <span className="text-xs">Account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

