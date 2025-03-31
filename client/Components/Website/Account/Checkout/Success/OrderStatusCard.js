"use client"
import { format } from "date-fns";
import { useState, useEffect } from "react"
import { Check, Clock, Home, Package, Truck } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Progress } from "@/Components/ui/progress"
import { useSelector } from "react-redux"
export default function OrderStatusCard() {
    const OrderID = useSelector((state) => state.Checkout.OrderID);
    const TodayDate = format(new Date(), "d MMM yyyy");
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl border border-gray-100 mb-8"
        >
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Order #{OrderID}</h2>
                        <p className="text-gray-500 text-sm mt-1">Placed on {TodayDate}</p>
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
                            Estimated delivery: <span className="font-medium">1 to 2 Business Days</span>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>

    )
}
