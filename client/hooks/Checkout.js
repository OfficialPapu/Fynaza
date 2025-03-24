"use client"
import { useState } from "react";
import useCartActions from "./Cart";

const useCheckoutActions = () => {
    const { CartItems } = useCartActions();
    const [showAllProducts, setShowAllProducts] = useState(false)
    const initialProductsToShow = 2
    const hasMoreProducts = CartItems.length > initialProductsToShow
    const visibleProducts = showAllProducts ? CartItems : CartItems.slice(0, initialProductsToShow)
    const [selectedPayment, setSelectedPayment] = useState();
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        name: "",
        streetAddress: "",
        city: "",
        postalCode: "",
        phone: "",
    })
    const [dialogOpen, setDialogOpen] = useState(false)


    const handleAddressChange = (e) => {
        const { id, value } = e.target
        setNewAddress((prev) => ({
            ...prev,
            [id === "first-name" ? "name" : id === "address" ? "streetAddress" : id === "postal-code" ? "postalCode" : id]:
                value,
        }))
    }

    const handleAddressSubmit = () => {
        // Validate form
        if (!newAddress.name || !newAddress.streetAddress || !newAddress.city || !newAddress.phone) {
            // Show error (in a real app)
            return
        }

        // Create full name if first and last name were separate
        const fullName = newAddress.name

        // Create full address
        const fullAddress = `${newAddress.streetAddress}, ${newAddress.city}${newAddress.postalCode ? ", " + newAddress.postalCode : ""}`

        // Add new address
        const newAddressObj = {
            id: `addr${addresses.length + 1}`,
            name: fullName,
            address: fullAddress,
            phone: newAddress.phone,
        }

        setAddresses((prev) => [...prev, newAddressObj])
        setSelectedAddress(newAddressObj.id)
        setDialogOpen(false)

        // Reset form
        setNewAddress({
            name: "",
            streetAddress: "",
            city: "",
            postalCode: "",
            phone: "",
        })
    }

    return {
        selectedPayment, setSelectedPayment, showAllProducts, setShowAllProducts, hasMoreProducts, visibleProducts, handleAddressSubmit, handleAddressChange, dialogOpen, selectedAddress, setDialogOpen, newAddress, addresses,selectedAddress, setSelectedAddress
    }
}

export default useCheckoutActions;