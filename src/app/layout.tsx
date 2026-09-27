import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";

export const metadata: Metadata = {
  title: "OFFGRID — Streetwear Archives & Heavyweight Basics",
  description:
    "1-of-1 thrifted vintage archive alongside custom-milled heavyweight essentials. Flagship store in Hauz Khas Village, New Delhi.",
  keywords: [
    "OFFGRID",
    "streetwear",
    "vintage thrift",
    "1 of 1",
    "Hauz Khas Village",
    "Delhi streetwear",
    "heavyweight hoodie",
    "vintage tees",
  ],
  openGraph: {
    title: "OFFGRID — Wear What Nobody Else Has",
    description:
      "Hand-picked vintage 1-of-1 archive and custom heavyweight basics. Born in New Delhi.",
    url: "https://offgrid.in",
    siteName: "OFFGRID",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OFFGRID — Wear What Nobody Else Has",
    description: "Streetwear archives and heavyweight basics. Hauz Khas Village, New Delhi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#0A0A0C] text-[#F4F4F6]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}
