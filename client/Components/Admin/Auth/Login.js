"use client"
import React from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useAdminLoginLogin } from "@/Components/Admin/Auth/LoginLogic"

export default function AdminLogin() {
    const { ShowPass, SetShowPass, isLoading, UserDetails, handleInputChange, handleSubmit, errors } = useAdminLoginLogin();
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f3f7fa] p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
                    <CardDescription className="text-center">Enter your credentials to access the admin panel</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="pb-4">
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    className="pl-10 h-[40px]"
                                    name="Email"
                                    value={UserDetails.Email}
                                    onChange={(e) => { handleInputChange(e) }}
                                />
                            </div>
                            {errors.Email && <p className="text-sm text-red-500">{errors.Email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={ShowPass ? "text" : "password"}
                                    className="pl-10 pr-10 h-[40px]"
                                    name="Password"
                                    placeholder="Password"
                                    value={UserDetails.Password}
                                    onChange={(e) => { handleInputChange(e) }}
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={() => SetShowPass(!ShowPass)}
                                    className="absolute right-3 top-3 text-muted-foreground"
                                    tabIndex={-1}
                                >
                                    {ShowPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.Password && <p className="text-sm text-red-500">{errors.Password}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full h-10 bg-[#f3f7fa]/90 hover:bg-[#f3f7fa]/90 text-black" disabled={isLoading} type="submit">
                            Login
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

