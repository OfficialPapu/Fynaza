"use client"
import ValidateToken from "@/Components/Hoc/ValidateToken";
function RootLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

export default ValidateToken(RootLayout, "Admin");