"use client";
import LoginPage from '@/Components/Website/Account/Auth/Login'
import React from 'react'
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
const page = () => {
  const isAuth = useSelector((state) => state.Login.isAuth);
  const router = useRouter();
  if (isAuth) {
    router.push('/');
    return;
  }
  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default page
