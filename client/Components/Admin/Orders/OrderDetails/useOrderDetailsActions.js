"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import getStatusColor from "@/Components/ui/getStatusColor"
import { useDispatch, useSelector } from "react-redux"
import { HandelDialogChanges } from "../../Redux/Slices/OrderDetailsSlice"

const useOrderDetailsActions = () => {

    // Mock data for a single order
    const orderData = {
        id: "ORD-001",
        date: "2023-10-15",
        status: "processing",
        customer: {
            id: "CUST-001",
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        billing: {
            address: "123 Main St",
            city: "San Francisco",
            state: "CA",
            zipCode: "94105",
            country: "United States",
        },
        shipping: {
            address: "123 Main St",
            city: "San Francisco",
            state: "CA",
            zipCode: "94105",
            country: "United States",
            method: "Standard Shipping",
            trackingNumber: "TRK123456789",
            estimatedDelivery: "2023-10-20",
        },
        payment: {
            method: "Credit Card",
            cardType: "Visa",
            cardLast4: "4242",
            status: "paid",
            total: "$129.99",
            subtotal: "$119.99",
            tax: "$10.00",
            shipping: "$0.00",
            discount: "$0.00",
            transactionId: "TXN123456789",
        },
        items: [
            {
                id: "ITEM-001",
                name: "Premium Wireless Headphones",
                sku: "SKU-001",
                price: "$89.99",
                quantity: 1,
                image: "/placeholder.svg?height=60&width=60",
                total: "$89.99",
            },
            {
                id: "ITEM-002",
                name: "Smartphone Fast Charger",
                sku: "SKU-002",
                price: "$29.99",
                quantity: 1,
                image: "/placeholder.svg?height=60&width=60",
                total: "$29.99",
            },
        ],
        notes: "Customer requested gift wrapping.",
        history: [
            {
                date: "2023-10-15 09:30 AM",
                status: "created",
                description: "Order placed by customer",
                user: "Customer",
            },
            {
                date: "2023-10-15 10:15 AM",
                status: "payment_confirmed",
                description: "Payment confirmed",
                user: "System",
            },
            {
                date: "2023-10-15 02:45 PM",
                status: "processing",
                description: "Order processing started",
                user: "Admin (Jane Smith)",
            },
        ],
    }

    const dispatch = useDispatch();
    const params = useParams()
    const router = useRouter()
    const [currentStatus, setCurrentStatus] = useState(orderData.status)
    const isUpdateStatusDialogOpen = useSelector((state) => state.OrderDetails.UpdateStatusDialogOpen);
    const isAddNoteDialogOpen = useSelector((state) => state.OrderDetails.AddNoteDialogOpen);
    const [kk, setIsAddNoteDialogOpen] = useState(false)
    const [newNote, setNewNote] = useState("")
    const [activeTab, setActiveTab] = useState("details")

    const handleStatusUpdate = (newStatus) => {
        setCurrentStatus(newStatus)
        dispatch(HandelDialogChanges({Type:"UpdateStatusDialogOpen"}));
        // In a real app, you would make an API call here
    }

    // Handle order cancellation
    const handleCancelOrder = () => {
        setCurrentStatus("cancelled")
        // In a real app, you would make an API call here
    }

    // Handle adding a note
    const handleAddNote = () => {
        dispatch(HandelDialogChanges({ Type: "UpdateAddNoteDialogOpen" }))
        setNewNote("")
    }

    return { getStatusColor, orderData, currentStatus, setActiveTab, handleAddNote, isAddNoteDialogOpen, setIsAddNoteDialogOpen, newNote, setNewNote, isUpdateStatusDialogOpen, handleStatusUpdate, handleCancelOrder,  dispatch }
}

export default useOrderDetailsActions
