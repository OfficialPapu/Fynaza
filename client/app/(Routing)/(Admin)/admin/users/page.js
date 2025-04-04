"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowUpRight,
  Download,
  Search,
  Star,
  UserPlus,
  Users,
  X,
  Calendar,
  ShoppingBag,
  CreditCard,
  MoreHorizontal,
  Trash2,
  Mail,
  Phone,
  RefreshCw,
  CheckCircle2,
  Clock,
  Edit,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Progress } from "@/Components/ui/progress"

// Sample user data with additional fields
const allUsers = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    joined: "Jan 10, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "JD",
    orders: 8,
    spent: "1,249",
    role: "Customer",
    lastActive: "2 hours ago",
    vip: true,
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    lastOrder: "3 days ago",
    growth: "+12%",
  },
  {
    id: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Active",
    joined: "Feb 15, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "JS",
    orders: 5,
    spent: "820",
    role: "Customer",
    lastActive: "1 day ago",
    vip: false,
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, USA",
    lastOrder: "1 week ago",
    growth: "+5%",
  },
  {
    id: "USR003",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    status: "Inactive",
    joined: "Mar 22, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "RJ",
    orders: 2,
    spent: "150",
    role: "Customer",
    lastActive: "2 weeks ago",
    vip: false,
    phone: "+1 (555) 234-5678",
    location: "Chicago, USA",
    lastOrder: "1 month ago",
    growth: "-2%",
  },
  {
    id: "USR004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "Active",
    joined: "Apr 5, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "ED",
    orders: 12,
    spent: "2,340",
    role: "Customer",
    lastActive: "3 hours ago",
    vip: true,
    phone: "+1 (555) 345-6789",
    location: "Miami, USA",
    lastOrder: "Yesterday",
    growth: "+18%",
  },
  {
    id: "USR005",
    name: "Michael Wilson",
    email: "michael.w@example.com",
    status: "New",
    joined: "May 18, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "MW",
    orders: 0,
    spent: "0",
    role: "Customer",
    lastActive: "Just now",
    vip: false,
    phone: "+1 (555) 456-7890",
    location: "Seattle, USA",
    lastOrder: "Never",
    growth: "New",
  },
  {
    id: "USR006",
    name: "Sarah Brown",
    email: "sarah.b@example.com",
    status: "Active",
    joined: "Jun 30, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "SB",
    orders: 3,
    spent: "430",
    role: "Customer",
    lastActive: "5 hours ago",
    vip: false,
    phone: "+1 (555) 567-8901",
    location: "Boston, USA",
    lastOrder: "2 weeks ago",
    growth: "+3%",
  },
  {
    id: "USR007",
    name: "David Lee",
    email: "david.lee@example.com",
    status: "Active",
    joined: "Jul 15, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "DL",
    orders: 7,
    spent: "950",
    role: "Admin",
    lastActive: "1 hour ago",
    vip: false,
    phone: "+1 (555) 678-9012",
    location: "San Francisco, USA",
    lastOrder: "5 days ago",
    growth: "+8%",
  },
  {
    id: "USR008",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    status: "Inactive",
    joined: "Aug 3, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "LW",
    orders: 1,
    spent: "75",
    role: "Customer",
    lastActive: "1 month ago",
    vip: false,
    phone: "+1 (555) 789-0123",
    location: "Austin, USA",
    lastOrder: "2 months ago",
    growth: "-5%",
  },
  {
    id: "USR009",
    name: "James Miller",
    email: "james.m@example.com",
    status: "Active",
    joined: "Aug 22, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "JM",
    orders: 4,
    spent: "620",
    role: "Customer",
    lastActive: "2 days ago",
    vip: false,
    phone: "+1 (555) 890-1234",
    location: "Denver, USA",
    lastOrder: "1 week ago",
    growth: "+6%",
  },
  {
    id: "USR010",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    status: "New",
    joined: "Sep 10, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "EW",
    orders: 0,
    spent: "0",
    role: "Customer",
    lastActive: "4 hours ago",
    vip: false,
    phone: "+1 (555) 901-2345",
    location: "Portland, USA",
    lastOrder: "Never",
    growth: "New",
  },
  {
    id: "USR011",
    name: "Thomas Clark",
    email: "thomas.c@example.com",
    status: "Active",
    joined: "Sep 28, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "TC",
    orders: 6,
    spent: "890",
    role: "Customer",
    lastActive: "Yesterday",
    vip: false,
    phone: "+1 (555) 012-3456",
    location: "Atlanta, USA",
    lastOrder: "3 days ago",
    growth: "+9%",
  },
  {
    id: "USR012",
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    status: "Active",
    joined: "Oct 15, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "OM",
    orders: 3,
    spent: "340",
    role: "Customer",
    lastActive: "6 hours ago",
    vip: false,
    phone: "+1 (555) 123-4567",
    location: "Phoenix, USA",
    lastOrder: "2 weeks ago",
    growth: "+4%",
  },
  {
    id: "USR013",
    name: "William Taylor",
    email: "william.t@example.com",
    status: "Inactive",
    joined: "Nov 2, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "WT",
    orders: 2,
    spent: "180",
    role: "Customer",
    lastActive: "3 weeks ago",
    vip: false,
    phone: "+1 (555) 234-5678",
    location: "Dallas, USA",
    lastOrder: "1 month ago",
    growth: "-3%",
  },
  {
    id: "USR014",
    name: "Sophia Anderson",
    email: "sophia.a@example.com",
    status: "Active",
    joined: "Nov 20, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "SA",
    orders: 5,
    spent: "720",
    role: "Admin",
    lastActive: "12 hours ago",
    vip: true,
    phone: "+1 (555) 345-6789",
    location: "Philadelphia, USA",
    lastOrder: "1 week ago",
    growth: "+7%",
  },
  {
    id: "USR015",
    name: "Benjamin White",
    email: "benjamin.w@example.com",
    status: "New",
    joined: "Dec 8, 2023",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "BW",
    orders: 1,
    spent: "120",
    role: "Customer",
    lastActive: "2 days ago",
    vip: false,
    phone: "+1 (555) 456-7890",
    location: "San Diego, USA",
    lastOrder: "2 days ago",
    growth: "New",
  },
]

export default function UsersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [progressValue, setProgressValue] = useState(0)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  // Get current page from URL or default to 1
  const currentPage = Number(searchParams.get("page") || 1)
  const itemsPerPage = viewMode === "grid" ? 6 : 8

  // Filter users based on search query and status
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === null || user.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.joined).getTime() - new Date(a.joined).getTime()
      case "oldest":
        return new Date(a.joined).getTime() - new Date(b.joined).getTime()
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "orders-high":
        return b.orders - a.orders
      case "orders-low":
        return a.orders - b.orders
      case "spent-high":
        return Number.parseFloat(b.spent.replace(",", "")) - Number.parseFloat(a.spent.replace(",", ""))
      case "spent-low":
        return Number.parseFloat(a.spent.replace(",", "")) - Number.parseFloat(b.spent.replace(",", ""))
      default:
        return 0
    }
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage)

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    // Reset to page 1 when searching
    if (currentPage !== 1) {
      router.push("/admin/users?page=1")
    }
  }

  // Handle status filter
  const handleStatusFilter = (status) => {
    setSelectedStatus(status)
    // Reset to page 1 when filtering
    if (currentPage !== 1) {
      router.push("/admin/users?page=1")
    }
  }

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = []

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink href={`/admin/users?page=1`} isActive={currentPage === 1}>
          1
        </PaginationLink>
      </PaginationItem>,
    )

    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Show current page and neighbors
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue // Skip first and last as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={`/admin/users?page=${i}`} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink href={`/admin/users?page=${totalPages}`} isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  // Get stats for dashboard
  const activeUsers = filteredUsers.filter((user) => user.status === "Active").length
  const newUsers = filteredUsers.filter((user) => user.status === "New").length
  const vipUsers = filteredUsers.filter((user) => user.vip).length
  const totalSpent = filteredUsers.reduce((sum, user) => sum + Number.parseFloat(user.spent.replace(",", "")), 0)

  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Active":    
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            Active
          </Badge>
        )
      case "Inactive":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
            Inactive
          </Badge>
        )
      case "New":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            New
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3f7fa] via-[#f8fafc] to-white">
      <div className="relative">
        {/* Main content */}
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex h-[80vh] flex-col items-center justify-center">
              <div className="mb-4 text-2xl font-bold text-gray-800">Loading User Dashboard</div>
              <div className="mb-8 text-sm text-gray-500">Please wait while we fetch the latest data</div>
              <div className="w-64">
                <Progress value={progressValue} className="h-2" />
              </div>
            </div>
          ) : (
            <>
              {/* Enhanced header with glassmorphism */}
              <div className="relative mb-8 overflow-hidden rounded-2xl border border-gray-100/50 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-50/80 opacity-70"></div>
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-50/80 opacity-70"></div>
                <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white/30 to-transparent"></div>
                <div className="relative">
                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <div className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1 text-sm font-medium text-blue-700 shadow-sm">
                        <Users className="mr-1.5 h-4 w-4" />
                        User Management
                      </div>
                      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Users</h1>
                      <p className="mt-1 text-gray-500">Manage and monitor your customer accounts</p>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            className="gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-200 hover:shadow-lg"
                          >
                            <UserPlus className="h-4 w-4" />
                            Add New User
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Create a new user account</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Enhanced stats cards with glassmorphism */}
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="group rounded-xl bg-white/90 p-5 shadow-lg border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Total Users</span>
                        <div className="rounded-full bg-blue-50 p-2 text-blue-600 transition-all duration-200 group-hover:bg-blue-100 group-hover:scale-110">
                          <Users className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-gray-900">{filteredUsers.length}</div>
                        <div className="text-xs font-medium text-green-600">+12%</div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">From last month</div>
                      <div className="mt-3 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="group rounded-xl bg-white/90 p-5 shadow-lg border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Active Users</span>
                        <div className="rounded-full bg-green-50 p-2 text-green-600 transition-all duration-200 group-hover:bg-green-100 group-hover:scale-110">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-gray-900">{activeUsers}</div>
                        <div className="text-xs font-medium text-green-600">+8%</div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">From last month</div>
                      <div className="mt-3 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="group rounded-xl bg-white/90 p-5 shadow-lg border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">New Users</span>
                        <div className="rounded-full bg-purple-50 p-2 text-purple-600 transition-all duration-200 group-hover:bg-purple-100 group-hover:scale-110">
                          <UserPlus className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-gray-900">{newUsers}</div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">Last joined 2 days ago</div>
                      <div className="mt-3 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="group rounded-xl bg-white/90 p-5 shadow-lg border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">VIP Users</span>
                        <div className="rounded-full bg-amber-50 p-2 text-amber-600 transition-all duration-200 group-hover:bg-amber-100 group-hover:scale-110">
                          <Star className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-gray-900">{vipUsers}</div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">${totalSpent.toLocaleString()} total spent</div>
                      <div className="mt-3 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced tabs for different views */}
              <Tabs defaultValue="all" className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <TabsList className="bg-[#f3f7fa] p-1 rounded-lg">
                    <TabsTrigger
                      value="all"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      All Users
                    </TabsTrigger>
                    <TabsTrigger
                      value="active"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Active
                    </TabsTrigger>
                    <TabsTrigger
                      value="inactive"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Inactive
                    </TabsTrigger>
                    <TabsTrigger
                      value="new"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      New
                    </TabsTrigger>
                    <TabsTrigger
                      value="vip"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      VIP
                    </TabsTrigger>
                  </TabsList>

                  {/* Enhanced search and filters */}
                  <div className="relative w-full max-w-md">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Search className="h-4 w-4" />
                    </div>
                    <Input
                      type="search"
                      placeholder="Search users by name or email..."
                      className="pl-9 w-full border-gray-200 bg-[#f3f7fa] focus-visible:ring-blue-500 transition-all duration-200 rounded-lg"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    {searchQuery && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                          onClick={() => setSearchQuery("")}
                        >
                          <span className="sr-only">Clear search</span>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-9 w-[180px] border-gray-200 bg-white shadow-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="orders-high">Orders (High-Low)</SelectItem>
                      <SelectItem value="orders-low">Orders (Low-High)</SelectItem>
                      <SelectItem value="spent-high">Spent (High-Low)</SelectItem>
                      <SelectItem value="spent-low">Spent (Low-High)</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center rounded-md border border-gray-200 p-1 bg-white shadow-sm">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      className={`h-7 px-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-500"}`}
                      onClick={() => setViewMode("grid")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="7" height="7" x="3" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="3" rx="1" />
                        <rect width="7" height="7" x="3" y="14" rx="1" />
                        <rect width="7" height="7" x="14" y="14" rx="1" />
                      </svg>
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      className={`h-7 px-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-500"}`}
                      onClick={() => setViewMode("list")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="3" x2="21" y1="6" y2="6" />
                        <line x1="3" x2="21" y1="12" y2="12" />
                        <line x1="3" x2="21" y1="18" y2="18" />
                      </svg>
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-1 border-gray-200 bg-white shadow-sm hover:bg-[#f3f7fa]"
                  >
                    <Download className="h-4 w-4 text-gray-500" />
                    Export
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-1 border-gray-200 bg-white shadow-sm hover:bg-[#f3f7fa] ml-auto"
                  >
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                    Refresh
                  </Button>
                </div>

                <TabsContent value="all">
                  {/* User grid or list view */}
                  {viewMode === "grid" ? (
                    <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {paginatedUsers.length > 0 ? (
                        paginatedUsers.map((user) => (
                          <Link key={user.id} href={`/admin/users/${user.id}`} className="group">
                            <Card className="h-full overflow-hidden border-none transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] bg-white/90 backdrop-blur-sm">
                              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 opacity-80" />
                              <CardHeader className="pb-3 pt-6">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="relative">
                                      <div className="rounded-full p-0.5 bg-gradient-to-r from-blue-100 to-blue-50">
                                        <Avatar className="h-12 w-12 border-2 border-white shadow-md ring-2 ring-[#f3f7fa] transition-all duration-200 group-hover:ring-blue-100">
                                          <AvatarImage src={user.avatar} alt={user.name} />
                                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 font-medium">
                                            {user.initials}
                                          </AvatarFallback>
                                        </Avatar>
                                      </div>
                                      {user.vip && (
                                        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-md">
                                          <Star className="h-3 w-3" />
                                        </div>
                                      )}
                                      <div
                                        className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
                                          user.status === "Active"
                                            ? "bg-green-500"
                                            : user.status === "Inactive"
                                              ? "bg-gray-400"
                                              : "bg-blue-500"
                                        }`}
                                      ></div>
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {user.name}
                                      </div>
                                      <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                  </div>
                                  {renderStatusBadge(user.status)}
                                </div>
                              </CardHeader>
                              <CardContent className="pb-3">
                                <div className="grid grid-cols-2 gap-4 rounded-lg bg-[#f3f7fa] p-3">
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <ShoppingBag className="h-3.5 w-3.5 text-blue-600" />
                                      <div className="text-xs font-medium text-gray-500">Orders</div>
                                    </div>
                                    <div className="mt-1 font-medium text-gray-900">{user.orders || "0"}</div>
                                    <div className="text-xs text-gray-500">Last: {user.lastOrder}</div>
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <CreditCard className="h-3.5 w-3.5 text-blue-600" />
                                      <div className="text-xs font-medium text-gray-500">Spent</div>
                                    </div>
                                    <div className="mt-1 font-medium text-gray-900">${user.spent || "0"}</div>
                                    <div className="text-xs text-gray-500">Growth: {user.growth}</div>
                                  </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <Badge variant="outline" className="border-gray-200 bg-[#f3f7fa] text-gray-700">
                                      {user.role}
                                    </Badge>
                                    <span className="text-xs text-gray-500">•</span>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <Clock className="h-3 w-3 text-gray-400" />
                                      {user.lastActive}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="flex items-center justify-between border-t border-gray-100 pt-3">
                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                  Joined {user.joined}
                                </div>
                                <div className="flex items-center gap-1 text-xs font-medium text-blue-600 transition-all duration-200 group-hover:text-blue-800 group-hover:gap-2">
                                  View details
                                  <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                              </CardFooter>

                              {/* Quick actions overlay */}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-sm">
                                <div className="flex gap-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="secondary"
                                          className="h-9 w-9 p-0 rounded-full bg-white/90 shadow-md hover:bg-blue-50"
                                        >
                                          <Mail className="h-4 w-4 text-blue-600" />
                                          <span className="sr-only">Email</span>
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Send email</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="secondary"
                                          className="h-9 w-9 p-0 rounded-full bg-white/90 shadow-md hover:bg-blue-50"
                                        >
                                          <Phone className="h-4 w-4 text-blue-600" />
                                          <span className="sr-only">Call</span>
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Call user</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="secondary"
                                          className="h-9 w-9 p-0 rounded-full bg-white/90 shadow-md hover:bg-blue-50"
                                        >
                                          <Edit className="h-4 w-4 text-blue-600" />
                                          <span className="sr-only">Edit</span>
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Edit user</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white/80 backdrop-blur-sm p-8 text-center">
                          <div>
                            <p className="text-gray-500">No users found matching your criteria</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-4"
                              onClick={() => {
                                setSearchQuery("")
                                setSelectedStatus(null)
                                router.push("/admin/users?page=1")
                              }}
                            >
                              Reset filters
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50/80">
                              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                User
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Status
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Role
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Orders
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Spent
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Joined
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Last Active
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {paginatedUsers.length > 0 ? (
                              paginatedUsers.map((user) => (
                                <tr key={user.id} className="group transition-colors hover:bg-[#f3f7fa]">
                                  <td className="whitespace-nowrap px-4 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="relative">
                                        <Avatar className="h-10 w-10 border border-gray-200">
                                          <AvatarImage src={user.avatar} alt={user.name} />
                                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 font-medium">
                                            {user.initials}
                                          </AvatarFallback>
                                        </Avatar>
                                        {user.vip && (
                                          <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-white">
                                            <Star className="h-2.5 w-2.5" />
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <div className="font-medium text-gray-900">{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4">{renderStatusBadge(user.status)}</td>
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{user.role}</td>
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{user.orders}</td>
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">${user.spent}</td>
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{user.joined}</td>
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                    {user.lastActive}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                          <Link href={`/admin/users/${user.id}`} className="flex items-center">
                                            <ArrowUpRight className="mr-2 h-4 w-4" />
                                            View Details
                                          </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Mail className="mr-2 h-4 w-4" />
                                          Send Email
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit User
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete User
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                                  <p>No users found matching your criteria</p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-4"
                                    onClick={() => {
                                      setSearchQuery("")
                                      setSelectedStatus(null)
                                      router.push("/admin/users?page=1")
                                    }}
                                  >
                                    Reset filters
                                  </Button>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="active">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium text-gray-900">Active Users View</h3>
                    <p className="text-gray-500 mt-2">This tab would display only active users</p>
                  </div>
                </TabsContent>

                <TabsContent value="inactive">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium text-gray-900">Inactive Users View</h3>
                    <p className="text-gray-500 mt-2">This tab would display only inactive users</p>
                  </div>
                </TabsContent>

                <TabsContent value="new">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium text-gray-900">New Users View</h3>
                    <p className="text-gray-500 mt-2">This tab would display only new users</p>
                  </div>
                </TabsContent>

                <TabsContent value="vip">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium text-gray-900">VIP Users View</h3>
                    <p className="text-gray-500 mt-2">This tab would display only VIP users</p>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Enhanced pagination */}
              {filteredUsers.length > 0 && (
                <div className="my-8 flex flex-col items-center">
                  <Pagination className="mb-2">
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            href={`/admin/users?page=${currentPage - 1}`}
                            className="border border-gray-200 bg-white shadow-sm hover:bg-[#f3f7fa]"
                          />
                        </PaginationItem>
                      )}

                      {renderPaginationItems()}

                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext
                            href={`/admin/users?page=${currentPage + 1}`}
                            className="border border-gray-200 bg-white shadow-sm hover:bg-[#f3f7fa]"
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                  <div className="text-sm text-gray-500">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
                    {filteredUsers.length} users
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

