"use client";
import Header from "@/Components/(Website)/Layout/Header";
import Footer from "@/Components/(Website)/Layout/Footer";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Store, Persistor } from "@/Components/(Website)/Redux/Store"
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="max-w-[1800px] mx-auto bg-[#f3f7fa]">
                <Provider store={Store}>
                    <PersistGate loading={null} persistor={Persistor}>
                        <Header />
                        <div className="lg:px-12 md:px-6 px-2">
                            {children}
                        </div>
                    </PersistGate>
                </Provider>
                <Footer />
            </body>
        </html>
    );
}
