import Link from "next/link"
import { Card, CardContent } from "@/Components/ui/card"
import { UserRoundPen, Package, Heart, MapPin, Settings, ShoppingCart } from "lucide-react"
import { AccountHeader } from "@/Components/Website/Account/Layout/AccountHeader"

const accountSections = [
    { title: "Profile", icon: UserRoundPen, href: "/account/profile", description: "Manage your personal information" },
    { title: "Orders", icon: Package, href: "/account/orders", description: "View your order history" },
    { title: "Cart", icon: ShoppingCart, href: "/account/cart", description: "View and manage your shopping cart" },
    { title: "Wishlist", icon: Heart, href: "/account/wishlist", description: "See items you've saved" },
    { title: "Addresses", icon: MapPin, href: "/account/addresses", description: "Manage your shipping addresses" },
    { title: "Settings", icon: Settings, href: "/account/settings", description: "Adjust your account settings" },
]

export default function AccountPage() {
    return (
        <>
            <div className="mt-4 mb-2"><AccountHeader /></div>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mb-3">
                {accountSections.map((section) => (
                    <Link href={section.href} key={section.title}>
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <section.icon className="w-8 h-8 text-black mb-4" />
                                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                                <p className="text-gray-600">{section.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    )
}

