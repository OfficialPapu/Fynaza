"use client"
import { Badge } from "@/Components/ui/badge"
import { TabsContent, } from "@/Components/ui/tabs"
import useOrderDetailsActions from "./useOrderDetailsActions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"


const ProductInfo = () => {
  const { orderData } = useOrderDetailsActions();
  return (
    <TabsContent value="items" className="mt-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Order Items</CardTitle>
            <Badge variant="outline" className="px-2.5 py-0.5 text-xs font-medium">
              {orderData.items.length} items
            </Badge>
          </div>
          <CardDescription>Items included in this order</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="block sm:hidden">
            {orderData.items.map((item) => (
              <div
                key={item.id}
                className="mb-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{item.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">SKU: {item.sku}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">Price</div>
                    <div className="font-medium text-slate-900 dark:text-white">{item.price}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">Quantity</div>
                    <div className="font-medium text-slate-900 dark:text-white">{item.quantity}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">Total</div>
                    <div className="font-medium text-slate-900 dark:text-white">{item.total}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden sm:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {orderData.items.map((item) => (
                  <tr key={item.id} className="bg-white dark:bg-slate-950">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">{item.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">SKU: {item.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-700 dark:text-slate-300">
                      {item.price}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-700 dark:text-slate-300">
                      {item.quantity}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 border-t bg-slate-50 px-4 py-3 sm:px-6 sm:py-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Total Items:{" "}
            <span className="font-medium text-slate-900 dark:text-white">{orderData.items.length}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500 dark:text-slate-400">Order Total</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{orderData.payment.total}</div>
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  )
}

export default ProductInfo
