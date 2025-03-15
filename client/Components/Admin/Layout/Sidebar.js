"use client"

import React from "react"
import { useState } from "react"
import { Edit, FileText, LayoutDashboard, List, LogOutIcon, Menu, Moon, Package, PlusCircle, Settings, ShoppingBag, Sun, Tags, Users, } from "lucide-react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import MobileSidebar from "./MobileSidebar"
import DesktopSidebar from "./DesktopSidebar"

const sidebarLinks = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
    },
    {
        title: "Products",
        icon: Package,
        submenu: [
            { title: "Product List", icon: List, href: "/admin/products" },
            { title: "Add New", icon: PlusCircle, href: "/admin/products/add" },
        ],
    },
    {
        title: "Categories",
        icon: Tags,
        active: true,
        submenu: [
            { title: "Categories ", icon: List, href: "/admin/categories" },
            { title: "Add a Category", icon: PlusCircle, href: "/admin/categories/add" },
        ],

    },
    {
        title: "Customers",
        icon: Users,
        href: "/admin/customers",
        active: true,
    },
    {
        title: "Orders",
        icon: ShoppingBag,
        href: "/admin/orders",
        active: true,
    },
    {
        title: "Coupons",
        icon: FileText,
        href: "/admin/coupons",
        active: true,
    },
    {
        title: "Staff",
        icon: Users,
        href: "/admin/staff",
        active: true,
    },
    {
        title: "Settings",
        icon: Settings,
        href: "/admin/settings",
        active: true,
    },
    {
        title: "Log Out",
        icon: LogOutIcon,
        href: "/admin/logout",
        active: true,
    }
]

export function Sidebar({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const { theme, setTheme } = useTheme()
    return (
        <div>
            {/* Sidebar for desktop */}
            <DesktopSidebar sidebarLinks={sidebarLinks} isSidebarOpen={isSidebarOpen} />

            {/* Main content */}
            <div className={`flex-1 ${isSidebarOpen ? "lg:ml-72" : "lg:ml-20"} transition-all duration-300`}>
                <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">

                    {/* Mobile sidebar */}
                    <MobileSidebar sidebarLinks={sidebarLinks} isSidebarOpen={isSidebarOpen} />

                    <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="ml-auto flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        <Separator orientation="vertical" className="h-8" />
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                <main className="container mx-auto p-6 lg:p-8">{children}</main>
            </div>
        </div>
    )
}

