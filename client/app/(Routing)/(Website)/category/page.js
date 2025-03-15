import MainCategory from "@/Components/Website/Category/MainCategory";
import { Shirt, Smartphone, ShoppingBag, Footprints, ShoppingCart, Sparkles, Heart, Gem } from "lucide-react"

const category = [
  {
    name: "Fashion",
    icon: <Shirt className="h-6 w-6" />,
    href: "/category/fashion",
    color: "text-green-500",
  },
  {
    name: "Electronics",
    icon: <Smartphone className="h-6 w-6" />,
    href: "/category/electronics",
    color: "text-blue-500",
  },
  {
    name: "Bags",
    icon: <ShoppingBag className="h-6 w-6" />,
    href: "/category/bags",
    color: "text-amber-500",
  },
  {
    name: "Footwear",
    icon: <Footprints className="h-6 w-6" />,
    href: "/category/footwear",
    color: "text-gray-500",
  },
  {
    name: "Groceries",
    icon: <ShoppingCart className="h-6 w-6" />,
    href: "/category/groceries",
    color: "text-gray-500",
  },
  {
    name: "Beauty",
    icon: <Sparkles className="h-6 w-6" />,
    href: "/category/beauty",
    color: "text-pink-500",
  },
  {
    name: "Wellness",
    icon: <Heart className="h-6 w-6" />,
    href: "/category/wellness",
    color: "text-orange-500",
  },
  {
    name: "Jewellery",
    icon: <Gem className="h-6 w-6" />,
    href: "/category/jewellery",
    color: "text-yellow-500",
  },
];

export default function categoryPage() {
  return (
    <MainCategory category={category} />
  )
}
