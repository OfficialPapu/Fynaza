"use client"

import React from "react"
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { FileText, LayoutDashboard, List, Menu, Moon, Package, PlusCircle, Settings, ShoppingBag, Sun, Tags, Users, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import MobileSidebar from "./MobileSidebar"
import DesktopSidebar from "./DesktopSidebar"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import axios from "@/lib/axios"
import { useSnackbar } from "notistack"
import { Logout } from "../Redux/Slices/LoginSlice"

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
        title: "Users",
        icon: Users,
        href: "/admin/users",
        active: true,
    },
    {
        title: "Settings",
        icon: Settings,
        href: "/admin/settings",
        active: true,
    },
]

export function Sidebar({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const { theme, setTheme } = useTheme();
    const isAuth = useSelector((state) => state.Admin.isAuth);
    const router = useRouter();
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isAuth) {
            const currentPath = window.location.pathname;
            localStorage.setItem("RedirectAfterLogin", currentPath);
            router.push('/admin/auth/login');
        }
    }, [isAuth, router]);
    const Logoutfunction = async () => {
        const response = await axios.post("api/auth/logout", "", { withCredentials: true });
        if (response.status === 200) {
            dispatch(Logout());
        } else {
            ShowNotification(response.data.message, { variant: 'error' });
        }
    }
    return (
        isAuth ?
            (
                <div>
                    <DesktopSidebar sidebarLinks={sidebarLinks} isSidebarOpen={isSidebarOpen} />

                    <div className={`flex-1 ${isSidebarOpen ? "lg:ml-72" : "lg:ml-20"} transition-all duration-300`} >
                        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">

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
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="h-10 w-10 cursor-pointer">
                                            <AvatarFallback>A</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator /><DropdownMenuSeparator />
                                        <DropdownMenuItem onSelect={Logoutfunction} className="text-destructive focus:text-destructive cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                        </header>
                        <main className="container mx-auto p-6 lg:p-8">{children}</main>
                    </div>
                </div>
            ) : (
                <div></div>
            )
    )
}

