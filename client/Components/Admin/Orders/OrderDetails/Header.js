"use client"
import React from 'react'
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { ArrowLeft, Calendar, ChevronDown, FileText, RefreshCw } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import useOrderDetailsActions from './useOrderDetailsActions';
import { HandelDialogChanges } from '../../Redux/Slices/OrderDetailsSlice'

const Header = () => {
    const { getStatusColor, setIsAddNoteDialogOpen, orderData, currentStatus, dispatch } = useOrderDetailsActions();
    return (
        <header className="border-b bg-white px-4 py-3 shadow-sm sm:px-6 sm:py-4">
            <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild className="rounded-full">
                            <Link href="/admin/orders">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back to orders</span>
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Order {orderData.id}</h1>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <Calendar className="h-4 w-4" />
                                <span>{orderData.date}</span>
                                <Badge
                                    variant="outline"
                                    className={`${getStatusColor(currentStatus)} ml-2 px-2.5 py-0.5 text-xs font-medium`}
                                >
                                    {currentStatus}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="default" size="sm">
                                    Actions
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuItem onClick={() =>  dispatch(HandelDialogChanges({Type:"UpdateStatusDialogOpen"}))}>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Update Status
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => dispatch(HandelDialogChanges({ Type: "UpdateAddNoteDialogOpen" }))}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Add Note
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
