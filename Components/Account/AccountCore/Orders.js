"use client";
import React from 'react'
import { useState } from "react";
import { Home, UserRound } from "lucide-react";
import { Breadcrumb } from '@/Components/ui/Breadcrumb';


import Link from "next/link"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { ChevronRight, Package } from "lucide-react"

const orders = [
    { id: "1001", date: "2023-05-01", total: 129.99, status: "Delivered", items: 3 },
    { id: "1002", date: "2023-05-15", total: 79.99, status: "Processing", items: 1 },
    { id: "1003", date: "2023-06-02", total: 199.99, status: "Shipped", items: 2 },
]

const statusColors = {
    Delivered: "bg-green-100 text-green-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-yellow-100 text-yellow-800",
}
const Orders = () => {

    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Account", href: "/account", icon: <UserRound className="w-4 h-4" /> },
        { label: "Orders", href: "/account/orders", icon: <Package className="w-4 h-4" />  }
    ]);
    return (
        <div className='mt-2'>
            <Breadcrumb items={BreadcrumbView} />
            <div className="rounded-lg mt-2 mb-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                                        <p className="text-sm text-gray-500">{order.date}</p>
                                    </div>
                                    <Badge variant="secondary" className={statusColors[order.status]}>
                                        {order.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                    <Package className="h-4 w-4" />
                                    <span>
                                        {order.items} {order.items === 1 ? "item" : "items"}
                                    </span>
                                </div>
                                <p className="font-medium">Total: ${order.total.toFixed(2)}</p>
                            </CardContent>
                            <CardFooter className="bg-gray-50 p-4">
                                <Button variant="ghost" className="w-full justify-between" asChild>
                                    <Link href={`/account/orders/${order.id}`}>
                                        View Order Details
                                        <ChevronRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders
