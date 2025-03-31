"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp, ShoppingBag } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { Separator } from "@/Components/ui/separator"
import useCartActions from "@/hooks/Cart"
import { useSelector } from "react-redux"
export default function OrderDetails() {
  const { PickupCost } = useCartActions();
  const { CheckoutItems, PaymentMethod, Address, Subtotal, Discount, Total, } = useSelector((state) => state.Checkout);
  const [showAllItems, setShowAllItems] = useState(false)
  const initialItemsToShow = 2;
  const hasMoreItems = CheckoutItems.length > initialItemsToShow
  const visibleItems = showAllItems ? CheckoutItems : CheckoutItems.slice(0, initialItemsToShow)

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8">
      <motion.div className="md:col-span-2" variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }
      } initial="hidden" animate="visible">
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
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="flex gap-4 bg-[#f9fafc] p-4 rounded-2xl border border-gray-100"
                >
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-xl grid place-content-center shadow-sm flex-shrink-0">
                    <Image
                      src={item.Image || "/placeholder.svg"}
                      alt={item.Name}
                      width={64}
                      height={64}
                      className="h-12 w-12 sm:h-16 sm:w-16 object-cover m-0"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800">{item.Name}</h4>
                    <div className="flex justify-between mt-2">
                      <p className="text-gray-500 text-sm">Qty: {item.Quantity}</p>
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
                </motion.div>
              ))}
            </div>

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
                      View All Items ({CheckoutItems.length})
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

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
                <p className="text-gray-800 font-medium">{Address.Name}</p>
                <p className="text-gray-600 text-sm mt-1">{Address.Address}</p>
                <p className="text-gray-600 text-sm mt-1">{Address.Phone}</p>
              </div>

              <div className="bg-[#f9fafc] rounded-2xl p-4 border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-3">Payment Method</h3>
                <p className="text-gray-600">{PaymentMethod}</p>
              </div>

              <div className="bg-[#f9fafc] rounded-2xl p-4 border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-3">Price Details</h3>

                <div className="space-y-2">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rs. {Subtotal}</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {PickupCost === 0 ? "Free" : `Rs. ${PickupCost}`}
                    </span>
                  </div>

                  {Discount && (
                    <div className="flex justify-between py-1">
                      <span className="text-green-600">Discount</span>
                      <span className="text-green-600">- Rs. {Discount}</span>
                    </div>
                  )}

                  <Separator className="my-2" />

                  <div className="flex justify-between py-1 font-bold text-gray-800">
                    <span>Grand Total</span>
                    <span>Rs. {Total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
