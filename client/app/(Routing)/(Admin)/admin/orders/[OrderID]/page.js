"use client"
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import Header from "@/Components/Admin/Orders/OrderDetails/Header"
import OrderSummary from "@/Components/Admin/Orders/OrderDetails/OrderSummary"
import OrderDetails from "@/Components/Admin/Orders/OrderDetails/OrderDetails"
import UserInfo from "@/Components/Admin/Orders/OrderDetails/UserInfo"
import UpdateStatusDialog from "@/Components/Admin/Orders/OrderDetails/UpdateStatusDialog"
import useOrderDetailsActions from "@/Components/Admin/Orders/OrderDetails/useOrderDetailsActions"

export default function OrderDetailPage() {
  const { setActiveTab } = useOrderDetailsActions();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main>
        <OrderSummary />
        <Tabs defaultValue="details" className="mb-6" onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full min-w-max grid grid-cols-2">
              <TabsTrigger value="details">Order Details</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
            </TabsList>
          </div>
          <OrderDetails />
          <UserInfo />
        </Tabs>
      </main>
      <UpdateStatusDialog />
    </div>
  )
}

