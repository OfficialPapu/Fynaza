"use client";
import { ArrowLeft, Package, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import ProductInformation from "./ProductInformation";
import PricingAndInventory from "./PricingAndInventory"
import ProductMedia from "./ProductMedia"
import AdditionalDetails from "./AdditionalDetails"
import { ProductProvider, useProduct } from "@/Components/(Admin)/Product/Context/ProductContext";
import { TipTapProvider, useTipTap } from "@/Components/(Admin)/Product/Context/TipTapContext";

export default function NewProduct() {
  return (
    <TipTapProvider>
      <ProductProvider>
        <NewProductForm />
      </ProductProvider>
    </TipTapProvider>
  );
}

function NewProductForm() {
  const { handleSubmit } = useProduct();

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
        <div className="container mx-auto py-6 space-y-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <ProductInformation />
            <PricingAndInventory />
          </div>

          <ProductMedia />
          <AdditionalDetails />

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" />
              Create Product
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
