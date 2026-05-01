import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../bones/registry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserNav } from "@/components/UserNav";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://visionitinstitute.com"),
  title: {
    default: "Vision IT Computer Institute | Best Computer Classes in Pratappur",
    template: "%s | Vision IT Computer Institute",
  },
  description: "Vision IT Computer Institute in Pratappur offers premium computer courses like DCA, PGDCA, and Web Development. The best IT training center for students in Pratappur, Chhattisgarh.",
  keywords: [
    "computer institute in pratappur",
    "best computer classes in pratappur",
    "pratappur computer coaching",
    "IT institute in pratappur",
    "computer course in pratappur",
    "vision it computer pratappur",
    "vision it computer pratppur",
    "vision institute pratappur",
    "vision it computer",
    "DCA course in pratappur",
    "PGDCA institute pratappur",
    "BCC course pratappur",
    "basic computer course for students pratappur",
    "advanced computer classes pratappur",
    "web development course pratappur",
    "python programming classes pratappur",
    "computer classes for school students pratappur",
    "computer course for 6th to 12th pratappur",
    "college students computer institute pratappur",
    "beginner to advanced computer training pratappur",
    "student friendly computer coaching pratappur",
    "computer institute near me pratappur",
    "best IT training center in pratappur cg",
    "top computer classes near pratappur",
    "pratappur madhya pradesh computer institute",
    "nearby computer coaching center pratappur",
    "best computer institute for beginners in pratappur",
    "affordable computer courses in pratappur cg",
    "job oriented computer courses in pratappur",
    "government recognized computer courses pratappur",
    "certificate computer course in pratappur",
    "#PratappurComputerInstitute",
    "#ComputerClassesPratappur",
    "#DCAPratappur",
    "#PGDCAPratappur",
    "#ITTrainingPratappur",
    "#ComputerCourseCG",
    "#StudentTrainingPratappur"
  ],
  openGraph: {
    title: "Vision IT Computer Institute Pratappur",
    description: "Vision IT Computer Institute in Pratappur offers premium computer courses like DCA, PGDCA, and Web Development. The best IT training center for students in Pratappur, Chhattisgarh.",
    url: "https://visionitinstitute.com",
    siteName: "Vision IT Computer Institute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision IT Computer Institute in Pratappur",
    description: "Vision IT Computer Institute in Pratappur offers premium computer courses like DCA, PGDCA, and Web Development. The best IT training center for students in Pratappur, Chhattisgarh.",
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
        <Script id="gtm-init" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KNH8M4KH');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SNT7CK2VDP"
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SNT7CK2VDP');
          `}
        </Script>
        {/* End Google Tag Manager */}
        {/* Basic page structure with Flexbox to keep footer at bottom */}
        <div className="flex flex-col min-h-screen">
          <Header userNav={<UserNav />} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
