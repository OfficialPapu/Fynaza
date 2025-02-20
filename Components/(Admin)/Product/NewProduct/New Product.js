"use client";
import { ArrowLeft, Package, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import ProductInformation from "./ProductInformation";
import PricingAndInventory from "./PricingAndInventory"
import ProductMedia from "./ProductMedia"
import AdditionalDetails from "./AdditionalDetails"
import axios from "axios";
import { ProductProvider, useProduct } from "@/Components/(Admin)/Product/NewProduct/ProductContext";

export default function NewProduct() {
  return (
    <ProductProvider>
      <NewProductForm />
    </ProductProvider>
  );
}

function NewProductForm() {
  const { product } = useProduct();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  
  const convertObjectToFormData = (obj, formData = new FormData(), parentKey = '') => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const formKey = parentKey ? `${parentKey}[${key}]` : key;

            if (typeof value === 'object' && !Array.isArray(value)) {
                // Recursively call for objects
                convertObjectToFormData(value, formData, formKey);
            } else if (Array.isArray(value)) {
                // For arrays, append each element
                value.forEach((item, index) => {
                    if (item instanceof File) {
                        // Skip files (we'll handle them separately)
                    } else {
                        formData.append(`${formKey}[${index}]`, item);
                    }
                });
            } else {
                // For non-file values, append directly to FormData
                if (!(value instanceof File)) {
                    formData.append(formKey, value);
                }
            }
        }
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    convertObjectToFormData(product, formData);


    product.Media.Images.forEach((image) => {
      formData.append("Images", image); // Appending image files
    });
    
    // Append videos
    // product.Media.Videos.forEach((video) => {
    //   formData.append("Videos", video); // Appending video files
    // });    

    try {
      console.log([...formData.entries()]);
      
      const response = await axios.post(`${BASE_URL}/api/product/add`, formData);
      console.log("Product created successfully:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/admin/products" className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <Package className="h-6 w-6" />
            <h1 className="text-lg font-semibold">New Product</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-3">
              <ProductInformation />
              <PricingAndInventory />
            </div>

            <ProductMedia />
            <AdditionalDetails />

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Create Product
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
