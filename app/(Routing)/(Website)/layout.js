import Header from "@/Components/(Website)/Layout/Header";
import Footer from "@/Components/(Website)/Layout/Footer";

export const metadata = {
    title: "Online Shopping in Nepal: Best Deals, Prices & Discounts - Fynaza",
    description: "Looking for Online Shopping Nepal? Fynaza Online Shopping Site is One of the Largest Online Shopping Store in Kathmandu, Biratnagar Across the Country - Shop Now!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="max-w-[1800px] mx-auto bg-[#f3f7fa]">
                <Header />
                <div className="lg:px-12 md:px-6 px-2">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
