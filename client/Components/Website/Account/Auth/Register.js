"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useRegisterLogic } from "./Logic/Register"
export default function RegisterPage() {
  const { UserDetails, ShowPass, Errors, isLoading, togglePasswordVisibility, handleInputChange, HandelRegisterForm } = useRegisterLogic();
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-[450px] overflow-hidden shadow-xl border-0">
        <CardContent className="p-0">
          <form onSubmit={HandelRegisterForm}>
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light tracking-wide">Create Account</h2>
                  <p className="text-gray-500 mt-2">Join the world of refined luxury</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="full-name"
                      type="text"
                      placeholder="Enter your full name"
                      className="h-12 bg-gray-50 border-gray-200 transition-colors border"
                      value={UserDetails.Name}
                      onChange={(e) => { handleInputChange(e) }}
                      name="Name"
                    />
                    <p className="text-sm text-red-500 mt-1">{Errors.Name}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-mobile" className="text-sm font-medium">
                      Mobile
                    </Label>
                    <Input
                      id="register-mobile"
                      type="number"
                      placeholder="Enter your phone number"
                      className={`h-12 bg-gray-50 border-gray-200 transition-colors ${Errors.Mobile ? 'border-red-500' : ''}`}
                      value={UserDetails.Mobile}
                      onChange={(e) => { handleInputChange(e) }}
                      name="Mobile"
                    />
                    <p className="text-sm text-red-500 mt-1">{Errors.Mobile}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      className={`h-12 bg-gray-50 border-gray-200 transition-colors ${Errors.Email ? 'border-red-500' : ''}`}
                      value={UserDetails.Email}
                      onChange={(e) => { handleInputChange(e) }}
                      name="Email"
                    />
                    <p className="text-sm text-red-500 mt-1">{Errors.Email}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={ShowPass.Password ? "text" : "password"}
                        placeholder="Create a password"
                        className={`h-12 bg-gray-50 border-gray-200 transition-colors ${Errors.Password ? 'border-red-500' : ''}`}
                        value={UserDetails.Password}
                        onChange={(e) => { handleInputChange(e) }}
                        name="Password"
                        autoComplete="off"
                      />
                      {ShowPass.Password ? (<Eye className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer h-4 text-muted-foreground" onClick={() => { togglePasswordVisibility("Password") }} />) :
                        (<EyeOff className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer h-4 text-muted-foreground" onClick={() => { togglePasswordVisibility("Password") }} />)}
                    </div>
                    <p className="text-sm text-red-500 mt-1">{Errors.Password}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={ShowPass.ConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`h-12 bg-gray-50 border-gray-200 transition-colors ${Errors.ConfirmPassword ? 'border-red-500' : ''}`}
                        value={UserDetails.ConfirmPassword}
                        onChange={(e) => { handleInputChange(e) }}
                        name="ConfirmPassword"
                        autoComplete="off"
                      />
                      {ShowPass.ConfirmPassword ? (<Eye className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer h-4 text-muted-foreground" onClick={() => { togglePasswordVisibility("ConfirmPassword") }} />) :
                        (<EyeOff className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer h-4 text-muted-foreground" onClick={() => { togglePasswordVisibility("ConfirmPassword") }} />)}
                    </div>
                    <p className="text-sm text-red-500 mt-1">{Errors.ConfirmPassword}</p>
                  </div>
                </div>

                <Button className="w-full h-12 bg-black hover:bg-black/90 text-white" disabled={isLoading}>
                  Create Account
                </Button>

                <div className="text-center border-t border-gray-100 pt-4">
                  <Link href="/auth/login" className="text-sm text-gray-500 hover:text-black transition-colors">
                    Already have an account? Sign in
                  </Link>
                </div>
              </motion.div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
