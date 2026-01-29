import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MultiVendor - Your Trusted Online Marketplace",
  description: "Discover amazing products from trusted vendors across electronics, fashion, home goods, and more. Shop with confidence on our curated marketplace platform.",
  keywords: ["marketplace", "online shopping", "vendors", "products", "ecommerce"],
  authors: [{ name: "MultiVendor Team" }],
  creator: "MultiVendor",
  publisher: "MultiVendor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "MultiVendor - Your Trusted Online Marketplace",
    description: "Discover amazing products from trusted vendors across electronics, fashion, home goods, and more.",
    url: "http://localhost:3000",
    siteName: "MultiVendor",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MultiVendor - Your Trusted Online Marketplace",
    description: "Discover amazing products from trusted vendors across electronics, fashion, home goods, and more.",
    creator: "@multivendor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="fixed top-4 right-4 z-[100] md:hidden"><ThemeToggle /></div>
        {children}
      </body>
    </html>
  );
}
