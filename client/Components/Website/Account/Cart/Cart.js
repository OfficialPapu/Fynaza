"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react"
import { Minus, Plus, X, Home, ShoppingCart, ShoppingBag, UserRound, CreditCardIcon, TagIcon } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { RadioGroup } from "@/Components/ui/radio-group"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Separator } from "@/Components/ui/separator"
import { Checkbox } from "@/Components/ui/checkbox"
import { Breadcrumb } from "@/Components/ui/Breadcrumb";
import { useSelector } from "react-redux";
import useCartActions from "@/hooks/Cart";

const shippingOptions = [
  { ID: "Inside-Valley", Value: "Inside Valley", Name: "Inside Valley", Price: 100 },
  { ID: "Outside-Valley", Value: "Outside Valley", Name: "Outside Valley", Price: 200 },
  { ID: "Store-Pickup", Value: "Store Pickup", Name: "Store Pickup", Price: 0 },
  { ID: "Instant-Delivery", Value: "Instant Delivery", Name: "Instant Delivery", Price: 0 },
]
const Cart = () => {

  const CartItems = useSelector((state) => state.Cart.CartItems);
  const [cartItems, setCartItems] = useState(CartItems);
  useEffect(() => {
    setCartItems(CartItems);
  }, [CartItems])

  const { HandelUpdateQuantity, HandelRemoveFromCart } = useCartActions();

  const [BreadcrumbView, setBreadcrumbView] = useState([
    { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "Account", href: "/account", icon: <UserRound className="w-4 h-4" /> },
    { label: "Cart", href: "/account/cart", icon: <ShoppingCart className="w-4 h-4" /> }
  ]);

  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  const handleShippingOptionChange = (Value) => {
    setSelectedShippingOption(Value);
    setShippingCost(shippingOptions.find((option) => option.Value === Value).Price);
  };

  let Subtotal = useSelector((state) => state.Cart.OriginalTotal);
  let Discount = (useSelector((state) => state.Cart.OriginalTotal - state.Cart.DiscountedTotal)) || null;
  let Total = Math.max(0, Subtotal + shippingCost - Discount);

  return (
    <div className="min-h-[70vh] bg-[#f3f7fa]">
      <div className="container mx-auto px-4 pb-8 pt-4">
        <div className="mb-2">
          <Breadcrumb items={BreadcrumbView} />
        </div>
        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.Image || "/placeholder.svg"}
                      alt={item.Name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-black">{item.Name.substring(0, 40) + "...."}</p>
                      <p className="text-gray-600">
                        {item.PriceAfterDiscount ? (
                          <>
                            <span className="line-through decoration-red-500 text-sm">Rs. {item.Price}</span>
                            <span className="text-md ml-2">Rs. {item.PriceAfterDiscount}</span>
                          </>
                        ) : (
                          <span>Rs. {item.Price}</span>
                        )}
                      </p>
                    </div>

                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={async () => await HandelUpdateQuantity(item.ProductID, item.Quantity - 1, item.CartItemID)}
                      className="h-8 w-8 rounded-full"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.Quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={async () => await HandelUpdateQuantity(item.ProductID, item.Quantity + 1, item.CartItemID)}
                      className="h-8 w-8 rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={async () => await HandelRemoveFromCart(item.ProductID, item.CartItemID)}
                      className="h-8 w-8 rounded-full text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="space-y-6 pt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4 pb-4">Shipping Options</h3>
                  <RadioGroup className="space-y-2">
                    {shippingOptions.map((shippingOption) => (
                      <div key={shippingOption.ID} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedShippingOption == shippingOption.Value}
                            onClick={() => handleShippingOptionChange(shippingOption.Value)}
                            value={shippingOption.Value}
                            id={shippingOption.ID}
                            name={shippingOption.Name}
                          />
                          <Label htmlFor={shippingOption.ID} className="cursor-pointer">{shippingOption.Name}</Label>
                        </div>
                        <span>Rs. {shippingOption.Price}</span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <CreditCardIcon className="h-5 w-5 text-gray-500" />
                    Price Details
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span>Rs. {Subtotal}</span>
                    </div>

                    {Discount ? <>
                      <div className="flex justify-between py-1">
                        <span className="flex items-center gap-1 text-green-600">
                          <TagIcon className="h-4 w-4" />
                          Discount
                        </span>
                        <span className="text-green-600">- Rs. {Discount}</span>
                      </div>
                    </> : ""}

                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-400">Delivery Charge</span>
                      <span>{shippingCost === 0 ? "Free" : `Rs. ${shippingCost}`}</span>
                    </div>
                  </div>

                  <Separator />
                  <div className="flex justify-between w-full text-lg font-bold">
                    <span>Total</span>
                    <span>Rs. {Total}</span>
                  </div>
                </div>
                <Button className="w-full bg-gray-800 text-white hover:bg-gray-900">
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center min-h-[50vh] grid place-content-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold mb-2 text-black">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <Button className="text-white bg-gray-800 hover:bg-gray-900">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
