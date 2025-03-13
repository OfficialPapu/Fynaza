"use client"

import { useEffect, useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Checkbox } from "@/Components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import Link from "next/link";
import axios from "@/lib/axios";


export default function Categories() {
  const [categories, setCategories] = useState([{
    id: "",
    name: "",
    image: null
  }]);
  const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_BASE_IMAGES_PATH;
  const [selectedCategories, setSelectedCategories] = useState([]);

  async function GetCategories() {
    const response = await axios.get('api/categories');
    const result = response.data;
    setCategories(result.map(category => ({
      id: category._id,
      name: category.CategoryAttribute,
      image: BASE_IMAGES_PATH + category.Image || null
    })));
  }

  useEffect(() => {
    GetCategories();
  }, [])


  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const toggleAllCategories = () => {
    setSelectedCategories((prev) => (prev.length === categories.length ? [] : categories.map((c) => c.id)));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/admin/categories/add">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedCategories.length === categories.length} onCheckedChange={toggleAllCategories} />
              </TableHead>
                <TableHead className="max-w-[300px] text-center">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <Checkbox checked={selectedCategories.includes(category.id)} onCheckedChange={() => toggleCategory(category.id)} />
                </TableCell>
                <TableCell className="grid place-content-center">
                  <Image src={category.image ?? "/placeholder.svg"} alt={category.name} width={40} height={40} className="rounded-full object-cover w-[60px] h-[60px]" />
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
              :
              <div className="mt-4 w-[200px] text-lg">Categories not available</div>
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
