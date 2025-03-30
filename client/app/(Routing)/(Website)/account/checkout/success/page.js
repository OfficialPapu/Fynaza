"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Home,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/Components/ui/separator"
import { Progress } from "@/Components/ui/progress"
import useCheckoutActions from "@/hooks/Checkout"
import useCartActions from "@/hooks/Cart"
import axios from "@/lib/axios"
import { convertCartToCheckout  } from "@/Components/Website/Redux/Slices/CheckoutSlice"
import { useSelector } from "react-redux"


const PlaceOrder = async (CartItems, PaymentMethod, AddressID, PickupCost, PickupLocation, Total, UserID) => {
  const orderData = {
    CartItems,
    PaymentMethod,
    PickupLocation,
    AddressID,
    PickupCost,
    Total,
    UserID
  };
  try {
    const response = await axios.post("api/checkout/success", orderData);
    if (response.status == 201) {
      // console.log(response.data);
      dispatch(Converted());
    }
  } catch (error) {

  }
}

export default function OrderSuccessPage() {

  let { Total, CartItems, PickupCost, PickupLocation, UserID } = useCartActions();
  const { AddressID, PaymentMethod, dispatch } = useCheckoutActions();
  const ConvertedItem = useSelector((state) => state.Checkout.PaymentMethod);
  dispatch(convertCartToCheckout());

  console.log(ConvertedItem);
  
  const hasPlacedOrder = useRef(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    if (CartItems?.length > 0 && !hasPlacedOrder.current && !isOrderPlaced) {
      hasPlacedOrder.current = true;
      setIsOrderPlaced(true);

      const placeOrder = async () => {
        await PlaceOrder(
          CartItems,
          PaymentMethod,
          AddressID,
          PickupCost,
          PickupLocation,
          Total,
          UserID
        );
      };

      placeOrder();
    }
  }, [CartItems, AddressID, PaymentMethod, PickupCost, PickupLocation, Total, UserID, isOrderPlaced]);


  const [orderDetails, setOrderDetails] = useState({
    orderNumber: "ORD-2023-78945",
    orderDate: "March 25, 2025",
    paymentMethod: "Cash on Delivery",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street, Kathmandu, 44600",
      phone: "+977 9812345678",
    },
    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 12500,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Smartphone Case with Card Holder",
        price: 1200,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    subtotal: 14900,
    shipping: 100,
    discount: 1000,
    total: 14000,
    estimatedDelivery: "March 28 - March 30, 2025",
  })

  const [showAllItems, setShowAllItems] = useState(false)
  const [progress, setProgress] = useState(0)

  // Simulate progress for order processing
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Determine how many items to show initially
  const initialItemsToShow = 2
  const hasMoreItems = orderDetails.items.length > initialItemsToShow
  const visibleItems = showAllItems ? orderDetails.items : orderDetails.items.slice(0, initialItemsToShow)

  return (
    <div className="min-h-[70vh] sm:bg-white pb-12">
      {/* Header with wave */}
      <div className="relative bg-gradient-to-r from-[#f3f7fa] via-[#e9f0f7] to-[#f3f7fa] pb-20">
        <div className="container mx-auto pt-12 px-4 relative z-10">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800">Order Confirmed!</h1>
            <p className="text-center text-gray-600 mt-2 max-w-md mx-auto">
              Your order has been placed successfully and is being processed
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden md:h-[252px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto sm:px-4 -mt-16 relative z-1">
        <div className="max-w-5xl mx-auto">
          {/* Order Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl border border-gray-100 mb-8"
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Order #{orderDetails.orderNumber}</h2>
                  <p className="text-gray-500 text-sm mt-1">Placed on {orderDetails.orderDate}</p>
                </div>
                <div className="flex gap-3">
                  <Link href="/account/orders">
                    <Button size="sm" className="rounded-xl bg-gray-900 hover:bg-black text-white">
                      Track Order
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-[#f9fafc] rounded-2xl p-4 md:p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Order Status</h3>
                <Progress value={progress} className="h-2 mb-6" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-800">Order Placed</p>
                    <p className="text-xs text-gray-500">Confirmed</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-800">Processing</p>
                    <p className="text-xs text-gray-500">In progress</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      <Truck className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-400">Shipped</p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      <Home className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-400">Delivered</p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 bg-blue-50 p-3 rounded-xl">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-blue-700">
                    Estimated delivery: <span className="font-medium">{orderDetails.estimatedDelivery}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Details */}
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {/* Left Column - Order Items */}
            <motion.div className="md:col-span-2" variants={containerVariants} initial="hidden" animate="visible">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-6">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-[#f3f7fa] flex items-center justify-center mr-3">
                      <ShoppingBag className="h-5 w-5 text-gray-700" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Order Items</h2>
                  </div>

                  <div className="space-y-4">
                    {visibleItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="flex gap-4 bg-[#f9fafc] p-4 rounded-2xl border border-gray-100"
                      >
                        <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-xl grid place-content-center shadow-sm flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="h-12 w-12 sm:h-16 sm:w-16 object-cover m-0"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <div className="flex justify-between mt-2">
                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                            <p className="font-semibold text-gray-800">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* View All Items Button */}
                  {hasMoreItems && (
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 hover:bg-primary/5 rounded-xl"
                        onClick={() => setShowAllItems(!showAllItems)}
                      >
                        {showAllItems ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            View All Items ({orderDetails.items.length})
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-full">
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="bg-[#f9fafc] rounded-2xl p-4 border border-gray-100">
                      <h3 className="font-medium text-gray-800 mb-3">Shipping Address</h3>
                      <p className="text-gray-800 font-medium">{orderDetails.shippingAddress.name}</p>
                      <p className="text-gray-600 text-sm mt-1">{orderDetails.shippingAddress.address}</p>
                      <p className="text-gray-600 text-sm mt-1">{orderDetails.shippingAddress.phone}</p>
                    </div>

                    <div className="bg-[#f9fafc] rounded-2xl p-4 border border-gray-100">
                      <h3 className="font-medium text-gray-800 mb-3">Payment Method</h3>
                      <p className="text-gray-600">{orderDetails.paymentMethod}</p>
                    </div>

                    <div className="bg-[#f9fafc] rounded-2xl p-4 border border-gray-100">
                      <h3 className="font-medium text-gray-800 mb-3">Price Details</h3>

                      <div className="space-y-2">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Subtotal</span>
                          <span>Rs. {orderDetails.subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Shipping</span>
                          <span>
                            {orderDetails.shipping === 0 ? "Free" : `Rs. ${orderDetails.shipping.toLocaleString()}`}
                          </span>
                        </div>

                        {orderDetails.discount > 0 && (
                          <div className="flex justify-between py-1">
                            <span className="text-green-600">Discount</span>
                            <span className="text-green-600">- Rs. {orderDetails.discount.toLocaleString()}</span>
                          </div>
                        )}

                        <Separator className="my-2" />

                        <div className="flex justify-between py-1 font-bold text-gray-800">
                          <span>Total</span>
                          <span>Rs. {orderDetails.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Continue Shopping Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-8"
          >
            <Link href="/products">
              <Button
                size="lg"
                className="rounded-xl px-8 py-6 bg-gray-900 hover:bg-black text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

