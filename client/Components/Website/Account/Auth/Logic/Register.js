"use client"

import { useState } from "react"
import { useSnackbar } from "notistack"
import axios from "@/lib/axios"
import { useRouter } from "next/navigation"
const useRegisterLogic = () => {
    const router = useRouter();
    const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    const [UserDetails, SetUserDetails] = useState({
        Name: "",
        Mobile: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    });

    const [ShowPass, SetShowPass] = useState({
        Password: false,
        ConfirmPassword: false
    });

    const [Errors, SetErrors] = useState({
        Name: "",
        Mobile: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    });

    const togglePasswordVisibility = (field) => {
        SetShowPass((prev) => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const handleInputChange = (e) => {
        SetUserDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        handleClearError(e.target.name);
    }

    const handleClearError = (field) => {
        SetErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (UserDetails.Name == "") {
            newErrors.Name = "Full name is required.";
            isValid = false;
        }

        if (UserDetails.Mobile.length < 10) {
            newErrors.Mobile = "Mobile must be at least 10 digits.";
            isValid = false;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(UserDetails.Email)) {
            newErrors.Email = "Please enter a valid email address.";
            isValid = false;
        }

        if (UserDetails.Password.length < 8) {
            newErrors.Password = "Password must be at least 8 characters long.";
            isValid = false;
        }

        if (UserDetails.ConfirmPassword !== UserDetails.Password) {
            newErrors.ConfirmPassword = "Passwords do not match.";
            isValid = false;
        }

        SetErrors(newErrors);
        return isValid;
    }

    const resetForm = () => {
        SetUserDetails({
            Name: "",
            Mobile: "",
            Email: "",
            Password: "",
            ConfirmPassword: ""
        })
    };

    const HandelRegisterForm = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            ShowNotification('Please correct the errors', { variant: 'error' });
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post("api/auth/register", UserDetails);
            if (response.status === 201) {
                resetForm();
                ShowNotification('Account created', { variant: 'success' });
                setTimeout(() => {
                    router.push('/auth/login');
                }, 2000);
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            ShowNotification(message, { variant: 'error' });
        }
        setIsLoading(false);
    }


    return {
        UserDetails,
        SetUserDetails,
        ShowPass,
        togglePasswordVisibility,
        Errors,
        validateForm,
        handleInputChange,
        handleClearError,
        HandelRegisterForm,
        isLoading
    };
}

module.exports = { useRegisterLogic };