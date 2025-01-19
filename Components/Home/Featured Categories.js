import Image from 'next/image'
import Link from 'next/link'


const categories = [
  {
    name: 'Fashion',
    icon: 'https://api.spicezgold.com/download/file_1734525204708_fash.png',
    href: '/category/fashion',
    bgColor: 'bg-[#e8f5e9]'
  },
  {
    name: 'Electronics',
    icon: 'https://api.spicezgold.com/download/file_1734525218436_ele.png',
    href: '/category/electronics',
    bgColor: 'bg-[#fce4ec]'
  },
  {
    name: 'Bags',
    icon: 'https://api.spicezgold.com/download/file_1734525231018_bag.png',
    href: '/category/bags',
    bgColor: 'bg-[#f3e5f5]'
  },
  {
    name: 'Footwear',
    icon: 'https://api.spicezgold.com/download/file_1734525239704_foot.png',
    href: '/category/footwear',
    bgColor: 'bg-[#e3f2fd]'
  },
  {
    name: 'Groceries',
    icon: 'https://api.spicezgold.com/download/file_1734525248057_gro.png',
    href: '/category/groceries',
    bgColor: 'bg-[#fce4ec]'
  },
  {
    name: 'Beauty',
    icon: 'https://api.spicezgold.com/download/file_1734525255799_beauty.png',
    href: '/category/beauty',
    bgColor: 'bg-[#e0f2f1]'
  },
  {
    name: 'Wellness',
    icon: 'https://api.spicezgold.com/download/file_1734525275367_well.png',
    href: '/category/wellness',
    bgColor: 'bg-[#fce4ec]'
  },
  {
    name: 'Jewellery',
    icon: 'https://api.spicezgold.com/download/file_1734525286186_jw.png',
    href: '/category/jewellery',
    bgColor: 'bg-[#fff3e0]'
  }
]

export default function FeaturedCategories() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">FEATURED CATEGORIES</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center group"
          >
            <div className={`w-24 h-24 rounded-full ${category.bgColor} flex items-center justify-center mb-3 transition-transform group-hover:scale-105`}>
              <div className="w-12 h-12 relative">
                <Image
                  src={category.icon || "/placeholder.svg"}
                  alt={`${category.name} category icon`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

