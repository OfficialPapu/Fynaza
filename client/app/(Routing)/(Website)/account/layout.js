"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { AccountHeader } from "@/Components/Website/Account/Layout/AccountHeader";
import { AccountNav } from "@/Components/Website/Account/Layout/AccountNav";
import { useSelector } from "react-redux";

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const excludedPaths = ["/account", "/account/cart", "/account/checkout", "/account/checkout/success", "/account/wishlist"];
  const isExcluded = excludedPaths.includes(pathname);
  const router = useRouter();
  const isAuth = useSelector((state) => state.Login.isAuth);
  if (!isAuth) {
    router.push("/auth/login");
    return;
  }
  return (
    <div>
      {!isExcluded && (<><AccountHeader /></>)}
      {children}
    </div>
  );
}