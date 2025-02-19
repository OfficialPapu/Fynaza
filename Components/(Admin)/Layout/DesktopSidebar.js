import { Box } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const DesktopSidebar = ({sidebarLinks, isSidebarOpen}) => {
    const pathname = usePathname()
    return (
        <aside
            className={`fixed hidden h-full bg-card lg:block ${isSidebarOpen ? "w-72" : "w-20"
                } transition-all duration-500`}
        >
            <div className="flex h-20 items-center gap-3 border-b px-6">
                <Box className="h-7 w-7 text-primary" />
                {isSidebarOpen && <span className="text-lg font-semibold">Admin</span>}
            </div>
            <nav className={`${!isSidebarOpen ? "flex flex-col justify-center items-center" : ""} space-y-2 p-6`}>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.title}
                            href={link.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive
                                ? "bg-gradient-to-r from-blue-100 to-blue-50 text-gray-900 shadow-md"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }`}
                        >
                            <div>
                                <link.icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-black"}`} />
                            </div>
                            {isSidebarOpen && <span>{link.title}</span>}
                        </Link>
                    );
                })}
            </nav>

        </aside>

    )
}

export default DesktopSidebar
