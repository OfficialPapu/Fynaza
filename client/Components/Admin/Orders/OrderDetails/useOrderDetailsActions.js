"use client"

import { useEffect, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { getStatusColor, getStatusDotColor } from "@/Components/ui/getStatusColor"
import { useDispatch, useSelector } from "react-redux"
import axios from "@/lib/axios"
import { HandelDialogChanges, HandelStatusChanges } from "../../Redux/Slices/OrderDetailsSlice"

const useOrderDetailsActions = () => {

    const [OrderData, setOrderData] = useState([]);

    const FetchOrderDetials = async (OrderID) => {
        try {
            const response = await axios.get(`api/admin/order/${OrderID}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    }


    const dispatch = useDispatch();
    const { OrderID } = useParams()
    const isUpdateStatusDialogOpen = useSelector((state) => state.OrderDetails.UpdateStatusDialogOpen);
    const NewStatus = useSelector((state) => state.OrderDetails.NewStatus);
    const [activeTab, setActiveTab] = useState("details")
    const [selectedItems, setSelectedItems] = useState([])
    const [updateMode, setUpdateMode] = useState("all")
    const [isProductListExpanded, setIsProductListExpanded] = useState(false)
    const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_BASE_IMAGES_PATH;
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            if (OrderID) {
                const OrderDetails = await FetchOrderDetials(OrderID);
                setOrderData(OrderDetails);
                dispatch(HandelStatusChanges({ status: OrderDetails.Shipping.Status }))
            }
        };

        fetchData();
    }, [OrderID]);

    useEffect(() => {

        if (isUpdateStatusDialogOpen) {
            setSelectedItems([])
            setUpdateMode("all")
            setIsProductListExpanded(false)
        }
    }, [isUpdateStatusDialogOpen])

    const selectAllItems = () => {
        if (selectedItems.length === OrderData.OrderItemsID.length) {
            setSelectedItems([])
        } else {
            setSelectedItems(OrderData.OrderItemsID.map((item) => item._id))
        }
    }

    const handleModeChange = (mode) => {
        setUpdateMode(mode)
        if (mode === "all") {
            setSelectedItems([])
        }
    }


    const handleStatusUpdate = async () => {
        setIsLoading(true);
        // if (updateMode === "all") {

        //     console.log(`Updating entire order ${OrderData.id} to status: ${NewStatus}`)
        // } else {
        //     console.log(`Updating items ${selectedItems.join(", ")} to status: ${NewStatus}`)
        //     console.log(`Items to update: ${selectedItems.join(", ")}`)
        //     console.log(`New status: ${NewStatus}`)
        // }

        try {
            const data = {
                updateMode,
                selectedItems
            }
            const response = await axios.put(`api/admin/order/${OrderID}`, data);
            // return response.data;
        } catch (error) {
            console.error('Error fetching order details:', error);
        } finally {
            setIsLoading(false);
            dispatch(HandelDialogChanges());
            setSelectedItems([])
        }

    }


    return { getStatusColor, getStatusDotColor, OrderData, setActiveTab, isUpdateStatusDialogOpen, handleStatusUpdate, dispatch, selectAllItems, updateMode, BASE_IMAGES_PATH, setUpdateMode, handleModeChange, selectedItems, isProductListExpanded, setIsProductListExpanded, setSelectedItems, NewStatus, isLoading }
}

export default useOrderDetailsActions
