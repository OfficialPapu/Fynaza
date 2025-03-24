import { CreditCardIcon, TagIcon, Truck, ArrowRight } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Separator } from "@/Components/ui/separator"
import { useSelector } from "react-redux"
import useCartActions from "@/hooks/Cart"

const OrderSummary = () => {
  const CartItems = useSelector((state) => state.Cart.CartItems)
  const { HandelCheckout, PickupOptions, handlePickupOptionChange, selectedPickupOption, PickupCost, Subtotal, Discount, Total } = useCartActions();
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-4 space-y-4">
        {/* Pickup Options */}
        <Card className="rounded-2xl border-gray-100 shadow-sm overflow-hidden">
          <CardHeader className="bg-[#f9fafc] pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Truck className="mr-2 h-5 w-5 text-gray-600" />
              Pickup Options
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <RadioGroup
              value={selectedPickupOption}
              onValueChange={() => handlePickupOptionChange()}
              className="space-y-3"
            >
              {PickupOptions.map((option) => (
                <div
                  key={option.ID}
                  className={`flex items-start p-3 rounded-xl cursor-pointer transition-all duration-200 ${selectedPickupOption === option.Value
                    ? "bg-[#f3f7fa] border-2 border-gray-200"
                    : "hover:bg-gray-50 border border-gray-100"
                    }`}
                  onClick={() => handlePickupOptionChange(option.Value)}
                >
                  <RadioGroupItem value={option.Value} id={option.ID} className="mt-1" />
                  <div className="ml-3 flex  justify-between w-full items-center">
                    <div className="justify-between">
                      <Label
                        htmlFor={option.ID}
                        className="font-medium text-gray-800 cursor-pointer flex items-center"
                      >
                        {option.Icon && <span className="mr-1.5 text-gray-500">{option.Icon}</span>}
                        {option.Name}
                      </Label>
                      {option.Description && <p className="text-xs text-gray-500 mt-1">{option.Description}</p>}
                    </div>
                    <span className="font-medium text-gray-800">
                      {option.Name === "Instant Delivery" ? "Indrive Cost" : option.Price === 0 ? "Free" : `Rs. ${option.Price}`}
                    </span>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Price Details */}
        <Card className="rounded-2xl border-gray-100 shadow-sm overflow-hidden">
          <CardHeader className="bg-[#f9fafc] pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <CreditCardIcon className="mr-2 h-5 w-5 text-gray-600" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Subtotal ({CartItems.length} items)</span>
                <span className="font-medium">Rs. {Subtotal.toLocaleString()}</span>
              </div>

              {Discount ? (
                <div className="flex justify-between py-1">
                  <span className="flex items-center gap-1 text-green-600">
                    <TagIcon className="h-4 w-4" />
                    Discount
                  </span>
                  <span className="text-green-600 font-medium">- Rs. {Discount.toLocaleString()}</span>
                </div>
              ) : null}

              <div className="flex justify-between py-1">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="font-medium">
                  {PickupCost === 0 ? "Free" : `Rs. ${PickupCost.toLocaleString()}`}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between w-full text-lg font-bold text-gray-800 py-1">
              <span>Total</span>
              <span>Rs. {Total.toLocaleString()}</span>
            </div>

            <Button
              className="w-full bg-gray-900 hover:bg-black text-white font-medium py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => HandelCheckout()}
              disabled={!selectedPickupOption}
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {!selectedPickupOption && (
              <p className="text-amber-600 text-xs text-center">Please select a Pickup option to continue</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OrderSummary
