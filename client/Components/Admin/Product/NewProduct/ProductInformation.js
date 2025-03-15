"use client"

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import Tiptap from "../Tiptap";
import { useProduct } from "@/Components/Admin/Product/Context/ProductContext";

const ProductInformation = () => {
    const { product, handleInputChange, handleSelectInputChange, errors, handleErrorClear, categories } = useProduct();
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="SKU">SKU</Label>
                        <Input id="SKU" name="SKU" value={product.SKU} onChange={(e) => {
                            handleInputChange(e);
                            handleErrorClear("SKU");
                        }}
                            className={errors.SKU ? 'border-red-500 !ring-0' : ''} />
                        {errors.SKU && <p className="text-red-500 text-sm">{errors.SKU}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="Name">Product Name</Label>
                        <Input id="Name" name="Name" value={product.Name} onChange={(e) => {
                            handleInputChange(e);
                            handleErrorClear("Name");
                        }}
                            className={errors.Name ? 'border-red-500 !ring-0' : ''} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Description">Description</Label>
                    <Tiptap />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="Category">Category</Label>
                        <Select
                            value={product.Category || ""}
                            onValueChange={(value) => {
                                handleSelectInputChange("Category", value);
                                handleErrorClear("Category");
                            }}
                        >
                            <SelectTrigger id="Category" className={errors.Category ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            {errors.Category && <p className="text-red-500 text-sm">{errors.Category}</p>}
                            <SelectContent>
                                {categories.length > 0 ?
                                    categories.map((category, index) => {
                                        return (
                                            <SelectItem key={category._id} value={category._id}>{category.CategoryAttribute}</SelectItem>
                                        )
                                    })
                                    : 
                                    <div className="ml-4 mt-1">N/A</div>
                                    }
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
