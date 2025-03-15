"use client"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion"
import { Badge } from "@/Components/ui/badge"
import { useProduct } from "@/Components/Admin/Product/Context/ProductContext";
import { Plus, X } from "lucide-react"

const AdditionalDetails = () => {
    const { product, handleNestedInputChange, updateCustomAttribute, addCustomAttribute, removeCustomAttribute } = useProduct();
    return (

        <Card>
            <CardHeader>
                <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="specifications">
                        <AccordionTrigger>Specifications</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 sm:p-1">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="Color">Color</Label>
                                        <Input
                                            id="Color"
                                            name="Color"
                                            value={product.Specifications.Color}
                                            onChange={(e) => handleNestedInputChange("Specifications", "Color", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="Size">Size</Label>
                                        <Input
                                            id="Size"
                                            name="Size"
                                            value={product.Specifications.Size}
                                            onChange={(e) => handleNestedInputChange("Specifications", "Size", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="Weight">Weight</Label>
                                    <Input
                                        id="Weight"
                                        name="Weight"
                                        value={product.Specifications.Weight}
                                        onChange={(e) => handleNestedInputChange("Specifications", "Weight", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="space-y-2">
                                        <Label>Custom Attributes</Label>
                                        {product.Specifications.CustomAttributes.map((attr, index) => (
                                            <div key={index} className="flex gap-2">
                                                <Input
                                                    placeholder="Key"
                                                    value={attr.Key}
                                                    onChange={(e) => updateCustomAttribute(index, "Key", e.target.value)}
                                                />
                                                <Input
                                                    placeholder="Value"
                                                    value={attr.Value}
                                                    onChange={(e) => updateCustomAttribute(index, "Value", e.target.value)}
                                                />
                                                <Button type="button" variant="destructive" size="icon" className="w-20 h-9" onClick={() => removeCustomAttribute(index)}>
                                                    <X />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Button type="button" variant="outline" onClick={addCustomAttribute}>
                                        <Plus className="h-4 w-4" /> Add Attribute
                                    </Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="shipping">
                        <AccordionTrigger>Shipping</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 sm:p-1">
                                <div className="space-y-2">
                                    <Label htmlFor="ShippingWeight">Shipping Weight</Label>
                                    <Input
                                        id="ShippingWeight"
                                        name="ShippingWeight"
                                        type="number"
                                        value={product.ShippingDetails.Weight}
                                        onChange={(e) => handleNestedInputChange("ShippingDetails", "Weight", e.target.value)}
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="ShippingLength">Length</Label>
                                        <Input
                                            id="ShippingLength"
                                            name="ShippingLength"
                                            type="number"
                                            value={product.ShippingDetails.Dimensions.Length}
                                            onChange={(e) =>
                                                handleNestedInputChange("ShippingDetails", "Dimensions", {
                                                    ...product.ShippingDetails.Dimensions,
                                                    Length: e.target.value,
                                                })
                                            }
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ShippingWidth">Width</Label>
                                        <Input
                                            id="ShippingWidth"
                                            name="ShippingWidth"
                                            type="number"
                                            value={product.ShippingDetails.Dimensions.Width}
                                            onChange={(e) =>
                                                handleNestedInputChange("ShippingDetails", "Dimensions", {
                                                    ...product.ShippingDetails.Dimensions,
                                                    Width: e.target.value,
                                                })
                                            }
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ShippingHeight">Height</Label>
                                        <Input
                                            id="ShippingHeight"
                                            name="ShippingHeight"
                                            type="number"
                                            value={product.ShippingDetails.Dimensions.Height}
                                            onChange={(e) =>
                                                handleNestedInputChange("ShippingDetails", "Dimensions", {
                                                    ...product.ShippingDetails.Dimensions,
                                                    Height: e.target.value,
                                                })
                                            }
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}

export default AdditionalDetails
