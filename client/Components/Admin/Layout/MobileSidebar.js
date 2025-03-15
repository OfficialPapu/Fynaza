"use client"

import { Button } from "@/Components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { Box, ChevronDown, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"

const MobileSidebar = ({ sidebarLinks, isSidebarOpen }) => {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-2 lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 border-r">
        <div className="flex h-16 items-center justify-center border-b border-gray-700">
          <Box className="h-8 w-8 text-blue-400" />
          <span className="ml-2 text-xl font-bold">Admin</span>
        </div>
        <nav className="mt-6 px-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            if (link.submenu) {
              return (
                <Collapsible key={link.title}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-800 hover:text-white">
                    <div className="flex items-center gap-3">
                      <link.icon className="h-5 w-5 text-gray-400" />
                      <span>{link.title}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 px-2 my-1">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className={`flex items-center gap-3 rounded-md px-4 py-2 text-sm transition-colors ${
                          pathname === subItem.href
                            ? "bg-blue-600 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        {subItem.icon && <subItem.icon className="h-4 w-4" />}
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            }
            return (
              <Link
                key={link.title}
                href={link.href}
                className={`mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <link.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span className="ml-3">{link.title}</span>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar

