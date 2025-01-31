"use client";
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Breadcrumb } from "@/Components/ui/Breadcrumb"
import { useState } from "react";
import { Home, UserRound, UserRoundPen } from "lucide-react";
const Profile = () => {
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Account", href: "/account", icon: <UserRound className="w-4 h-4" /> },
        { label: "Profile", href: "/account/profile", icon: <UserRoundPen className="w-4 h-4" /> }
    ]);
    return (
        <div className="mt-2">
            <Breadcrumb items={BreadcrumbView} />
            <div className="bg-white rounded-lg mt-2 mb-4 p-6">
                <Card className="max-w-7xl mx-auto">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <Input className="h-10" placeholder="Enter your full name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <Input className="h-10" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                                <Input className="h-10" type="tel" placeholder="Enter your phone number" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                                <Input className="h-10" type="date" />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <Button variant="outline">Cancel</Button>
                            <Button className="bg-black text-white hover:bg-black/90">Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Profile
