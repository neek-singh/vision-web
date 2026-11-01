import type { Metadata, Viewport } from "next";
import { Roboto, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import LayoutWrapper from "@/components/LayoutWrapper";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.visionitinstitute.com"),
  title: {
    default: "Computer Institute in Pratappur | Vision IT",
    template: "%s | Vision IT",
  },
  description: "Vision IT Computer Institute, Pratappur (Surajpur). Offline BCC, DCA, ADCA and PGDCA courses with 70% practical lab training. Call 8103170595.",
  openGraph: {
    title: "Computer Institute in Pratappur | Vision IT",
    description: "Vision IT Computer Institute, Pratappur (Surajpur). Offline BCC, DCA, ADCA and PGDCA courses with 70% practical lab training. Call 8103170595.",
    url: "https://www.visionitinstitute.com",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vision IT Computer Institute, Pratappur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Computer Institute in Pratappur | Vision IT",
    description: "Vision IT Computer Institute, Pratappur (Surajpur). Offline BCC, DCA, ADCA and PGDCA courses with 70% practical lab training. Call 8103170595.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png" },
      { url: "https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png", sizes: "32x32", type: "image/png" },
      { url: "https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png",
    apple: [
      { url: "https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png" },
      { url: "https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png", sizes: "180x180", type: "image/png" },
    ],
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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${roboto.variable} ${poppins.variable} font-sans`}>
        <GoogleTagManager gtmId="GTM-KNH8M4KH" />
        <GoogleAnalytics gaId="G-SNT7CK2VDP" />
        <StructuredData />
        {/* Basic page structure with Flexbox to keep footer at bottom */}
        <LayoutWrapper
          header={<Header />}
          footer={<Footer />}
        >
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
