import { ChevronDown, ChevronUp, ShoppingBag, TagIcon } from "lucide-react";
import { Button } from "@/Components/ui/button"
import Image from "next/image"
import useCartActions from "@/hooks/Cart";
import useCheckoutActions from "@/hooks/Checkout";

const Products = () => {
    const { Subtotal, Discount, Total, PickupCost, PickupLocation, CartItems } = useCartActions();
    const { showAllProducts, setShowAllProducts, hasMoreProducts, visibleProducts } = useCheckoutActions();
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#f3f7fa] flex items-center justify-center mr-3 sm:mr-4">
                        <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Your Cart</h2>
                </div>
            </div>

            <div className="space-y-4 sm:space-y-5 mt-4 sm:mt-6">
                {visibleProducts.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-3 sm:gap-5 bg-[#f9fafc] p-3 sm:p-5 rounded-2xl border border-gray-100"
                    >
                        <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-xl grid place-content-center shadow-sm flex-shrink-0">
                            <Image
                                src={item.Image || "/placeholder.svg"}
                                alt={item.Name}
                                width={64}
                                height={64}
                                className="h-12 w-12 sm:h-16 sm:w-16 object-cover m-0"
                            />
                            <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-medium shadow-sm">
                                {item.Quantity}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm sm:text-base truncate">
                                {item.Name.length > 30 ? item.Name.substring(0, 30) + "..." : item.Name}
                            </h4>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1">
                                Unit Price:
                                {item.PriceAfterDiscount ? (
                                    <>
                                        <span className="line-through decoration-red-500 text-xs sm:text-sm">
                                            {" "}
                                            Rs. {item.Price}
                                        </span>
                                        <span className="text-sm sm:text-md ml-2">Rs. {item.PriceAfterDiscount}</span>
                                    </>
                                ) : (
                                    <span>Rs. {item.Price}</span>
                                )}
                            </p>

                            <p className="font-bold mt-1 sm:mt-2 text-gray-800 text-sm sm:text-base">
                                Rs.{" "}
                                {item.PriceAfterDiscount
                                    ? (item.PriceAfterDiscount * item.Quantity).toLocaleString()
                                    : (item.Price * item.Quantity).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View All Products Button */}
            {hasMoreProducts && (
                <div className="hidden sm:flex justify-center mt-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 hover:bg-primary/5 rounded-xl"
                        onClick={() => setShowAllProducts(!showAllProducts)}
                    >
                        {showAllProducts ? (
                            <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Show Less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                View All Products ({CartItems.length})
                            </>
                        )}
                    </Button>
                </div>
            )}

            <div className="mt-6 sm:mt-8 bg-[#f9fafc] p-4 sm:p-5 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 text-sm sm:text-base">Pickup</span>
                    <span className="font-medium text-sm sm:text-base">{PickupLocation}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
                    <span className="font-medium text-sm sm:text-base">Rs. {Subtotal.toLocaleString()}</span>
                </div>
                {Discount ? (
                    <div className="flex justify-between items-center mb-3">
                        <span className="flex items-center gap-1 text-green-600 text-sm sm:text-base">
                            <TagIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            Discount
                        </span>
                        <span className="text-green-600 text-sm sm:text-base">- Rs. {Discount}</span>
                    </div>
                ) : null}
                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 text-sm sm:text-base">Shipping</span>
                    <span className="font-medium text-sm sm:text-base">Rs. {PickupCost.toLocaleString()}</span>
                </div>
                <div className="h-px bg-gray-200 my-3"></div>
                <div className="flex justify-between items-center font-bold text-base sm:text-lg text-gray-800">
                    <span>Total</span>
                    <span>Rs. {Total.toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}

export default Products
