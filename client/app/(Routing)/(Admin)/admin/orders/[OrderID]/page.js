"use client"
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import Header from "@/Components/Admin/Orders/OrderDetails/Header"
import OrderSummary from "@/Components/Admin/Orders/OrderDetails/OrderSummary"
import OrderDetails from "@/Components/Admin/Orders/OrderDetails/OrderDetails"
import UserInfo from "@/Components/Admin/Orders/OrderDetails/UserInfo"
import ProductInfo from "@/Components/Admin/Orders/OrderDetails/ProductInfo"
import UpdateStatusDialog from "@/Components/Admin/Orders/OrderDetails/UpdateStatusDialog"
import AddNoteDialog from "@/Components/Admin/Orders/OrderDetails/AddNoteDialog"
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
            <TabsList className="inline-flex w-full min-w-max sm:grid sm:grid-cols-3 sm:w-auto">
              <TabsTrigger value="details">Order Details</TabsTrigger>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
            </TabsList>
          </div>
          <OrderDetails />
          <ProductInfo />
          <UserInfo />
        </Tabs>
      </main>
      <UpdateStatusDialog />
      <AddNoteDialog />
    </div>
  )
}

