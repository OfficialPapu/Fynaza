import { Sidebar } from "@/Components/(Admin)/Layout/Sidebar";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for online shopping platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar>
        {children}
        </Sidebar>
      </body>
    </html>
  );
}
