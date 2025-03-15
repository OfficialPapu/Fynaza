"use client"
import ValidateToken from "@/Components/Admin/HOC/ValidateToken";
function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

export default ValidateToken(RootLayout);