"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Calendar,
  ChevronDown,
  Copy,
  Download,
  Edit,
  Filter,
  Home,
  MoreHorizontal,
  Percent,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShoppingBag,
  Trash2,
  Users,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Switch } from "@/Components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"

export default function CouponsPage() {
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCoupons, setSelectedCoupons] = useState([])

  // Sample coupon data
  const coupons = [
    {
      id: "1",
      code: "SUMMER25",
      type: "percentage",
      value: 25,
      minPurchase: 50,
      usageLimit: 1000,
      usageCount: 342,
      status: "active",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      createdAt: "2023-05-15",
    },
    {
      id: "2",
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      minPurchase: 0,
      usageLimit: null,
      usageCount: 1245,
      status: "active",
      startDate: "2023-01-01",
      endDate: null,
      createdAt: "2023-01-01",
    },
    {
      id: "3",
      code: "FREESHIP",
      type: "shipping",
      value: 0,
      minPurchase: 75,
      usageLimit: 500,
      usageCount: 423,
      status: "active",
      startDate: "2023-07-01",
      endDate: "2023-07-31",
      createdAt: "2023-06-25",
    },
    {
      id: "4",
      code: "FLASH50",
      type: "percentage",
      value: 50,
      minPurchase: 100,
      usageLimit: 200,
      usageCount: 198,
      status: "active",
      startDate: "2023-07-15",
      endDate: "2023-07-16",
      createdAt: "2023-07-14",
    },
    {
      id: "5",
      code: "HOLIDAY20",
      type: "percentage",
      value: 20,
      minPurchase: 50,
      usageLimit: 1000,
      usageCount: 876,
      status: "expired",
      startDate: "2022-12-01",
      endDate: "2022-12-31",
      createdAt: "2022-11-15",
    },
    {
      id: "6",
      code: "CLEARANCE30",
      type: "percentage",
      value: 30,
      minPurchase: 0,
      usageLimit: 500,
      usageCount: 487,
      status: "expired",
      startDate: "2023-01-15",
      endDate: "2023-02-15",
      createdAt: "2023-01-10",
    },
    {
      id: "7",
      code: "FIXED15",
      type: "fixed",
      value: 15,
      minPurchase: 75,
      usageLimit: 300,
      usageCount: 142,
      status: "active",
      startDate: "2023-06-01",
      endDate: "2023-09-30",
      createdAt: "2023-05-25",
    },
    {
      id: "8",
      code: "NEWUSER",
      type: "percentage",
      value: 15,
      minPurchase: 0,
      usageLimit: 1,
      usageCount: 543,
      status: "active",
      startDate: "2023-01-01",
      endDate: null,
      createdAt: "2023-01-01",
    },
  ]

  // Filter coupons based on status and search query
  const filteredCoupons = coupons.filter((coupon) => {
    const matchesStatus = statusFilter === "all" || coupon.status === statusFilter
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Toggle coupon selection
  const toggleCouponSelection = (couponId) => {
    if (selectedCoupons.includes(couponId)) {
      setSelectedCoupons(selectedCoupons.filter((id) => id !== couponId))
    } else {
      setSelectedCoupons([...selectedCoupons, couponId])
    }
  }

  // Select all coupons
  const toggleSelectAll = () => {
    if (selectedCoupons.length === filteredCoupons.length) {
      setSelectedCoupons([])
    } else {
      setSelectedCoupons(filteredCoupons.map((coupon) => coupon.id))
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "No expiry"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Generate random coupon code
  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <span className="text-lg font-bold">Admin Portal</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="relative h-8 w-8 rounded-full bg-muted">
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">A</span>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Layout */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r bg-background md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="px-2 py-2">
              <h2 className="px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
              <div className="mt-3 space-y-1">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/admin">
                    <Home className="mr-2 h-4 w-4" />
                    Overview
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/admin/orders">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/admin/customers">
                    <Users className="mr-2 h-4 w-4" />
                    Customers
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full justify-start">
                  <Link href="/admin/coupons">
                    <Percent className="mr-2 h-4 w-4" />
                    Coupons
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {/* Breadcrumbs */}
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/coupons">Coupons</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}

            {/* Page Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Coupon Codes</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Dialog open={isAddCouponOpen} onOpenChange={setIsAddCouponOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Coupon
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Create New Coupon Code</DialogTitle>
                      <DialogDescription>Add a new coupon code to offer discounts to your customers.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="couponCode" className="text-right">
                          Code
                        </Label>
                        <div className="col-span-3 flex gap-2">
                          <Input id="couponCode" placeholder="e.g. SUMMER25" className="flex-1" />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const codeInput = document.getElementById("couponCode")
                              if (codeInput) codeInput.value = generateRandomCode()
                            }}
                          >
                            Generate
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Discount Type</Label>
                        <div className="col-span-3">
                          <RadioGroup defaultValue="percentage" className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="percentage" id="percentage" />
                              <Label htmlFor="percentage">Percentage discount</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="fixed" id="fixed" />
                              <Label htmlFor="fixed">Fixed amount discount</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="shipping" id="shipping" />
                              <Label htmlFor="shipping">Free shipping</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="discountValue" className="text-right">
                          Discount Value
                        </Label>
                        <div className="col-span-3 flex items-center gap-2">
                          <Input id="discountValue" type="number" placeholder="25" />
                          <span className="text-muted-foreground">%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="minPurchase" className="text-right">
                          Min. Purchase
                        </Label>
                        <div className="col-span-3 flex items-center gap-2">
                          <span className="text-muted-foreground">$</span>
                          <Input id="minPurchase" type="number" placeholder="50" />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="usageLimit" className="text-right">
                          Usage Limit
                        </Label>
                        <Input id="usageLimit" type="number" placeholder="1000" className="col-span-3" />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">
                          Start Date
                        </Label>
                        <Input id="startDate" type="date" className="col-span-3" />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right">
                          End Date
                        </Label>
                        <Input id="endDate" type="date" className="col-span-3" />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="couponStatus" className="text-right">
                          Status
                        </Label>
                        <div className="flex items-center gap-2 col-span-3">
                          <Switch id="couponStatus" defaultChecked />
                          <Label htmlFor="couponStatus" className="text-sm text-muted-foreground">
                            Active
                          </Label>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddCouponOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" onClick={() => setIsAddCouponOpen(false)}>
                        Create Coupon
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{coupons.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {coupons.filter((c) => c.status === "active").length} active,{" "}
                    {coupons.filter((c) => c.status === "expired").length} expired
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Redemptions</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {coupons.reduce((total, coupon) => total + coupon.usageCount, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Total coupon redemptions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Most Used</CardTitle>
                  <Badge className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {coupons.sort((a, b) => b.usageCount - a.usageCount)[0]?.code || "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {coupons.sort((a, b) => b.usageCount - a.usageCount)[0]?.usageCount || 0} redemptions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      coupons.filter(
                        (c) =>
                          c.status === "active" &&
                          c.endDate &&
                          new Date(c.endDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000,
                      ).length
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">Coupons expiring in 7 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs and Table */}
            <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value)}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Coupons</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search coupons..."
                      className="w-[200px] pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Discount Type</DropdownMenuItem>
                      <DropdownMenuItem>Date Created</DropdownMenuItem>
                      <DropdownMenuItem>Expiration Date</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Clear Filters</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <TabsContent value="all" className="mt-0 pt-4">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40px]">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={
                                  selectedCoupons.length === filteredCoupons.length && filteredCoupons.length > 0
                                }
                                onChange={toggleSelectAll}
                              />
                            </div>
                          </TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Discount</TableHead>
                          <TableHead>Min. Purchase</TableHead>
                          <TableHead>Usage</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Expiry Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCoupons.length > 0 ? (
                          filteredCoupons.map((coupon) => (
                            <TableRow key={coupon.id}>
                              <TableCell>
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  checked={selectedCoupons.includes(coupon.id)}
                                  onChange={() => toggleCouponSelection(coupon.id)}
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  {coupon.code}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => navigator.clipboard.writeText(coupon.code)}
                                  >
                                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                {coupon.type === "percentage" && `${coupon.value}%`}
                                {coupon.type === "fixed" && `$${coupon.value}`}
                                {coupon.type === "shipping" && "Free Shipping"}
                              </TableCell>
                              <TableCell>{coupon.minPurchase > 0 ? `$${coupon.minPurchase}` : "None"}</TableCell>
                              <TableCell>
                                {coupon.usageCount} / {coupon.usageLimit ? coupon.usageLimit : "∞"}
                              </TableCell>
                              <TableCell>
                                <Badge variant={coupon.status === "active" ? "default" : "secondary"}>
                                  {coupon.status === "active" ? "Active" : "Expired"}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatDate(coupon.endDate)}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Copy className="mr-2 h-4 w-4" />
                                      Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                              No coupons found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>{filteredCoupons.length}</strong> of <strong>{coupons.length}</strong> coupons
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select defaultValue="10">
                          <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder="10" />
                          </SelectTrigger>
                          <SelectContent side="top">
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 p-0" disabled>
                          <ChevronDown className="h-4 w-4 rotate-90" />
                          <span className="sr-only">Previous page</span>
                        </Button>
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                          Page 1 of 1
                        </div>
                        <Button variant="outline" size="icon" className="h-8 w-8 p-0" disabled>
                          <ChevronDown className="h-4 w-4 -rotate-90" />
                          <span className="sr-only">Next page</span>
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="active" className="mt-0 pt-4">
                {/* Same table structure as above, filtered for active coupons */}
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40px]">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={
                                  selectedCoupons.length === filteredCoupons.length && filteredCoupons.length > 0
                                }
                                onChange={toggleSelectAll}
                              />
                            </div>
                          </TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Discount</TableHead>
                          <TableHead>Min. Purchase</TableHead>
                          <TableHead>Usage</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Expiry Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCoupons.length > 0 ? (
                          filteredCoupons.map((coupon) => (
                            <TableRow key={coupon.id}>
                              <TableCell>
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  checked={selectedCoupons.includes(coupon.id)}
                                  onChange={() => toggleCouponSelection(coupon.id)}
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  {coupon.code}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => navigator.clipboard.writeText(coupon.code)}
                                  >
                                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                {coupon.type === "percentage" && `${coupon.value}%`}
                                {coupon.type === "fixed" && `$${coupon.value}`}
                                {coupon.type === "shipping" && "Free Shipping"}
                              </TableCell>
                              <TableCell>{coupon.minPurchase > 0 ? `$${coupon.minPurchase}` : "None"}</TableCell>
                              <TableCell>
                                {coupon.usageCount} / {coupon.usageLimit ? coupon.usageLimit : "∞"}
                              </TableCell>
                              <TableCell>
                                <Badge variant="default">Active</Badge>
                              </TableCell>
                              <TableCell>{formatDate(coupon.endDate)}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Copy className="mr-2 h-4 w-4" />
                                      Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                              No active coupons found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>{filteredCoupons.length}</strong> of{" "}
                      <strong>{coupons.filter((c) => c.status === "active").length}</strong> active coupons
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select defaultValue="10">
                          <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder="10" />
                          </SelectTrigger>
                          <SelectContent side="top">
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 p-0" disabled>
                          <ChevronDown className="h-4 w-4 rotate-90" />
                          <span className="sr-only">Previous page</span>
                        </Button>
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                          Page 1 of 1
                        </div>
                        <Button variant="outline" size="icon" className="h-8 w-8 p-0" disabled>
                          <ChevronDown className="h-4 w-4 -rotate-90" />
                          <span className="sr-only">Next page</span>
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="expired" className="mt-0 pt-4">
                {/* Same table structure as above, filtered for expired coupons */}
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40px]">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={
                                  selectedCoupons.length === filteredCoupons.length && filteredCoupons.length > 0
                                }
                                onChange={toggleSelectAll}
                              />
                            </div>
                          </TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Discount</TableHead>
                          <TableHead>Min. Purchase</TableHead>
                          <TableHead>Usage</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Expiry Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCoupons.length > 0 ? (
                          filteredCoupons.map((coupon) => (
                            <TableRow key={coupon.id}>
                              <TableCell>
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  checked={selectedCoupons.includes(coupon.id)}
                                  onChange={() => toggleCouponSelection(coupon.id)}
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  {coupon.code}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => navigator.clipboard.writeText(coupon.code)}
                                  >
                                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                {coupon.type === "percentage" && `${coupon.value}%`}
                                {coupon.type === "fixed" && `$${coupon.value}`}
                                {coupon.type === "shipping" && "Free Shipping"}
                              </TableCell>
                              <TableCell>{coupon.minPurchase > 0 ? `$${coupon.minPurchase}` : "None"}</TableCell>
                              <TableCell>
                                {coupon.usageCount} / {coupon.usageLimit ? coupon.usageLimit : "∞"}
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">Expired</Badge>
                              </TableCell>
                              <TableCell>{formatDate(coupon.endDate)}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Copy className="mr-2 h-4 w-4" />
                                      Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                              No expired coupons found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>{filteredCoupons.length}</strong> of{" "}
                      <strong>{coupons.filter((c) => c.status === "expired").length}</strong> expired coupons
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select defaultValue="10">
                          <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder="10" />
                          </SelectTrigger>
                          <SelectContent side="top">
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 p-0" disabled>
                          <ChevronDown className="h-4 w-4 rotate-90" />
                          <span className="sr-only">Previous page</span>
                        </Button>
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                          Page 1 of 1
                        </div>
                        <Button variant="outline" size="icon" className="h-8 w-8 p-0" disabled>
                          <ChevronDown className="h-4 w-4 -rotate-90" />
                          <span className="sr-only">Next page</span>
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

