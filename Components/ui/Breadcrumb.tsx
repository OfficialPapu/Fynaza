import React from "react";
import Link from "next/link";
import { ChevronRight, Home, ShoppingCart, Heart } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; href: string; icon?: React.ReactNode }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center space-x-1 sm:space-x-2 bg-white px-2 sm:px-4 py-2 rounded-lg shadow">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mx-1" />
            )}
            <Link
              href={item.href}
              className={`text-xs sm:text-sm font-medium flex items-center justify-center ${
                index === items.length - 1
                  ? "text-black"
                  : "text-gray-600 hover:text-black transition-colors duration-200"
              }`}
            >
              {item.icon && <span className="mr-1 mb-[1px]">{item.icon}</span>}
              <span className="truncate max-w-[120px] sm:max-w-none">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
