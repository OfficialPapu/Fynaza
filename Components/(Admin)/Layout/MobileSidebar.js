import { Button } from '@/Components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/Components/ui/sheet'
import { Box, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const MobileSidebar = ({ sidebarLinks, isSidebarOpen }) => {
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-4 lg:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
                <div className="flex h-20 items-center gap-3 border-b px-6">
                    <Box className="h-7 w-7 text-primary" />
                    <span className="text-lg font-semibold">Admin</span>
                </div>
                <nav className="space-y-2 p-6">
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
                                <link.icon className="h-5 w-5" />
                                <span>{link.title}</span>
                            </Link>
                        );
                    })}
                </nav>
                <SheetClose asChild>
                    <Button variant="ghost" className="w-full mt-4">
                        Close
                    </Button>
                </SheetClose>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar
