import "./globals.css";
import { ToastProvider } from "@/Components/ui/toastprovider";
export const metadata = {
  title: "Online Shopping in Nepal: Best Deals, Prices & Discounts - Fynaza",
  description: "Looking for Online Shopping Nepal? Fynaza Online Shopping Site is One of the Largest Online Shopping Store in Kathmandu, Biratnagar Across the Country - Shop Now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
