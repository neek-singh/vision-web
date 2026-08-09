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
  metadataBase: new URL("https://visionitinstitute.com"),
  title: {
    default: "Vision IT Computer Institute | Computer Institute Pratappur",
    template: "%s | Vision IT Computer Institute",
  },
  description: "Vision IT Computer Institute is the leading computer institute pratappur offering premium courses like DCA, PGDCA, ADCA, and Web Development. The best computer center pratappur for professional IT education.",
  keywords: [
    "computer institute pratappur",
    "computer center pratappur",
    "best computer center pratappur",
    "vision it computer center pratappur",
    "vision it computer institute",
    "computer classes pratappur",
    "best computer institute pratappur",
    "computer training center pratappur",
    "IT institute pratappur",
    "IT training center pratappur",
    "computer course pratappur",
    "computer coaching pratappur",
    "computer education pratappur"
  ],
  openGraph: {
    title: "Vision IT Computer Institute | Computer Institute Pratappur",
    description: "Vision IT Computer Institute is the leading computer institute pratappur offering premium courses like DCA, PGDCA, ADCA, and Web Development. The best computer center pratappur for professional IT education.",
    url: "https://visionitinstitute.com",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision IT Computer Institute | Computer Institute Pratappur",
    description: "Vision IT Computer Institute is the leading computer institute pratappur offering premium courses like DCA, PGDCA, ADCA, and Web Development. The best computer center pratappur for professional IT education.",
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
