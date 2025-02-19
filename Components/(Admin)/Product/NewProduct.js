"use client"

import { useState } from "react"
import { ArrowLeft, Package, Upload, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"

const Tiptap = ({ description, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return <EditorContent editor={editor} className="min-h-[200px] border rounded-md p-2" />
}

export default function NewProduct() {
  const [product, setProduct] = useState({
    SKU: "",
    Name: "",
    Slug: "",
    Description: "",
    Category: "",
    Brand: "Generic",
    Price: 0,
    Discount: {
      Percentage: 0,
      ValidUntil: "",
    },
    Stock: {
      Quantity: 0,
      Threshold: 10,
    },
    Media: {
      Images: [],
      Videos: [],
    },
    Specifications: {
      Color: "",
      Size: "",
      Weight: "",
      CustomAttributes: [],
    },
    Tags: [],
    ShippingDetails: {
      Weight: 0,
      Dimensions: {
        Length: 0,
        Width: 0,
        Height: 0,
      },
    },
    Status: "Active",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleNestedInputChange = (category, field, value) => {
    setProduct((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }))
  }

  const handleArrayInputChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          Media: {
            ...prev.Media,
            Images: [...prev.Media.Images, { Url: reader.result, Alt: file.name }],
          },
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      Media: {
        ...prev.Media,
        Images: prev.Media.Images.filter((_, i) => i !== index),
      },
    }))
  }

  const addCustomAttribute = () => {
    setProduct((prev) => ({
      ...prev,
      Specifications: {
        ...prev.Specifications,
        CustomAttributes: [...prev.Specifications.CustomAttributes, { Key: "", Value: "" }],
      },
    }))
  }

  const updateCustomAttribute = (index, key, value) => {
    setProduct((prev) => ({
      ...prev,
      Specifications: {
        ...prev.Specifications,
        CustomAttributes: prev.Specifications.CustomAttributes.map((attr, i) =>
          i === index ? { ...attr, [key]: value } : attr,
        ),
      },
    }))
  }

  const removeCustomAttribute = (index) => {
    setProduct((prev) => ({
      ...prev,
      Specifications: {
        ...prev.Specifications,
        CustomAttributes: prev.Specifications.CustomAttributes.filter((_, i) => i !== index),
      },
    }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6 justify-between ">
          <Link href="/admin/products" className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <h1 className="text-lg font-semibold sm:text-xl">New Product</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="SKU">SKU</Label>
                  <Input id="SKU" name="SKU" value={product.SKU} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Name">Product Name</Label>
                  <Input id="Name" name="Name" value={product.Name} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="Slug">Slug</Label>
                <Input id="Slug" name="Slug" value={product.Slug} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="Description">Description</Label>
                <Tiptap
                  description={product.Description}
                  onChange={(value) => handleNestedInputChange("Description", value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="Category">Category</Label>
                  <Select
                    value={product.Category}
                    onValueChange={(value) => handleNestedInputChange("Category", value)}
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="Price">Price</Label>
                  <Input
                    id="Price"
                    name="Price"
                    type="number"
                    value={product.Price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                  />
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
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
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
                <div className="space-y-2">
                  <Label htmlFor="StockQuantity">Stock Quantity</Label>
                  <Input
                    id="StockQuantity"
                    name="StockQuantity"
                    type="number"
                    value={product.Stock.Quantity}
                    onChange={(e) => handleNestedInputChange("Stock", "Quantity", e.target.value)}
                    required
                    min="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="StockThreshold">Stock Threshold</Label>
                <Input
                  id="StockThreshold"
                  name="StockThreshold"
                  type="number"
                  value={product.Stock.Threshold}
                  onChange={(e) => handleNestedInputChange("Stock", "Threshold", e.target.value)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {product.Media.Images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={image.Url || "/placeholder.svg"}
                        alt={image.Alt}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed">
                    <label htmlFor="image-upload" className="cursor-pointer text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <span className="mt-2 block text-sm text-gray-600">Upload Image</span>
                      <Input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <Tabs defaultValue="specifications" className="w-full">
                <TabsList>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="other">Other Details</TabsTrigger>
                </TabsList>
                <TabsContent value="specifications" className="space-y-4">
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
                        <Button variant="destructive" size="icon" onClick={() => removeCustomAttribute(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addCustomAttribute}>
                      <Plus className="mr-2 h-4 w-4" /> Add Attribute
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="space-y-4">
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
                </TabsContent>
                <TabsContent value="other" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="Tags">Tags (comma-separated)</Label>
                    <Input
                      id="Tags"
                      name="Tags"
                      value={product.Tags.join(", ")}
                      onChange={(e) => handleArrayInputChange("Tags", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Status">Status</Label>
                    <Select value={product.Status} onValueChange={(value) => handleNestedInputChange("Status", value)}>
                      <SelectTrigger id="Status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Discontinued">Discontinued</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Create Product</Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  )
}

