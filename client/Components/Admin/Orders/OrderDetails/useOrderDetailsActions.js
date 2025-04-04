"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getStatusColor, getStatusDotColor } from "@/Components/ui/getStatusColor"
import { useDispatch, useSelector } from "react-redux"
import axios from "@/lib/axios"
import { HandelDialogChanges, HandelStatusChanges, HandelOrderData, HandelOrderDataStatusChanges } from "../../Redux/Slices/OrderDetailsSlice"
import { useSnackbar } from "notistack"

const useOrderDetailsActions = () => {
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    let OrderData = useSelector((state) => state.OrderDetails.OrderData);
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
    const [isCorrectInfo, setisCorrectInfo] = useState(false);
    const FetchOrderDetials = async (OrderID) => {
        try {
            const response = await axios.get(`api/admin/order/${OrderID}`);
            dispatch(HandelOrderData(response.data));
            dispatch(HandelStatusChanges({ status: response.data.Shipping.Status }))
            setisCorrectInfo(true);
        } catch (error) {
            ShowNotification(`Something went wrong!`, { variant: 'error' });
        }
    }

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
        try {
            const ApiData = { updateMode, selectedItems, NewStatus };
            const response = await axios.put(`api/admin/order/${OrderID}`, ApiData);
            if (response.status == 200) {
                ShowNotification(`Status Updated to ${NewStatus}`, { variant: 'success' });
                dispatch(HandelOrderDataStatusChanges(ApiData));
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
            dispatch(HandelDialogChanges());
            setSelectedItems([])
        }

    }


    return { getStatusColor, getStatusDotColor, OrderData, setActiveTab, isUpdateStatusDialogOpen, handleStatusUpdate, dispatch, selectAllItems, updateMode, BASE_IMAGES_PATH, setUpdateMode, handleModeChange, selectedItems, isProductListExpanded, setIsProductListExpanded, setSelectedItems, NewStatus, isLoading, FetchOrderDetials, OrderID, isCorrectInfo }
}

export default useOrderDetailsActions
