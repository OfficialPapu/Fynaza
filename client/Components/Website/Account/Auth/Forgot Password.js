"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import Link from "next/link"

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
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
                <h2 className="text-2xl font-light tracking-wide">Forgot Password</h2>
                <p className="text-gray-500 mt-2">Enter your email to reset your password</p>
              </div>

              {!isSubmitted ? (
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="h-12 bg-gray-50 border-gray-200 focus:border-black transition-colors"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-black hover:bg-black/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Reset Password"}
                  </Button>
                </form>
              ) : (
                <div className="text-center text-green-600">
                  <p>Password reset instructions have been sent to your email.</p>
                </div>
              )}

              <div className="text-center border-t border-gray-100 pt-4">
                <Link href="/auth/login" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Remember your password? Sign in
                </Link>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

