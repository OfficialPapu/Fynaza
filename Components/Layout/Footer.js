import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 FooterMain">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Fynaza</h2>
            <p className="text-sm text-gray-600">
              Your premier destination for online shopping. Discover amazing deals and shop with confidence.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Link 
                  key={index} 
                  href="#" 
                  className="text-gray-400 hover:text-[#3F8CFF] transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">Social Media</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "Today's Deals",
                "Best Sellers",
                "New Arrivals",
                "Gift Cards",
                "Clearance",
                "Customer Service"
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-[#3F8CFF] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Your Account</h3>
            <ul className="space-y-2">
              {[
                "Your Orders",
                "Track Package",
                "Returns & Refunds",
                "Shipping Rates",
                "Wishlist",
                "Your Profile"
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-[#3F8CFF] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-2">
              {[
                "Help Center",
                "Payment Methods",
                "Delivery Options",
                "Return Policy",
                "Privacy Policy",
                "Terms of Service"
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-[#3F8CFF] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 text-center w-full">
              © {new Date().getFullYear()} Fynaza. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

