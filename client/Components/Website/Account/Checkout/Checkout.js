"use client"
import { useEffect } from "react";
import { ArrowRight, Truck } from "lucide-react";
import { Button } from "@/Components/ui/button"
import { motion } from "framer-motion"
import useCartActions from "@/hooks/Cart";
import AddNewAddress from "@/Components/Website/Account/Checkout/AddNewAddress";
import PaymentMethodComp from "@/Components/Website/Account/Checkout/PaymentMethod";
import Products from "@/Components/Website/Account/Checkout/Products";
import useCheckoutActions from "@/hooks/Checkout";

const Checkout = () => {
    const { Total, CartItems } = useCartActions();
    const { AddressID, HandelCheckout, PaymentMethod, router } = useCheckoutActions();
    useEffect(() => {
        if (!(CartItems?.length > 0)) router.push('/account/cart');
    }, [])

    return (
        <div className="min-h-[70vh] sm:bg-white pb-12">
            <div className="relative bg-gradient-to-r from-[#f3f7fa] via-[#e9f0f7] to-[#f3f7fa] pb-20">
                <div className="container mx-auto pt-12 px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800">Checkout</h1>
                    <p className="text-center text-gray-600 mt-2 max-w-md mx-auto">
                        Complete your purchase securely and get ready for delivery
                    </p>
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

            <div className="mx-auto sm:px-4 -mt-16 relative z-1">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl border border-gray-100 order-2 md:order-1"
                        >
                            <Products />
                        </motion.div>

                        <div className="space-y-6 sm:space-y-8 order-1 md:order-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl border border-gray-100"
                            >
                                <AddNewAddress />
                            </motion.div>
                            <PaymentMethodComp />
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 sm:mt-8 bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl border border-gray-100"
                    >
                        <div className="p-4 sm:p-6 md:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#f3f7fa] flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                                        <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                                    </div>
                                    <div>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-800">Total: Rs. {Total.toLocaleString()}</p>
                                        <p className="text-gray-500 mt-1 text-xs sm:text-sm">Including shipping and taxes</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <Button
                                        size="lg"
                                        className="rounded-xl px-6 sm:px-10 py-5 sm:py-6 bg-gray-900 hover:bg-black text-white text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto mb-2"
                                        disabled={!AddressID || !PaymentMethod} onClick={(e) => HandelCheckout()}
                                    >
                                        Place Order
                                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    </Button>
                                    {(!AddressID || !PaymentMethod) && (
                                        <p className="text-amber-600 text-xs">Please select a Address and Payment Method option to continue</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
