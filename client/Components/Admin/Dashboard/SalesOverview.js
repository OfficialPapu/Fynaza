import { Calendar, CalendarCheck, CalendarClock, CalendarDays, CalendarRange, Check, RotateCcw, ShoppingCart, Truck } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/Components/ui/button"


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

export function SalesOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
        <p className="mt-2 text-muted-foreground">Welcome back, check your business summary.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-emerald-600 p-6 text-white">
          <div className="flex flex-col gap-2">
            <CalendarDays className="h-6 w-6" />
            <p className="text-sm">Today Orders</p>
            <p className="text-2xl font-bold">$897.40</p>
          </div>
        </Card>
        <Card className="bg-orange-400 p-6 text-white">
          <div className="flex flex-col gap-2">
            <CalendarCheck className="h-6 w-6" />
            <p className="text-sm">Yesterday Orders</p>
            <p className="text-2xl font-bold">$679.93</p>
          </div>
        </Card>
        <Card className="bg-blue-500 p-6 text-white">
          <div className="flex flex-col gap-2">
            <Calendar className="h-6 w-6" />
            <p className="text-sm">This Month</p>
            <p className="text-2xl font-bold">$13146.96</p>
          </div>
        </Card>
        <Card className="bg-teal-600 p-6 text-white">
          <div className="flex flex-col gap-2">
            <CalendarRange className="h-6 w-6" />
            <p className="text-sm">Last Month</p>
            <p className="text-2xl font-bold">$31964.92</p>
          </div>
        </Card>
        <Card className="bg-emerald-500 p-6 text-white">
          <div className="flex flex-col gap-2">
            <CalendarClock className="h-6 w-6" />
            <p className="text-sm">All-Time Sales</p>
            <p className="text-2xl font-bold">$626513.05</p>
          </div>
        </Card>
      </div>

      {/* Order Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-orange-100 p-3">
              <ShoppingCart className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">815</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <RotateCcw className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Orders Pending</p>
              <p className="text-2xl font-bold">263</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-yellow-100 p-3">
              <Truck className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Orders Processing</p>
              <p className="text-2xl font-bold">97</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Orders Delivered</p>
              <p className="text-2xl font-bold">418</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-medium">Latest Orders</CardTitle>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">#3210</TableCell>
                <TableCell>John Smith</TableCell>
                <TableCell>Product A</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                    Delivered
                  </span>
                </TableCell>
                <TableCell className="text-right">$89.99</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3209</TableCell>
                <TableCell>Sarah Johnson</TableCell>
                <TableCell>Product B</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700">
                    Processing
                  </span>
                </TableCell>
                <TableCell className="text-right">$149.99</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#3208</TableCell>
                <TableCell>Michael Brown</TableCell>
                <TableCell>Product C</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700">
                    Pending
                  </span>
                </TableCell>
                <TableCell className="text-right">$59.99</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

