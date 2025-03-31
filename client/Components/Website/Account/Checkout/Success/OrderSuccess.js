"use client"
import Link from "next/link"
import axios from "@/lib/axios"
import { motion } from "framer-motion"
import useCartActions from "@/hooks/Cart"
import { useRouter } from "next/navigation"
import { Button } from "@/Components/ui/button"
import useCheckoutActions from "@/hooks/Checkout"
import { ArrowRight, Check, } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { ConvertCartToCheckout, HandelOrderPlace } from "@/Components/Website/Redux/Slices/CheckoutSlice"
import OrderStatusCard from "@/Components/Website/Account/Checkout/Success/OrderStatusCard"
import OrderDetails from "@/Components/Website/Account/Checkout/Success/OrderDetails"
import { ClearCart } from "@/Components/Website/Redux/Slices/CartSlice"

const PlaceOrder = async (CartItems, PaymentMethod, AddressID, PickupCost, PickupLocation, Total, Subtotal, Discount, UserID, dispatch) => {
    const orderData = { CartItems, PaymentMethod, PickupLocation, AddressID, PickupCost, Total, Subtotal, Discount, UserID };
    try {
        const response = await axios.post("api/checkout/success", orderData);
        if (response.status == 201) {
            const OrderData = { OrderID: response.data.OrderID, Total, Subtotal, Discount };
            dispatch(HandelOrderPlace(OrderData));
            dispatch(ConvertCartToCheckout());
            dispatch(ClearCart());
        }
    } catch (error) {

    }
}

export default function OrderSuccessPage() {
    const router = useRouter();
    let { Total, Subtotal, Discount, CartItems, PickupCost, PickupLocation, UserID } = useCartActions();
    const { AddressID, PaymentMethod, dispatch } = useCheckoutActions();
    const hasPlacedOrder = useRef(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    useEffect(() => {
        if (!AddressID || !PaymentMethod) router.push('/account/cart');
        if (!CartItems?.length || hasPlacedOrder.current || isOrderPlaced) return;
        hasPlacedOrder.current = true;
        setIsOrderPlaced(true);
        const placeOrder = async () => { await PlaceOrder(CartItems, PaymentMethod, AddressID, PickupCost, PickupLocation, Total, Subtotal, Discount, UserID, dispatch) };
        placeOrder();
    }, []);


    return (
        <div className="min-h-[70vh] sm:bg-white pb-12">
            <div className="relative bg-gradient-to-r from-[#f3f7fa] via-[#e9f0f7] to-[#f3f7fa] pb-20">
                <div className="container mx-auto pt-12 px-4 relative z-10">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <Check className="h-10 w-10 text-green-600" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800">Order Placed!</h1>
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

            <div className="mx-auto sm:px-4 -mt-16 relative z-1">
                <div className="max-w-5xl mx-auto">
                    <OrderStatusCard />
                    <OrderDetails />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex justify-center mt-8"
                    >
                        <Link href="/">
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

