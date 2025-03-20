"use client"
import axios from "@/lib/axios"
import { useSnackbar } from "notistack"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { useDispatch } from "react-redux"
const useLoginLogic = ({ Role }) => {
    const router = useRouter();
    const [ShowPass, SetShowPass] = useState(false);
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({ Email: "", Password: "" })
    const [UserDetails, SetUserDetails] = useState({
        Email: "",
        Password: "",
        isAdmin: (Role == "Admin" ? true : false),
    });

    const importLoginSlice = async () => {
        if (Role === "Admin") {
            return await import("@/Components/Admin/Redux/Slices/LoginSlice");
        } else {
            return await import("@/Components/Website/Redux/Slices/LoginSlice");
        }
    };

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
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            const { Login } = await importLoginSlice();
            const response = await axios.post("api/auth/login", UserDetails, { withCredentials: true });
            if (response.status === 200) {
                const UserDetails = { ...response.data };
                dispatch(Login(UserDetails));
                let redirectTo = (Role == "Admin" ? "/admin/dashboard" : "/");
                redirectTo = localStorage.getItem("RedirectAfterLogin") || redirectTo;
                localStorage.removeItem("RedirectAfterLogin");
                router.push(redirectTo);
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            ShowNotification(message, { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };


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
module.exports = { useLoginLogic };