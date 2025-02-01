"use client";
import React from "react";
import { AccountNav } from "@/Components/Account/Layout/AccountNav";
import { usePathname } from "next/navigation";
import { AccountHeader } from "@/Components/Account/Layout/AccountHeader";

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const excludedPaths = ["/account", "/account/cart", "/account/wishlist"];
  const isExcluded = excludedPaths.includes(pathname);

  return (
    <div>
      {!isExcluded && (<><AccountHeader /></>)}
      {children}
    </div>
  );
}