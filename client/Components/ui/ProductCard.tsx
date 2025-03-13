import React from "react";
import { Badge } from "@/Components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({
  id,
  title,
  image,
  price,
  originalPrice,
  slugUrl,
}) {
  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}&auto=format&fit=scale&fm=webp`;
  };

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  let badge = null;
  if (price !== originalPrice) {
    badge = (
      <Badge
        variant="destructive"
        className="absolute left-2 top-2 px-1.5 py-0.5 text-xs font-semibold"
      >
        {discount}% OFF
      </Badge>
    );
  }

  let Price = null;

  if (price != originalPrice) {
    Price = (
      <div className="flex flex-col">
        <span className="text-sm font-bold text-primary">
          Rs. {price.toFixed(2)}
        </span>
        <span className="text-xs text-gray-500 line-through">
          Rs. {originalPrice.toFixed(2)}
        </span>
      </div>
    );
  } else {
    Price = (
      <div className="flex flex-col">
        <span className="text-sm font-bold text-primary">
          Rs. {price.toFixed(2)}
        </span>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <Link href={"/product/" + slugUrl}>
        <div className="relative aspect-square">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            loading="lazy"
            width={500}
            height={500}
            layout="intrinsic"
            loader={imageLoader}
            className="transition-transform duration-300 group-hover:scale-105 object-contain min-h-[200px]"
          />
          {badge}
          <button
            className="absolute right-2 top-2 h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full transition-all duration-300 flex items-center justify-center"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </Link>
      <div className="p-3">
        <Link href={"/product/" + slugUrl}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300 w-full py-1 h-[58px]">
            {title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          {Price}
          <button className="flex items-center justify-center rounded-full border p-2 transition-all duration-300 hover:bg-primary/10">
            <ShoppingCart className="h-4 w-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
