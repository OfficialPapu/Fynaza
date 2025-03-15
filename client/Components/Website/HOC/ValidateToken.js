"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'
import { Login, Logout } from "../Redux/Slices/Login";
import axios from "@/lib/axios";

const ValidateToken = (WrappedComponent) => {
    const handleLogout = (dispatch, router) => {
        const currentPath = window.location.pathname;
        localStorage.setItem("RedirectAfterLogin", currentPath);
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
        } finally {
            setLoading(false);  // Set loading to false after validation is complete
        }
    };

    return function ProtectedRoute(props) {
        const dispatch = useDispatch();
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkToken = async () => {
                await Validate(dispatch, router);
            };
            checkToken();
        }, [dispatch, router]);
        if (loading) {
            // Render a loading spinner or any fallback UI until authentication check is complete
            return <div>Loading...</div>;
        }
        return <WrappedComponent {...props} />;
    }
}

export default ValidateToken;
