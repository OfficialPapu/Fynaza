"use client"

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useProduct } from "@/Components/(Admin)/Product/NewProduct/ProductContext";

const ProductInformation = () => {
    const { product, handleInputChange, handleSelectInputChange } = useProduct();

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="SKU">SKU</Label>
                        <Input id="SKU" name="SKU" value={product.SKU} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="Name">Product Name</Label>
                        <Input id="Name" name="Name" value={product.Name} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Description">Description</Label>
                    <textarea name="" id="" className="h-[200px] w-full border outline-none rounded-md"></textarea>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="Category">Category</Label>
                        <Select
                            value={product.Category || ""}
                            onValueChange={(value) => handleSelectInputChange("Category", value)}
                        >
                            <SelectTrigger id="Category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="electronics">Electronics</SelectItem>
                                <SelectItem value="clothing">Clothing</SelectItem>
                                <SelectItem value="food">Food & Beverage</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="Brand">Brand</Label>
                        <Input id="Brand" name="Brand" value={product.Brand} onChange={handleInputChange} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductInformation;
