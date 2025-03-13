"use client";
import React from 'react'
import { useState } from "react";
import { Home, UserRound, Plus, MapPin } from "lucide-react";
import { Breadcrumb } from '@/Components/ui/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
const Addresses = () => {
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Account", href: "/account", icon: <UserRound className="w-4 h-4" /> },
        { label: "Addresses", href: "/account/addresses", icon: <MapPin className="w-4 h-4" />  }
    ]);
    return (
        <div className='mt-2'>
            <Breadcrumb items={BreadcrumbView} />
            <div className="rounded-lg mt-2 mb-4">
                <div className="flex items-center justify-between mb-2 mt-4">
                    <h1 className="text-2xl font-bold tracking-tight">Addresses</h1>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Address
                    </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    {[1, 2].map((address) => (
                        <Card key={address}>
                            <CardHeader>
                                <CardTitle className="text-base font-medium flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {address === 1 ? "Home" : "Office"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">John Doe</p>
                                <p className="text-sm text-gray-600">123 Street Name</p>
                                <p className="text-sm text-gray-600">City, State 12345</p>
                                <p className="text-sm text-gray-600">Phone: (123) 456-7890</p>
                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Addresses
