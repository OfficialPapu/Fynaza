"use client"

import { Box, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"

const DesktopSidebar = ({ sidebarLinks, isSidebarOpen }) => {
  const pathname = usePathname()
  const [openSubmenus, setOpenSubmenus] = useState({})

  const toggleSubmenu = (title) => {
    setOpenSubmenus((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <aside
      className={`fixed hidden h-full border-r lg:block ${
        isSidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <Box className="h-8 w-8 text-blue-400" />
        {isSidebarOpen && <span className="ml-2 text-xl font-bold">Admin</span>}
      </div>
      <nav className="mt-6 px-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href
          if (link.submenu) {
            return (
              <Collapsible
                key={link.title}
                open={openSubmenus[link.title]}
                onOpenChange={() => toggleSubmenu(link.title)}
              >
                <CollapsibleTrigger
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isSidebarOpen ? "" : "justify-center"
                  } hover:bg-gray-800 hover:text-white`}
                >
                  <div className={`flex items-center ${isSidebarOpen ? "gap-3" : "justify-center"}`}>
                    <link.icon className="h-5 w-5 text-gray-400" />
                    {isSidebarOpen && <span>{link.title}</span>}
                  </div>
                  {isSidebarOpen && <ChevronDown className="h-4 w-4 text-gray-400" />}
                </CollapsibleTrigger>
                {isSidebarOpen && (
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
                )}
              </Collapsible>
            )
          }
          return (
            <Link
              key={link.title}
              href={link.href}
              className={`mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isSidebarOpen ? "" : "justify-center"
              } ${isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            >
              <link.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
              {isSidebarOpen && <span className="ml-3">{link.title}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default DesktopSidebar

