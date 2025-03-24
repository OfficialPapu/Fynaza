import { Check, CreditCard, Package } from "lucide-react";
import { motion } from "framer-motion"
import useCheckoutActions from "@/hooks/Checkout"
const PaymentMethod = () => {
    const { selectedPayment, setSelectedPayment } = useCheckoutActions();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl border border-gray-100"
        >
            <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#f3f7fa] flex items-center justify-center mr-3 sm:mr-4">
                        <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Payment Method</h2>
                </div>

                <div className="grid gap-4">
                    {/* COD Payment Option */}
                    <div
                        onClick={() => setSelectedPayment("Cash on delivery")}
                        className={`
            relative p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300
            ${selectedPayment === "Cash on delivery"
                                ? "bg-[#f3f7fa] shadow-md border-2 border-gray-200"
                                : "bg-white hover:bg-[#f9fafc] hover:shadow-sm border border-gray-200"
                            }
          `}
                    >
                        {selectedPayment === "Cash on delivery" && (
                            <div className="absolute top-6 sm:top-[1.9rem] right-4 sm:right-5 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </div>
                        )}
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mr-3 sm:mr-4 shadow-sm flex-shrink-0">
                                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-sm sm:text-base">Cash on Delivery</p>
                                <p className="text-gray-500 text-xs sm:text-sm mt-1">Pay when you receive your order</p>
                            </div>
                        </div>
                    </div>

                    {/* eSewa Payment Option */}
                    <div
                        onClick={() => setSelectedPayment("eSewa")}
                        className={`
            relative p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300
            ${selectedPayment === "eSewa"
                                ? "bg-[#f3f7fa] shadow-md border-2 border-gray-200"
                                : "bg-white hover:bg-[#f9fafc] hover:shadow-sm border border-gray-200"
                            }
          `}
                    >
                        {selectedPayment === "eSewa" && (
                            <div className="absolute top-6 sm:top-[1.9rem] right-4 sm:right-5 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mr-3 sm:mr-4 shadow-sm flex-shrink-0">
                                    <img
                                        src="/Media/Images/Icons/eSewa.webp"
                                        alt="eSewa"
                                        className="h-5 w-5 sm:h-6 sm:w-6 m-0"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-sm sm:text-base">Pay via eSewa</p>
                                    <p className="text-gray-500 text-xs sm:text-sm mt-1">Fast and secure payment</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bank Transfer Option (Disabled) */}
                    {/* <div className="relative p-4 sm:p-5 rounded-2xl border border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed">
          <div className="absolute top-0 left-0 w-full h-full bg-white/40 rounded-2xl flex items-center justify-center">
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-md font-medium">
              Coming Soon
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mr-3 sm:mr-4 shadow-sm flex-shrink-0">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
              </div>
              <div>
                <p className="font-bold text-gray-400 text-sm sm:text-base">Bank Transfer</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Pay directly from your bank account</p>
              </div>
            </div>
            <img src="/placeholder.svg?height=30&width=60" alt="Bank" className="h-6 sm:h-8 opacity-50" />
          </div>
        </div> */}
                </div>
            </div>
        </motion.div>
    )
}

export default PaymentMethod
