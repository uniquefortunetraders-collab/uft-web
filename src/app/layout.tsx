import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "UniqueAI — Technology for a Smarter Tomorrow",
  description: "UniqueAI delivers innovative software, intelligent automation, and market technology solutions for modern enterprises and businesses.",
  keywords: ["Software Development", "FinTech Solutions", "AI Automation", "ERP Systems", "Stock Market Software", "Enterprise Technology"],
  authors: [{ name: "UniqueAI Technologies" }],
  openGraph: {
    title: "UniqueAI — Technology for a Smarter Tomorrow",
    description: "Enterprise software, financial technology, AI automation, and bespoke solutions.",
    type: "website",
    siteName: "UniqueAI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} scroll-smooth overflow-x-hidden max-w-full w-full`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#f1f8f3] text-gray-900 antialiased selection:bg-pink-500 selection:text-white overflow-x-hidden max-w-full w-full">
        {children}
      </body>
    </html>
  );
}
