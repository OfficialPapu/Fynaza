"use client";
import { ArrowLeft, Package, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import ProductInformation from "./ProductInformation";
import PricingAndInventory from "./PricingAndInventory"
import ProductMedia from "./ProductMedia"
import AdditionalDetails from "./AdditionalDetails"
import axios from "axios";
import { ProductProvider, useProduct } from "@/Components/(Admin)/Product/Context/ProductContext";
import { TipTapProvider, useTipTap } from "@/Components/(Admin)/Product/Context/TipTapContext";

export default function NewProduct() {
  return (
    <ProductProvider>
      <TipTapProvider>
        <NewProductForm />
      </TipTapProvider>
    </ProductProvider>
  );
}

function NewProductForm() {
  const { product } = useProduct();
  const { editor } = useTipTap();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const convertObjectToFormData = (obj, formData = new FormData(), parentKey = '') => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;

        if (typeof value === 'object' && !Array.isArray(value)) {
          convertObjectToFormData(value, formData, formKey);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item instanceof File) {
            } else {
              formData.append(`${formKey}[${index}]`, item);
            }
          });
        } else {
          if (!(value instanceof File)) {
            formData.append(formKey, value);
          }
        }
      }
    }
  };

  const convertBase64ToFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    let uploadedImages = [];
    let tiptapContent = editor.getJSON();

    tiptapContent.content.forEach((node, index) => {
      if (node.type === "image" && node.attrs.src.startsWith("data:image")) {
        const file = convertBase64ToFile(node.attrs.src, `wysiwyg-image-${index}.png`);
        formData.append("WysiwygImages", file);
        uploadedImages.push({ index, placeholder: node.attrs.src });
      }
    });

    if (uploadedImages.length > 0) {
      try {
        const response = await axios.post(`${BASE_URL}/api/product/tiptap/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.success) {
          console.log(response.data);
          uploadedImages.forEach((img, idx) => {
            tiptapContent.content.forEach((node) => {
              if (node.type === "image" && node.attrs.src === img.placeholder) {
                node.attrs.src = response.data.urls[idx];
              }
            });
          });
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }
    convertObjectToFormData(product, formData);
    formData.append("Description", editor.getHTML());

    product.Media.Images.forEach((image) => {
      formData.append("Images", image);
    });

    product.Media.Videos.forEach((video) => {
      formData.append("Videos", video);
    });

    try {
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
