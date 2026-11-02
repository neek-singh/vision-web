import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import LayoutWrapper from "@/components/LayoutWrapper";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
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
      <body suppressHydrationWarning className={`${poppins.variable} font-sans`}>
        {/* Analytics & GTM loaded on idle to eliminate render-blocking & unused JS */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SNT7CK2VDP"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SNT7CK2VDP', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KNH8M4KH');
          `}
        </Script>
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
