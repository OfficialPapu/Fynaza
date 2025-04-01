"use client"
import { useParams, useRouter } from "next/navigation"
import { Package, Send, User } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { TabsContent } from "@radix-ui/react-tabs"
import useOrderDetailsActions from "./useOrderDetailsActions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
const UserInfo = () => {
    const params = useParams()
    const router = useRouter()
    const { currentStatus, orderData } = useOrderDetailsActions();
    return (
        <TabsContent value="customer" className="mt-6">
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Customer Information</CardTitle>
                        <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <CardDescription>Details about the customer who placed this order</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <div className="mb-4 flex items-center gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={orderData.customer.avatar || "/placeholder.svg"}
                                        alt={orderData.customer.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                                        {orderData.customer.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{orderData.customer.email}</p>
                                </div>
                            </div>

                            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Customer ID:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{orderData.customer.id}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Phone:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{orderData.customer.phone}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Total Orders:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Customer Since:</span>
                                    <span className="font-medium text-slate-900 dark:text-white">Jan 15, 2023</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-3 text-sm font-medium text-slate-900 dark:text-white">Billing Address</h4>
                            <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                                <p className="font-medium text-slate-900 dark:text-white">{orderData.customer.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{orderData.billing.address}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {orderData.billing.city}, {orderData.billing.state} {orderData.billing.zipCode}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{orderData.billing.country}</p>
                            </div>

                            <h4 className="mb-3 text-sm font-medium text-slate-900 dark:text-white">Recent Activity</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-blue-100 p-1.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                            <Package className="h-4 w-4" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium text-slate-900 dark:text-white">Placed order #{orderData.id}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{orderData.date}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                        {currentStatus}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-green-100 p-1.5 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium text-slate-900 dark:text-white">Updated account details</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Oct 10, 2023</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 border-t bg-slate-50 px-4 py-3 sm:px-6 sm:py-4 dark:border-slate-800 dark:bg-slate-900">
                    <Button variant="outline" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                        <Send className="mr-2 h-4 w-4" />
                        Contact Customer
                    </Button>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}

export default UserInfo
