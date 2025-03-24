"use client"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Breadcrumb } from "@/Components/ui/Breadcrumb"
import { useSelector } from "react-redux"
import useCartActions from "@/hooks/Cart"
import { motion } from "framer-motion"
import OrderSummary from "./OrderSummary"

const Cart = () => {
  const { HandelUpdateQuantity, HandelRemoveFromCart, BreadcrumbView, CartItems } = useCartActions();
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#f3f7fa] to-[#f9fafc]">
      <div className="mx-auto sm:px-4 py-4">
        <div className="mb-2">
          <Breadcrumb items={BreadcrumbView} />
        </div>

        {CartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div
              className="lg:col-span-2 space-y-4"
            >
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5 text-gray-600" />
                    Cart Items ({CartItems.length})
                  </h2>
                </div>

                <div className="space-y-4">
                  {CartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#f9fafc] p-4 rounded-xl border border-gray-100 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 bg-white rounded-lg flex items-center justify-center p-2 border border-gray-100 shadow-sm">
                          <img
                            src={item.Image || "/placeholder.svg"}
                            alt={item.Name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                            {item.Name.length > 40 ? item.Name.substring(0, 40) + "..." : item.Name}
                          </h3>
                          <div className="mt-1">
                            {item.PriceAfterDiscount ? (
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="line-through text-gray-400 text-sm">
                                  Rs. {item.Price.toLocaleString()}
                                </span>
                                <span className="text-gray-800 font-semibold">
                                  Rs. {item.PriceAfterDiscount.toLocaleString()}
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                  {Math.round(((item.Price - item.PriceAfterDiscount) / item.Price) * 100)}% off
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-800 font-semibold">Rs. {item.Price.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                        <div className="flex items-center space-x-1 sm:space-x-2 bg-white rounded-lg border border-gray-200 p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={async () =>
                              await HandelUpdateQuantity(item.ProductID, item.Quantity - 1, item.CartItemID)
                            }
                            className="h-7 w-7 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            disabled={item.Quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.Quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={async () =>
                              await HandelUpdateQuantity(item.ProductID, item.Quantity + 1, item.CartItemID)
                            }
                            className="h-7 w-7 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={async () => await HandelRemoveFromCart(item.ProductID, item.CartItemID)}
                          className="h-8 w-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <OrderSummary />

            {/* Order Summary */}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-8 text-center min-h-[50vh] grid place-content-center border border-gray-100"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-[#f3f7fa] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-800">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet. Explore our products and find something you'll
                love!
              </p>
              <Link href="/products">
                <Button className="px-8 py-6 text-white bg-gray-900 hover:bg-black rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Shopping
                  <ShoppingBag className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Cart

