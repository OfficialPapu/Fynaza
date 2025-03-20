"use client";
import React from 'react'
import AdminLogin from "@/Components/Admin/Auth/Login"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Login, Logout } from "@/Components/Admin/Redux/Slices/LoginSlice"
const page = () => {
    const isAuth = useSelector((state) => state.Admin.isAuth);
    const router = useRouter();
    if (isAuth) {
        router.push('/admin/dashboard');
        return;
    }
    return (
        <div>
            <AdminLogin />
        </div>
    )
}

export default page
