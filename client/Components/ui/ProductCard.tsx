import React, { useState } from "react";
import { Badge } from "@/Components/ui/badge";
import { ShoppingCart, Heart, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useCartActions from "@/hooks/Cart";
export function ProductCard({ ID, Title, ImageUrl, Price, Discount, SlugUrl }) {
  const Product = {
    ID,
    Title,
    ImageUrl,
    Price,
    Discount,
    SlugUrl,
    Quantity: 1,
  };
  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}&auto=format&fit=scale&fm=webp`;
  };
  const { HandleAddToCart, IsProductInCart } = useCartActions();

  let PriceAfterDiscount =
    Price - (Price / 100) * Discount < Price
      ? Price - (Price / 100) * Discount
      : null;

  let badge = null;
  if (PriceAfterDiscount) {
    badge = (
      <Badge
        variant="destructive"
        className="absolute left-2 top-2 px-1.5 py-0.5 text-xs font-semibold"
      >
        {Discount}% OFF
      </Badge>
    );
  }

  if (PriceAfterDiscount) {
    Price = (
      <div className="flex flex-col">
        <span className="text-sm font-bold text-primary">
          Rs. {PriceAfterDiscount?.toFixed(2)}
        </span>
        <span className="text-xs text-gray-500 line-through">
          Rs. {Price?.toFixed(2)}
        </span>
      </div>
    );
  } else {
    Price = (
      <div className="flex flex-col">
        <span className="text-sm font-bold text-primary">
          Rs. {Price?.toFixed(2)}
        </span>
      </div>
    );
  }

  const isInCart = IsProductInCart(ID);

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div>
        <Link href={"/product/" + SlugUrl}>
          <div className="relative aspect-square">
            <Image
              src={ImageUrl || "/placeholder.svg"}
              alt={Title}
              loading="lazy"
              width={500}
              height={500}
              layout="intrinsic"
              loader={imageLoader}
              className="transition-transform duration-300 group-hover:scale-105 object-contain min-h-[200px]"
            />
            {badge}
          </div>
        </Link>
        <button
          className="absolute right-2 top-2 h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full transition-all duration-300 flex items-center justify-center"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="p-3">
        <Link href={"/product/" + SlugUrl}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300 w-full py-1 h-[58px]">
            {Title.substring(0, 40) + "..."}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          {Price}
          <button
            className="flex items-center justify-center rounded-full border p-2 transition-all duration-300 hover:bg-primary/10"
            onClick={async () => {
              await HandleAddToCart(Product);
            }}
          >
            {isInCart ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <ShoppingCart className="h-4 w-4 text-black" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
