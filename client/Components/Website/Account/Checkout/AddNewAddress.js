"use client"

import { Check, Home, MapPin, Plus } from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import useCheckoutActions from "@/hooks/Checkout"

const AddNewAddress = () => {
  const {
    handleAddressSubmit,
    handleAddressChange,
    dialogOpen,
    AddressID,
    setDialogOpen,
    NewAddress,
    Addresses,
    dispatch, UpdateAddress
  } = useCheckoutActions()

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Delivery Address</h2>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2 rounded-full">
              <Plus className="h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] rounded-xl sm:max-w-[500px]">
            <DialogHeader>
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">Add New Address</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Enter your shipping details below
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="grid gap-5 py-4">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="Name"
                    className="rounded-lg"
                    placeholder="Enter your full name"
                    value={NewAddress.Name}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="number"
                    name="Phone"
                    className="rounded-lg"
                    placeholder="Enter your phone number"
                    value={NewAddress.Phone}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="font-medium">
                  Street Address
                </Label>
                <Textarea
                  id="address"
                  name="Address"
                  className="min-h-[80px] rounded-lg"
                  placeholder="Enter your street address"
                  value={NewAddress.Address}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-medium">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="City"
                    className="rounded-lg"
                    placeholder="Enter your city"
                    value={NewAddress.City}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code" className="font-medium">
                    Postal Code
                  </Label>
                  <Input
                    id="postal-code"
                    name="PostalCode"
                    className="rounded-lg"
                    placeholder="Enter postal code"
                    value={NewAddress.PostalCode}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="w-full rounded-lg sm:w-auto" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="w-full rounded-lg sm:w-auto" onClick={handleAddressSubmit}>
                Save Address
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {Addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 p-10 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">No address saved yet</h3>
          <p className="mb-6 max-w-md text-muted-foreground">
            Add a delivery address to continue with your checkout process
          </p>
          <Button onClick={() => setDialogOpen(true)} className="gap-2 rounded-full">
            <Plus className="h-4 w-4" />
            Add New Address
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {Addresses.map((Address) => (
            <div
              key={Address.ID}
              onClick={() => dispatch(UpdateAddress({ Address: Address }))}
              className={`group relative cursor-pointer rounded-xl border p-5 transition-all duration-200 ${AddressID === Address.ID
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
                }`}
            >
              {AddressID === Address.ID && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors ${AddressID === Address.ID
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                    }`}
                >
                  <Home className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">{Address.Name}</p>
                  <p className="text-sm text-muted-foreground">{Address.Address}</p>
                  <p className="text-sm text-muted-foreground">{Address.Phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddNewAddress

