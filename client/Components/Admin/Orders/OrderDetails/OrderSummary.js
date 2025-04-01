"use client"
import React from 'react'
import { Badge } from 'lucide-react';
import useOrderDetailsActions from './useOrderDetailsActions';

const OrderSummary = () => {
    const { orderData } = useOrderDetailsActions();
    return (
        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-950">
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x md:grid-cols-3 dark:divide-slate-800">
                <div className="p-6">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Customer</div>
                    <div className="mt-2 flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <img
                                src={orderData.customer.avatar || "/placeholder.svg"}
                                alt={orderData.customer.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="font-medium text-slate-900 dark:text-white">{orderData.customer.name}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{orderData.customer.email}</div>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Payment</div>
                    <div className="mt-2">
                        <div className="font-medium text-slate-900 dark:text-white">{orderData.payment.total}</div>
                        <div className="mt-1 flex items-center gap-2">
                            <Badge
                                variant="outline"
                                className={`${orderData.payment.status === "paid"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    } px-2 py-0.5 text-xs font-medium`}
                            >
                                {orderData.payment.status === "paid" ? "Paid" : "Pending"}
                            </Badge>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{orderData.payment.method}</span>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Shipping</div>
                    <div className="mt-2">
                        <div className="font-medium text-slate-900 dark:text-white">{orderData.shipping.method}</div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Est. delivery: {orderData.shipping.estimatedDelivery}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
