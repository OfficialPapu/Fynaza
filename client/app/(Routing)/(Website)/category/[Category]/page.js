import CategoryItemPage from "@/Components/Website/Category/CategoryItem"

const subcategories = [
  { name: "Bracelets", image: "https://justopjewelry.com/wp-content/uploads/2025/01/9112097-9112098-9112099-9112102_05.jpg" },
  { name: "Necklaces", image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg" },
  { name: "Rings", image: "https://justopjewelry.com/wp-content/uploads/2025/01/SH0010030%E7%99%BD%E5%BA%95%E5%9B%BE-1340X1785-e1736758839743.jpg" },
  { name: "Earrings", image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg" },
  { name: "Anklets", image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg" },
  { name: "Watches", image: "https://justopjewelry.com/wp-content/uploads/2024/11/9112581-9112582-9112583-9112584-9112585_01.jpg" },
]

export default function Category() {
  return (
    <CategoryItemPage subcategories={subcategories} />
  )
}

