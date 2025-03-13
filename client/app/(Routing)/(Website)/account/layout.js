"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AccountHeader } from "@/Components/(Website)/Account/Layout/AccountHeader";
import { AccountNav } from "@/Components/(Website)/Account/Layout/AccountNav";

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