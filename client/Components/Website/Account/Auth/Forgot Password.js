"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import Link from "next/link"
import axios from "@/lib/axios"
import { LoaderCircle } from "lucide-react"
import { useSnackbar } from "notistack"

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [Email, setEmail] = useState("")
  const { enqueueSnackbar: ShowNotification } = useSnackbar();

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post("api/auth/forgot-password", { Email })
      if (response.status == 200) {
        ShowNotification(response.data.message, { variant: 'success' });
      }
    } catch (error) {
      ShowNotification(error.response.data.message, { variant: 'error' });
    }finally{
      setIsLoading(false)
    }
  }

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
              <form className="space-y-6" onSubmit={handleSubmitForm}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 bg-gray-50 border-gray-200 focus:border-black transition-colors"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-black/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? <><LoaderCircle className="w-5 h-5 animate-spin" />Sending...</> : "Reset Password"}
                </Button>
              </form>
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
