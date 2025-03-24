"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Calendar, CheckCircle2, Clock, Download, MapPin, Package2, Receipt, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"

export default function OrderSuccess() {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Mock order data - replace with your actual order data
  const orderData = {
    orderNumber: "ORD-7829",
    date: "March 25, 2025",
    estimatedDelivery: "March 30, 2025",
    items: [
      {
        id: 1,
        name: "Classic Stainless Steel Rings",
        price: 3640,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    subtotal: 4000,
    discount: 360,
    shipping: 0,
    total: 3640,
    customer: {
      name: "Papu Yadav",
      address: "Saranchiya, Saranchiya",
      phone: "9826756598",
    },
    paymentMethod: "Cash on Delivery",
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const scaleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-[70vh] bg-[#f3f7fa] relative overflow-hidden">
      {/* Confetti animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              initial={{
                top: "-10%",
                left: `${Math.random() * 100}%`,
                backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                top: "100%",
                rotate: Math.random() * 360,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeOut",
                delay: Math.random() * 1,
              }}
            />
          ))}
        </div>
      )}


      <div className="mx-auto px-4 py-6 sm:py-10">
        <motion.div className="max-w-7xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div
            className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-8 md:mb-12"
            variants={itemVariants}
          >
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.5,
                }}
              >
                <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
              </motion.div>
            </motion.div>

            <div className="text-center md:text-left">
              <motion.div variants={fadeInVariants}>
                <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-100">Order Confirmed</Badge>
              </motion.div>
              <motion.h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" variants={fadeInVariants}>
                Order Placed Successfully!
              </motion.h1>
              <motion.p className="text-sm md:text-base text-gray-600 max-w-xl" variants={fadeInVariants}>
                We've received your order and are getting it ready. You'll receive a confirmation email with your order
                details.
              </motion.p>
            </div>
          </motion.div>

          {/* Order details and summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Left column - Order details */}
            <div className="md:col-span-2 space-y-4 md:space-y-8">
              {/* Order info */}
              <motion.div className="bg-white rounded-xl overflow-hidden border" variants={scaleVariants}>
                <div className="px-4 md:px-6 py-4 md:py-5 border-b bg-[#f3f7fa] bg-opacity-30">
                  <h2 className="font-semibold text-base md:text-lg">Order Information</h2>
                </div>

                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center mb-1">
                        <Receipt className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">Order Number</span>
                      </div>
                      <p className="font-medium">{orderData.orderNumber}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="flex items-center mb-1">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">Order Date</span>
                      </div>
                      <p className="font-medium">{orderData.date}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="flex items-center mb-1">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">Shipping Address</span>
                      </div>
                      <p className="font-medium">{orderData.customer.name}</p>
                      <p className="text-sm text-gray-600">{orderData.customer.address}</p>
                      <p className="text-sm text-gray-600">{orderData.customer.phone}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="flex items-center mb-1">
                        <Truck className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">Delivery Estimate</span>
                      </div>
                      <p className="font-medium">{orderData.estimatedDelivery}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Order items */}
              <motion.div className="bg-white rounded-xl overflow-hidden border" variants={scaleVariants}>
                <div className="px-4 md:px-6 py-4 md:py-5 border-b bg-[#f3f7fa] bg-opacity-30">
                  <h2 className="font-semibold text-base md:text-lg">Order Items</h2>
                </div>

                <div className="divide-y">
                  {orderData.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="p-4 md:p-6 flex"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{
                        backgroundColor: "#f9fafb",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        className="h-16 w-16 md:h-20 md:w-20 rounded-lg bg-[#f3f7fa] flex-shrink-0 mr-3 md:mr-4 overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <h3 className="font-medium text-sm md:text-base">{item.name}</h3>
                          <p className="font-semibold text-sm md:text-base mt-1 sm:mt-0">Rs. {item.price}</p>
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Delivery tracking */}
              <motion.div className="bg-white rounded-xl overflow-hidden border" variants={scaleVariants}>
                <div className="px-4 md:px-6 py-4 md:py-5 border-b bg-[#f3f7fa] bg-opacity-30">
                  <h2 className="font-semibold text-base md:text-lg">Delivery Status</h2>
                </div>

                <div className="p-4 md:p-6">
                  <motion.div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center">
                      <motion.div
                        className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 1.2,
                        }}
                      >
                        <Package2 className="h-5 w-5 text-green-600" />
                      </motion.div>
                      <div>
                        <p className="font-medium">Order Confirmed</p>
                        <p className="text-sm text-gray-500">Your order has been received</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {orderData.date}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    <div className="w-10 flex justify-center">
                      <motion.div
                        className="h-full w-0.5 bg-gray-200"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                      ></motion.div>
                    </div>
                    <div className="flex-1 pb-6 md:pb-8">
                      <p className="text-sm text-gray-500 italic">We'll update you when your order ships.</p>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="w-full">
                      Track Your Order
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right column - Order summary */}
            <div className="space-y-4 md:space-y-8">
              <motion.div className="bg-white rounded-xl overflow-hidden border sticky top-8" variants={itemVariants}>
                <div className="px-4 md:px-6 py-4 md:py-5 border-b bg-[#f3f7fa] bg-opacity-30">
                  <h2 className="font-semibold text-base md:text-lg">Order Summary</h2>
                </div>

                <div className="p-4 md:p-6">
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>Rs. {orderData.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <motion.span
                        className="text-green-600"
                        initial={{ color: "#059669" }}
                        animate={{ color: ["#059669", "#10b981", "#059669"] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        - Rs. {orderData.discount}
                      </motion.span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>Rs. {orderData.shipping}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <motion.div
                        className="flex justify-between font-semibold"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                      >
                        <span>Total</span>
                        <span>Rs. {orderData.total}</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="mt-6 pt-6 border-t"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    <div className="flex items-center mb-4">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-[#f3f7fa] flex items-center justify-center mr-3"
                        whileHover={{ rotate: 10 }}
                      >
                        <Receipt className="h-4 w-4 text-gray-700" />
                      </motion.div>
                      <div>
                        <p className="font-medium">{orderData.paymentMethod}</p>
                        <p className="text-xs text-gray-500">Pay when you receive your order</p>
                      </div>
                    </div>

                    <Link href="/" className="block">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" className="w-full">
                          Continue Shopping
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div className="bg-white rounded-xl p-4 md:p-6 border" variants={itemVariants}>
                <h3 className="font-medium mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your order, please contact our customer support.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

