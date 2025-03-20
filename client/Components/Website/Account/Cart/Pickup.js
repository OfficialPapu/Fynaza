"use client";
import React from 'react'
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
const Pickup = ({shippingOptions}) => {
    return (
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
    )
}

export default Pickup
