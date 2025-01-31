"use client";
import { Breadcrumb } from "@/Components/ui/Breadcrumb";
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Switch } from "@/Components/ui/switch"
import { Home, UserRound, Settings } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

const Setting = () => {
    const [BreadcrumbView, setBreadcrumbView] = useState([
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Account", href: "/account", icon: <UserRound className="w-4 h-4" /> },
        { label: "Settings", href: "/account/settings", icon: <Settings className="w-4 h-4" />  }
    ]);
    return (
        <div className="mt-2">
            <Breadcrumb items={BreadcrumbView} />
            <div className="rounded-lg mt-2 mb-4">
                <div className="space-y-6 bg-white p-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password & Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Current Password</label>
                                <Input type="password" className="h-10" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">New Password</label>
                                <Input type="password" className="h-10" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Confirm New Password</label>
                                <Input type="password" className="h-10" />
                            </div>
                            <Button className="bg-black text-white hover:bg-black/90">Update Password</Button>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-sm text-gray-600">Receive updates about your orders and promotions</p>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">SMS Notifications</p>
                                        <p className="text-sm text-gray-600">Get instant updates about your orders via SMS</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Profile Visibility</p>
                                        <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting
