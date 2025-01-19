import { ProductCard } from "@/Components/ui/Product"

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
      <section className="p-4">
        <h2 className="md:text-2xl text-xl font-bold md:mb-6 mb-4 text-gray-700"> Just For You</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <ProductCard {...product} />
          <ProductCard {...product} />
          <ProductCard {...product} />
          <ProductCard {...product} />
        </div>
      </section>
    </>
  )
}

