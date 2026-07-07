import type { Metadata, Viewport } from "next";
import { Roboto, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../bones/registry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserNav } from "@/features/auth/components/UserNav";
import StructuredData from "@/components/StructuredData";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
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
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Header userNav={<UserNav />} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
