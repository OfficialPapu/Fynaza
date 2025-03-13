"use client"
import React from 'react'
import Link from "next/link"
import { useState } from "react";
import {Home, LayoutGrid } from "lucide-react"
import { Card } from "@/Components/ui/card"
import { Breadcrumb } from "@/Components/ui/Breadcrumb";
const MainCategory = ({ category }) => {
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Category", href: "/category", icon: <LayoutGrid className="w-4 h-4" /> },
    ]);
    return (
        <div className="container mx-auto pb-8">
            <div className="my-2"><Breadcrumb items={BreadcrumbView} /></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white rounded-lg px-4 pb-8 pt-4">
                {category.map((category) => (
                    <Link key={category.name} href={category.href}>
                        <Card className="p-6 hover:shadow-lg transition-shadow flex flex-col items-center justify-center gap-3 h-full">
                            <div className={`${category.color}`}>{category.icon}</div>
                            <span className="font-medium text-center">{category.name}</span>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MainCategory
