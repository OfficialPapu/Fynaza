import { ProductCard } from "./Product Card"

const product = {
  title: "Minimalist Imitation Gold Plated Copper Ankle Bracelet",
  image: "https://justopjewelry.com/wp-content/uploads/2024/12/SH0050001_10.jpg",
  price: 249.99,
  originalPrice: 399.99,
  rating: 4.7,
  reviews: 1283
}

export function SingleProductDisplay() {
  return (
    <>
      <div className="gap-4 justify-center flex w-full flex-wrap">
        <ProductCard {...product} />
        <ProductCard {...product} />
        <ProductCard {...product} />
        <ProductCard {...product} />
      </div>
    </>
  )
}

