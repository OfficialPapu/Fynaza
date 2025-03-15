"use client"

import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Separator } from "@/Components/ui/separator"
import { useProduct } from "@/Components/Admin/Product/Context/ProductContext";

const PricingAndInventory = () => {
    const { product, handleInputChange, handleNestedInputChange, errors, handleErrorClear } = useProduct();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="Price">Price</Label>
                    <Input
                        id="Price"
                        name="Price"
                        type="number"
                        value={product.Price}
                        onChange={(e) => {
                            handleInputChange(e);
                            handleErrorClear("Price");
                        }}
                        required
                        min="0"
                        step="0.01"
                        className={errors.Price ? 'border-red-500 !ring-0' : ''}
                    />
                    {errors.Price && <p className="text-red-500 text-sm">{errors.Price}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="DiscountPercentage">Discount Percentage</Label>
                    <Input
                        id="DiscountPercentage"
                        name="DiscountPercentage"
                        type="number"
                        value={product.Discount.Percentage}
                        onChange={(e) => handleNestedInputChange("Discount", "Percentage", e.target.value)}
                        min="0"
                        max="100"
                        step="1"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="DiscountValidUntil">Discount Valid Until</Label>
                    <Input
                        id="DiscountValidUntil"
                        name="DiscountValidUntil"
                        type="date"
                        value={product.Discount.ValidUntil}
                        onChange={(e) => handleNestedInputChange("Discount", "ValidUntil", e.target.value)}
                    />
                </div>
                <Separator />
                <div className="space-y-2">
                    <Label htmlFor="StockQuantity">Stock Quantity</Label>
                    <Input
                        id="StockQuantity"
                        name="StockQuantity"
                        type="number"
                        value={product.Stock.Quantity}
                        onChange={(e) => {
                            handleNestedInputChange("Stock", "Quantity", e.target.value);
                            handleErrorClear("StockQuantity");
                        }}
                        min="0"
                        className={errors.StockQuantity ? 'border-red-500 !ring-0' : ''}
                    />
                    {errors.StockQuantity && <p className="text-red-500 text-sm">{errors.StockQuantity}</p>}
                </div>
            </CardContent>
        </Card>
    )
}

export default PricingAndInventory
