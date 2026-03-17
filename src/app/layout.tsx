import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MortgageCore AI — The AI-Powered Mortgage Origination Platform",
  description:
    "MortgageCore AI is an end-to-end AI-powered loan origination system for banking partners. From lead capture to secondary market delivery — in 12–18 days.",
  openGraph: {
    title: "MortgageCore AI — System in a Box",
    description: "AI-Powered End-to-End Mortgage Origination Platform for Banking Partners",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="bg-navy text-off-white font-inter antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
