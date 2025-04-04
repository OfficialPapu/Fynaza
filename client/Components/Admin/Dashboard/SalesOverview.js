"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  DollarSign,
  Download,
  Filter,
  MapPin,
  Package,
  Percent,
  RefreshCw,
  ShoppingBag,
  Users,
} from "lucide-react"

import DesktopCard from "@/Components/Admin/Orders/DesktopCard"
import MobileCard from "@/Components/Admin/Orders/MobileCard"

import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Badge } from "@/Components/ui/badge"
import { Progress } from "@/Components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/Components/ui/dropdown-menu"

export default function SalesOverview() {
  const [timeFilter, setTimeFilter] = useState("today")
  const [statusFilter, setStatusFilter] = useState([])
  const [activeTab, setActiveTab] = useState("overview")

  // Simple data for the dashboard
  const dashboardData = {
    today: {
      orderCount: 24,
      revenue: "$1,234.56",
      products: 156,
      customers: 18,
      percentChange: 12.5,
    },
    yesterday: {
      orderCount: 18,
      revenue: "$987.65",
      products: 156,
      customers: 15,
      percentChange: 8.2,
    },
    "7days": {
      orderCount: 142,
      revenue: "$8,765.43",
      products: 156,
      customers: 87,
      percentChange: 8.3,
    },
    "15days": {
      orderCount: 287,
      revenue: "$16,432.78",
      products: 156,
      customers: 156,
      percentChange: 10.5,
    },
    "30days": {
      orderCount: 567,
      revenue: "$34,567.89",
      products: 156,
      customers: 312,
      percentChange: 15.7,
    },
    "1year": {
      orderCount: 6248,
      revenue: "$412,876.54",
      products: 156,
      customers: 2845,
      percentChange: 24.3,
    },
    lifetime: {
      orderCount: 12567,
      revenue: "$876,543.21",
      products: 156,
      customers: 5432,
      percentChange: 0,
    },
  }

  // Get data based on selected time filter
  const currentData = dashboardData[timeFilter]

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-between">
                {timeFilter === "today" && "Today"}
                {timeFilter === "yesterday" && "Yesterday"}
                {timeFilter === "7days" && "Last 7 Days"}
                {timeFilter === "15days" && "Last 15 Days"}
                {timeFilter === "30days" && "Last 30 Days"}
                {timeFilter === "1year" && "Last Year"}
                {timeFilter === "lifetime" && "Lifetime"}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem onClick={() => setTimeFilter("today")} className="flex items-center justify-between">
                Today {timeFilter === "today" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTimeFilter("yesterday")}
                className="flex items-center justify-between"
              >
                Yesterday {timeFilter === "yesterday" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("7days")} className="flex items-center justify-between">
                Last 7 Days {timeFilter === "7days" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("15days")} className="flex items-center justify-between">
                Last 15 Days {timeFilter === "15days" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("30days")} className="flex items-center justify-between">
                Last 30 Days {timeFilter === "30days" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("1year")} className="flex items-center justify-between">
                Last Year {timeFilter === "1year" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("lifetime")} className="flex items-center justify-between">
                Lifetime {timeFilter === "lifetime" && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex flex-wrap justify-start bg-white">
          <TabsTrigger
            value="overview"
            className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Sales Analytics
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Inventory
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Customers
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-4 pt-4">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.orderCount}</div>
                <div className="flex items-center pt-1">
                  <span
                    className={`text-xs ${currentData.percentChange > 0 ? "text-emerald-500" : "text-rose-500"} inline-flex items-center`}
                  >
                    {currentData.percentChange > 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(currentData.percentChange)}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs. previous period</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.revenue}</div>
                <div className="flex items-center pt-1">
                  <span
                    className={`text-xs ${currentData.percentChange > 0 ? "text-emerald-500" : "text-rose-500"} inline-flex items-center`}
                  >
                    {currentData.percentChange > 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(currentData.percentChange)}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs. previous period</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.products}</div>
                <p className="text-xs text-muted-foreground pt-1">Total active products</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.customers}</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-emerald-500 inline-flex items-center">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    5.2%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">new customers</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <CardTitle>Recent Orders</CardTitle>
          <DesktopCard />
          <MobileCard />
        </TabsContent>

        {/* Sales Analytics Tab Content */}
        <TabsContent value="sales" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Daily sales performance for the current period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Simulated line chart */}
                  <div className="h-full w-full bg-muted/20 rounded-md flex items-end justify-between px-2 relative">
                    {/* Chart line */}
                    <div className="absolute inset-0 flex items-end px-2">
                      <svg className="w-full h-[70%]" viewBox="0 0 100 50" preserveAspectRatio="none">
                        <path
                          d="M0,50 L5,45 L10,48 L15,40 L20,42 L25,38 L30,35 L35,30 L40,32 L45,25 L50,20 L55,15 L60,18 L65,12 L70,8 L75,15 L80,10 L85,5 L90,8 L95,3 L100,0"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {/* X-axis labels */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="relative w-full flex flex-col items-center z-10">
                        <div className="mt-2 text-xs text-muted-foreground">{i + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span className="text-sm">Electronics</span>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Clothing</span>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2 bg-muted [&>div]:bg-blue-500" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Home & Garden</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <Progress value={15} className="h-2 bg-muted [&>div]:bg-green-500" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Toys & Games</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <Progress value={10} className="h-2 bg-muted [&>div]:bg-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$85.25</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-emerald-500 inline-flex items-center">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    4.3%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs. previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.42%</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-rose-500 inline-flex items-center">
                    <ArrowDown className="mr-1 h-3 w-3" />
                    0.5%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs. previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Cart Abandonment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68.7%</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-emerald-500 inline-flex items-center">
                    <ArrowDown className="mr-1 h-3 w-3" />
                    2.1%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs. previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Refund Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1%</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-emerald-500 inline-flex items-center">
                    <ArrowDown className="mr-1 h-3 w-3" />
                    0.3%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs. previous period</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Distribution of payment methods used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                  <div className="relative h-40 w-40">
                    {/* Simulated pie chart */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--primary))"
                        strokeWidth="20"
                        strokeDasharray="188.5 251.3"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--primary)/0.7)"
                        strokeWidth="20"
                        strokeDasharray="62.8 377"
                        strokeDashoffset="-188.5"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--muted))"
                        strokeWidth="20"
                        strokeDasharray="31.4 408.4"
                        strokeDashoffset="-251.3"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span className="text-sm">Credit Card</span>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: "hsl(var(--primary)/0.7)" }}
                      ></div>
                      <span className="text-sm">PayPal</span>
                    </div>
                    <span className="text-sm font-medium">20%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-muted"></div>
                      <span className="text-sm">Bank Transfer</span>
                    </div>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Tab Content */}
        <TabsContent value="inventory" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground pt-1">Across all categories</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Low Stock Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">24</div>
                <p className="text-xs text-muted-foreground pt-1">Items below threshold</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Out of Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-500">8</div>
                <p className="text-xs text-muted-foreground pt-1">Items to reorder</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Inventory Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$124,500</div>
                <p className="text-xs text-muted-foreground pt-1">Total value of inventory</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performing products by sales volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Wireless Headphones", category: "Electronics", sold: 234, stock: 56, value: "$12,500" },
                  { name: "Smart Watch", category: "Electronics", sold: 189, stock: 23, value: "$9,450" },
                  { name: "Running Shoes", category: "Clothing", sold: 156, stock: 78, value: "$8,580" },
                  { name: "Coffee Maker", category: "Home", sold: 132, stock: 12, value: "$7,920" },
                  { name: "Laptop Backpack", category: "Accessories", sold: 98, stock: 45, value: "$3,920" },
                ].map((product, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-9 text-center font-medium text-muted-foreground">#{i + 1}</div>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm font-medium">{product.sold} sold</p>
                      <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
                    </div>
                    <div className="ml-4 w-24 text-right">
                      <p className="text-sm font-medium">{product.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Products
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alerts</CardTitle>
              <CardDescription>Products that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                  <div>Product</div>
                  <div>Category</div>
                  <div className="text-center">Status</div>
                  <div className="text-right">Stock</div>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Bluetooth Speaker", category: "Electronics", status: "Low Stock", stock: 5 },
                    { name: "Fitness Tracker", category: "Electronics", status: "Out of Stock", stock: 0 },
                    { name: "Desk Lamp", category: "Home", status: "Low Stock", stock: 3 },
                    { name: "Wireless Charger", category: "Electronics", status: "Low Stock", stock: 7 },
                    { name: "Tablet Case", category: "Accessories", status: "Out of Stock", stock: 0 },
                  ].map((item, i) => (
                    <div key={i} className="grid grid-cols-4 items-center">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-sm">{item.category}</div>
                      <div className="text-center">
                        <Badge variant={item.stock === 0 ? "destructive" : "outline"} className="text-xs">
                          {item.status}
                        </Badge>
                      </div>
                      <div className="text-right text-sm">{item.stock} units</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Package className="mr-2 h-4 w-4" />
                Manage Inventory
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Customers Tab Content */}
        <TabsContent value="customers" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,345</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-emerald-500 inline-flex items-center">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    8.2%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs. previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">New Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground pt-1">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Returning Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.5%</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-emerald-500 inline-flex items-center">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    3.1%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs. previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Avg. Lifetime Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$235.80</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-emerald-500 inline-flex items-center">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    5.4%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs. previous period</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Distribution by customer type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center">
                  {/* Simulated pie chart */}
                  <div className="relative h-40 w-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--primary))"
                        strokeWidth="20"
                        strokeDasharray="125.7 314.2"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--primary)/0.7)"
                        strokeWidth="20"
                        strokeDasharray="94.2 345.6"
                        strokeDashoffset="-125.7"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="hsl(var(--muted))"
                        strokeWidth="20"
                        strokeDasharray="94.2 345.6"
                        strokeDashoffset="-219.9"
                      />
                    </svg>
                  </div>

                  <div className="ml-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span className="text-sm">New (40%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: "hsl(var(--primary)/0.7)" }}
                      ></div>
                      <span className="text-sm">Returning (30%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-muted"></div>
                      <span className="text-sm">Loyal (30%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Top customer locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: "United States", percent: 45 },
                    { country: "United Kingdom", percent: 15 },
                    { country: "Canada", percent: 12 },
                    { country: "Australia", percent: 8 },
                    { country: "Germany", percent: 6 },
                    { country: "Other", percent: 14 },
                  ].map((location, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{location.country}</span>
                        </div>
                        <span className="text-sm font-medium">{location.percent}%</span>
                      </div>
                      <Progress value={location.percent} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Customer Activity</CardTitle>
              <CardDescription>Latest customer interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: { name: "Emma Wilson", image: "/placeholder.svg?height=32&width=32&text=EW" },
                    action: "placed an order",
                    details: "Wireless Headphones",
                    time: "10 minutes ago",
                  },
                  {
                    user: { name: "James Miller", image: "/placeholder.svg?height=32&width=32&text=JM" },
                    action: "created an account",
                    details: "",
                    time: "1 hour ago",
                  },
                  {
                    user: { name: "Sophia Taylor", image: "/placeholder.svg?height=32&width=32&text=ST" },
                    action: "left a review",
                    details: "5 stars for Smart Watch",
                    time: "3 hours ago",
                  },
                  {
                    user: { name: "Noah Anderson", image: "/placeholder.svg?height=32&width=32&text=NA" },
                    action: "added items to cart",
                    details: "3 items",
                    time: "5 hours ago",
                  },
                  {
                    user: { name: "Olivia Martinez", image: "/placeholder.svg?height=32&width=32&text=OM" },
                    action: "requested a refund",
                    details: "Coffee Maker",
                    time: "Yesterday",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={activity.user.image} alt={activity.user.name} />
                      <AvatarFallback>
                        {activity.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        <span className="font-semibold">{activity.user.name}</span> {activity.action}
                      </p>
                      {activity.details && <p className="text-sm text-muted-foreground">{activity.details}</p>}
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                View All Customer Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}

