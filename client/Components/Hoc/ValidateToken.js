"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'
import axios from "@/lib/axios";
import { Login as AdminLogin, Logout as AdminLogout } from "../Admin/Redux/Slices/LoginSlice";
import { Login as UserLogin, Logout as UserLogout } from "../Website/Redux/Slices/LoginSlice";

const ValidateToken = (WrappedComponent, Role = "Website") => {
    const handleLogout = (dispatch, router) => {
        const currentPath = window.location.pathname;
        Role != "Admin" ? localStorage.setItem("RedirectAfterLogin", currentPath) : "";
        const LogoutAction = Role === "Admin" ? AdminLogout : UserLogout;
        dispatch(LogoutAction());
        const loginPath = Role === "Admin" ? "/admin/auth/login" : "/auth/login";
        router.push(loginPath);
    };

    const Validate = async (dispatch, router) => {
        try {
            const response = await axios.get("api/auth/validate-token", { withCredentials: true });
            if (response.status === 200) {
                const LoginAction = Role === "Admin" ? AdminLogin : UserLogin;
                dispatch(LoginAction(response.data.User));
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            ShowNotification(message, { variant: 'error' });
            handleLogout(dispatch, router);
        }
    };

    return function ProtectedRoute(props) {
        const dispatch = useDispatch();
        const router = useRouter();
        useEffect(() => {
            const checkToken = async () => {
                await Validate(dispatch, router);
            };
            checkToken();
        }, [dispatch, router]);

        return <WrappedComponent {...props} />;
    }
}

export default ValidateToken;
