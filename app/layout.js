import Header from "@/Components/Layout/Header";
import "./globals.css";
import Footer from "@/Components/Layout/Footer";

export const metadata = {
  title: "Online Shopping in Nepal: Best Deals, Prices & Discounts - Fynaza",
  description: "Looking for Online Shopping Nepal? Fynaza Online Shopping Site is One of the Largest Online Shopping Store in Kathmandu, Biratnagar Across the Country - Shop Now!",
};

export default function RootLayout({ children } ) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
