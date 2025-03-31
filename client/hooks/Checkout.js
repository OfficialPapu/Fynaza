"use client"
import { useEffect, useState } from "react";
import useCartActions from "./Cart";
import axios from "@/lib/axios";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAddress } from "@/Components/Website/Redux/Slices/CheckoutSlice";
import { useRouter } from "next/navigation";

const useCheckoutActions = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const { CartItems, UserID, PickupLocation } = useCartActions();
    const [showAllProducts, setShowAllProducts] = useState(false)
    const initialProductsToShow = 2
    const hasMoreProducts = CartItems.length > initialProductsToShow
    const visibleProducts = showAllProducts ? CartItems : CartItems.slice(0, initialProductsToShow)
    const PaymentMethod = useSelector((state) => state.Checkout.PaymentMethod);
    const AddressID = useSelector((state) => state.Checkout.Address.ID);

    const [Addresses, setAddresses] = useState([]);
    const [NewAddress, setNewAddress] = useState({
        UserID: UserID,
        Name: "",
        Phone: "",
        Address: "",
        City: "",
        PostalCode: null,
    })
    const [dialogOpen, setDialogOpen] = useState(false)


    const handleAddressChange = (e) => {
        setNewAddress((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleAddressSubmit = async () => {
        if (!NewAddress.Name || !NewAddress.Address || !NewAddress.City || !NewAddress.Phone) {
            ShowNotification('Please fill the form!', { variant: 'error' });
            return;
        }
        if (NewAddress.Phone.length < 10) {
            ShowNotification('Please enter a valid number!', { variant: 'error' });
            return;
        }

        try {
            const response = await axios.post('api/checkout/delivery/add', NewAddress);
            if (response.status == 201) {
                const NewAddressObj = {
                    ID: response.data.AddressID,
                    Name: NewAddress.Name,
                    Address: `${NewAddress.Address}, ${NewAddress.City}${NewAddress.PostalCode ? ", " + NewAddress.PostalCode : ""}`,
                    Phone: NewAddress.Phone,
                }
                setAddresses((prev) => [...prev, NewAddressObj])
                dispatch(UpdateAddress({ Address: NewAddressObj }))
                setDialogOpen(false)
                GetInitialAddress();
            }
        } catch (error) {
            ShowNotification('Something went wrong', { variant: 'error' });
        }
    }
    const GetInitialAddress = async () => {
        const response = await axios.get(`api/checkout/delivery/${UserID}`);
        if (response.status === 200) {
            const newAddresses = Object.values(response.data);
            setAddresses(newAddresses);
        } else {
            ShowNotification('Something went wrong', { variant: 'error' });
        }
    };

    useEffect(() => {
        GetInitialAddress();
        if (!UserID || !PickupLocation) router.push('/account/cart');
    }, [])



    const HandelCheckout = () => {
        if (PaymentMethod && AddressID) {
            router.push("/account/checkout/success");
        }
    }
    return {
        PaymentMethod, showAllProducts, setShowAllProducts, hasMoreProducts, visibleProducts, handleAddressSubmit, handleAddressChange, dialogOpen, AddressID, setDialogOpen, NewAddress, Addresses, AddressID, dispatch, UpdateAddress, HandelCheckout, router
    }
}

export default useCheckoutActions;