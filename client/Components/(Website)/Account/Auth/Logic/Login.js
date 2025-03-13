"use client"
import axios from "@/lib/axios"
import { useSnackbar } from "notistack"
import { useRouter } from 'next/navigation'
import { useState } from "react"

const useLoginLogic = () => {
    const [ShowPass, SetShowPass] = useState(false);
    const router = useRouter();
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const [UserDetails, SetUserDetails] = useState({
        Email: "",
        Password: "",
    });
    const handleInputChange = (e) => {
        SetUserDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const HandelLoginForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("api/auth/login", UserDetails, { withCredentials: true });
            if (response.data.success) {
                router.push('/');
            } else {
                ShowNotification(response.data.message, { variant: 'error' });
            }
        } catch (error) {
            ShowNotification('Something went wrong!!', { variant: 'error' });
            console.log(error);

        }
        setIsLoading(false);
    }


    return {
        ShowPass,
        SetShowPass,
        isLoading,
        UserDetails,
        SetUserDetails,
        handleInputChange,
        HandelLoginForm
    }
}

module.exports = { useLoginLogic };