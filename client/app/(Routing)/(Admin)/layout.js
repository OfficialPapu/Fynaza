"use client";
import { Sidebar } from "@/Components/Admin/Layout/Sidebar";
import { Provider } from "react-redux";
import { Store, Persistor } from "@/Components/Admin/Redux/Store"
import { PersistGate } from 'redux-persist/integration/react'
import { usePathname } from "next/navigation";
export default function RootLayout({ children }) {
  const pathname = usePathname();
  const excludedPaths = ["/admin/login", "/admin"];
  const isExcluded = excludedPaths.includes(pathname);
  return (
    <html lang="en">
      <body>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={Persistor}>
            {(!isExcluded) ? <Sidebar>{children}</Sidebar> : children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
