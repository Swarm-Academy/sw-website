import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Swarm Academy - Collective Intelligence Platform",
  description: "Empowering collective intelligence through knowledge sharing, podcast discussions, and collaborative learning. Join our community of thinkers, creators, and innovators.",
  keywords: ["collective intelligence", "podcast", "learning", "community", "knowledge sharing", "collaboration"],
  authors: [{ name: "Swarm Academy" }],
  creator: "Swarm Academy",
  publisher: "Swarm Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://swarmacademy.com"),
  openGraph: {
    title: "Swarm Academy - Collective Intelligence Platform",
    description: "Empowering collective intelligence through knowledge sharing, podcast discussions, and collaborative learning.",
    url: "https://swarmacademy.com",
    siteName: "Swarm Academy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swarm Academy - Collective Intelligence Platform",
    description: "Empowering collective intelligence through knowledge sharing, podcast discussions, and collaborative learning.",
    creator: "@swarmacademy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased relative">
        <FloatingParticles count={15} className="opacity-40" />
        <div className="flex min-h-screen flex-col relative z-10">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
