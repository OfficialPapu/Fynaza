"use client"
import axios from "@/lib/axios"
import { useSnackbar } from "notistack"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Login } from "@/Components/Admin/Redux/Slices/Login"
const useAdminLoginLogin = () => {
    const router = useRouter();
    const [ShowPass, SetShowPass] = useState(false);
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({ Email: "", Password: "" })
    const [UserDetails, SetUserDetails] = useState({
        Email: "",
        Password: "",
        isAdmin: true,
    });
    const handleInputChange = (e) => {
        SetUserDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        handleClearError(e.target.name);
    }

    const handleClearError = (field) => {
        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    }

    const validateForm = () => {
        let valid = true
        const newErrors = { Email: "", Password: "" }
        if (!UserDetails.Email) {
            newErrors.Email = "Email is required"
            valid = false
        } else if (!/\S+@\S+\.\S+/.test(UserDetails.Email)) {
            newErrors.Email = "Email is invalid"
            valid = false
        }

        if (!UserDetails.Password) {
            newErrors.Password = "Password is required"
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        setIsLoading(true)
        try {
            const response = await axios.post("api/auth/login", UserDetails, { withCredentials: true })
            if (response.data.success) {
                const UserDetails = { ...response.data };
                delete UserDetails.success;
                dispatch(Login(UserDetails));
                const redirectTo = localStorage.getItem("redirectAfterLogin") || "/admin/dashboard";
                localStorage.removeItem("RedirectAfterLogin");  
                router.push(redirectTo);
            } else {
                ShowNotification(response.data.message, { variant: 'error' });
            }
        } catch (error) {
            ShowNotification(error.response.data.message || "Something went wrong", { variant: 'error' });
        } finally {
            setIsLoading(false)
        }
    }

    return {
        ShowPass,
        SetShowPass,
        UserDetails,
        isLoading,
        handleSubmit,
        handleInputChange,
        errors,
    }

}
module.exports = { useAdminLoginLogin };