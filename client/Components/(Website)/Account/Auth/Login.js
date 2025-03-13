"use client";
import { motion } from "framer-motion"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useLoginLogic } from "./Logic/Login"

export default function LoginPage() {
  const {ShowPass, SetShowPass, isLoading, UserDetails, handleInputChange, HandelLoginForm } = useLoginLogic();
  return (
    <div className="min-h-[75vh] bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-[450px] overflow-hidden shadow-xl border-0">
        <form onSubmit={HandelLoginForm}>
          <CardContent className="p-0">
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light tracking-wide">Welcome Back</h2>
                  <p className="text-gray-500 mt-2">Sign in to your account</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="h-12 bg-gray-50 border-gray-200 transition-colors"
                      name="Email"
                      value={UserDetails.Email}
                      onChange={(e) => { handleInputChange(e) }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={ShowPass ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-12 bg-gray-50 border-gray-200 transition-colors"
                        name="Password"
                        value={UserDetails.Password}
                        onChange={(e) => { handleInputChange(e) }}
                        autoComplete="off"
                      />
                      {ShowPass ? (<Eye className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer h-5" onClick={() => { SetShowPass(false) }} />) :
                        (<EyeOff className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer h-5" onClick={() => { SetShowPass(true) }} />)}
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 bg-black hover:bg-black/90 text-white" disabled={isLoading}>
                  Sign In
                </Button>

                <div className="space-y-4 text-center">
                  <Link href="/auth/forgot-password" className="text-sm text-gray-500 hover:text-black transition-colors">
                    Forgot your password?
                  </Link>
                  <div className="border-t border-gray-100 pt-4">
                    <Link href="/auth/register" className="text-sm text-gray-500 hover:text-black transition-colors">
                      Don't have an account? Create one
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

