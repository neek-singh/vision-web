import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://visionitinstitute.com"),
  title: {
    default: "Vision IT Computer Institute",
    template: "%s | Vision IT Computer Institute",
  },
  description: "Empowering students with cutting-edge technology education.",
  openGraph: {
    title: "Vision IT Computer Institute",
    description: "Empowering students with cutting-edge technology education.",
    url: "https://visionitinstitute.com",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision IT Computer Institute",
    description: "Empowering students with cutting-edge technology education.",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "yulDXmESZbXN7tJFF0YVLKf8r3kuN6v9dZRctox7EC0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KNH8M4KH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <StructuredData />
        <GoogleTagManager gtmId="GTM-KNH8M4KH" />
        <GoogleAnalytics gaId="G-SNT7CK2VDP" />
        {/* End Google Tag Manager */}
        {/* Basic page structure with Flexbox to keep footer at bottom */}
        <div className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
