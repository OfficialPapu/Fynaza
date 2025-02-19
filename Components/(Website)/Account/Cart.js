"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react"
import { Minus, Plus, X, Home, ShoppingCart, ShoppingBag, UserRound } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { RadioGroup } from "@/Components/ui/radio-group"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Separator } from "@/Components/ui/separator"
import { Checkbox } from "@/Components/ui/checkbox"
import { Breadcrumb } from "@/Components/ui/Breadcrumb";

const shippingOptions = [
  { id: "Inside-Valley", value: "Inside Valley", name: "Inside Valley", price: 100 },
  { id: "Outside-Valley", value: "Outside Valley", name: "Outside Valley", price: 200 },
  { id: "Store-Pickup", value: "Store Pickup", name: "Store Pickup", price: 0 },
  { id: "Instant-Delivery", value: "Instant Delivery", name: "Instant Delivery", price: 0 },
]
const Cart = ({ initialCartItems }) => {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [BreadcrumbView, setBreadcrumbView] = useState([
    { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "Account", href: "/account", icon: <UserRound className="w-4 h-4" /> },
    { label: "Cart", href: "/account/cart", icon: <ShoppingCart className="w-4 h-4" /> }
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((cartItems) =>
      cartItems.map((item) => (item.id == id ? { ...item, quantity: Math.max(1, newQuantity) } : item)),
    )
  }
  const removeItem = (id) => {
    setCartItems((cartItems) => cartItems.filter((item) => item.id !== id))
  }

  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  const handleShippingOptionChange = (value) => {
    setSelectedShippingOption(value);
    setShippingCost(shippingOptions.find((option) => option.value === value).price);
  };

  let subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  let discount = 100;
  let total = Math.max(0, subtotal + shippingCost - discount);

  return (
    <div className="min-h-[70vh] bg-[#f3f7fa]">
      <div className="container mx-auto px-4 pb-8 pt-4">
        <div className="mb-2">
          <Breadcrumb items={BreadcrumbView} />
        </div>
        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h2 className="font-semibold text-black">{item.name}</h2>
                      <p className="text-gray-600">Rs. {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 rounded-full"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 rounded-full text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Cart Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipping Options</h3>
                  <RadioGroup className="space-y-2">
                    {shippingOptions.map((shippingOption) => (
                      <div key={shippingOption.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedShippingOption == shippingOption.value}
                            onClick={() => handleShippingOptionChange(shippingOption.value)}
                            value={shippingOption.value}
                            id={shippingOption.id}
                            name={shippingOption.name}
                          />
                          <Label htmlFor={shippingOption.id}>{shippingOption.name}</Label>
                        </div>
                        <span>Rs. {shippingOption.price}</span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold mb-2">Total Summary</h3>
                  <div className="flex justify-between">
                    <span>Sub total</span>
                    <span>Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span>Rs. {shippingCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>- Rs. {discount}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rs. {total}</span>
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
