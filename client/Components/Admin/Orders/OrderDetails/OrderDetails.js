"use client"
import { CreditCard, FileText, Truck } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Separator } from "@/Components/ui/separator"
import { TabsContent } from "@/Components/ui/tabs"
import useOrderDetailsActions from "./useOrderDetailsActions"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"

const OrderDetails = () => {
    const { orderData } = useOrderDetailsActions();
    return (
        <TabsContent value="details" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Shipping Information</CardTitle>
                            <Truck className="h-5 w-5 text-slate-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-slate-900 dark:text-white">Shipping Address</h4>
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900">
                                    <p className="font-medium text-slate-900 dark:text-white">{orderData.customer.name}</p>
                                    <p className="text-slate-500 dark:text-slate-400">{orderData.shipping.address}</p>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        {orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.zipCode}
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-400">{orderData.shipping.country}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Shipping Method:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{orderData.shipping.method}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Tracking Number:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        {orderData.shipping.trackingNumber}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Estimated Delivery:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        {orderData.shipping.estimatedDelivery}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Payment Information</CardTitle>
                            <CreditCard className="h-5 w-5 text-slate-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Payment Method:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{orderData.payment.method}</span>
                                </div>
                                {orderData.payment.cardType && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Card:</span>
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            {orderData.payment.cardType} ending in {orderData.payment.cardLast4}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Transaction ID:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        {orderData.payment.transactionId}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Payment Status:</span>
                                    <Badge
                                        variant="outline"
                                        className={`${orderData.payment.status === "paid"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                            } px-2 py-0.5 text-xs font-medium`}
                                    >
                                        {orderData.payment.status === "paid" ? "Paid" : "Pending"}
                                    </Badge>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Subtotal:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{orderData.payment.subtotal}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Tax:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{orderData.payment.tax}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Shipping:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{orderData.payment.shipping}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Discount:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{orderData.payment.discount}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-900 dark:text-white">Total:</span>
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                                        {orderData.payment.total}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 border-t bg-slate-50 px-4 py-3 sm:px-6 sm:py-4 dark:border-slate-800 dark:bg-slate-900">
                    </CardFooter>
                </Card>

                {/* Notes */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Notes</CardTitle>
                            <FileText className="h-5 w-5 text-slate-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {orderData.notes ? (
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
                                <p className="text-slate-700 dark:text-slate-300">{orderData.notes}</p>
                            </div>
                        ) : (
                            <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
                                <p className="text-sm italic text-slate-400 dark:text-slate-500">No notes added to this order.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
    )
}

export default OrderDetails
