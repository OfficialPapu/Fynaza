"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-[450px] overflow-hidden shadow-xl border-0">
        <CardContent className="p-0">
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
                    className="h-12 bg-gray-50 border-gray-200 focus:border-black transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 bg-gray-50 border-gray-200 focus:border-black transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    className="h-12 bg-gray-50 border-gray-200 focus:border-black transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    className="h-12 bg-gray-50 border-gray-200 focus:border-black transition-colors"
                  />
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
        </CardContent>
      </Card>
    </div>
  )
}

