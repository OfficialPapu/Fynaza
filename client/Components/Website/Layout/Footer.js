import Link from "next/link"
import 'boxicons/css/boxicons.min.css'
export default function Footer() {
  const socialIcons = [
    { icon: () => <i className="bx bxl-facebook text-xl"></i>, link: "https://www.facebook.com/fynaza.global" },
    { icon: () => <i className="bx bxl-tiktok text-xl"></i>, link: "https://www.tiktok.com/@fynaza.global" },
    { icon: () => <i className='bx bxl-instagram text-xl' ></i>, link: "https://www.instagram.com/fynaza.global" },
  ];

  const AccountLinks = [
    { title: "Your Orders", link: "/account/orders" },
    { title: "Returns & Refunds", link: "/support/returns-and-refunds" },
    { title: "Shipping Rates", link: "#" },
    { title: "Wishlist", link: "/account/wishlist" },
    { title: "Your Profile", link: "/account" }
  ];

  const SupportLinks = [
    { title: "Help Center", link: "/support/help-center" },
    { title: "Payment Methods", link: "#" },
    { title: "Delivery Options", link: "#" },
    { title: "Privacy Policy", link: "/support/privacy-policy" },
    { title: "Terms and Conditions", link: "/support/terms-and-conditions" }
  ];

  const QuickLinks = [
    { title: "Today's Deals", link: "#" },
    { title: "Best Sellers", link: "#" },
    { title: "New Arrivals", link: "#" },
    { title: "Gift Cards", link: "#" },
    { title: "Clearance", link: "#" },
    { title: "Customer Service", link: "#" }
  ];

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
              {socialIcons.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="text-gray-400 hover:text-[#3F8CFF] transition-colors"
                  target="_blank"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">Social Media</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {QuickLinks.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="text-gray-600 hover:text-[#3F8CFF] transition-colors text-sm">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Your Account</h3>
            <ul className="space-y-2">
              {AccountLinks.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="text-gray-600 hover:text-[#3F8CFF] transition-colors text-sm">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-2">
              {SupportLinks.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="text-gray-600 hover:text-[#3F8CFF] transition-colors text-sm">
                    {item.title}
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

