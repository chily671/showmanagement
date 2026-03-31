import Layout from "@/components/layout/Layout";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <Layout>{children}</Layout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
