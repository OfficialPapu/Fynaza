"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'
import { Login, Logout } from "../(Website)/Redux/Slices/Login";
import axios from "@/lib/axios";

const ValidateToken = (WrappedComponent) => {

    const handleLogout = (dispatch, router) => {
        dispatch(Logout());
        router.push("/auth/login");
    };

    const Validate = async (dispatch, router) => {
        try {
            const response = await axios.get("api/auth/validate-token", { withCredentials: true });
            if (response.data.success) {
                dispatch(Login(response.data.User));
            } else {
                handleLogout(dispatch, router);
            }
        } catch (error) {
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
