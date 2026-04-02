import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ProceduralGrid } from "@/components/ui/ProceduralGrid";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "FoxtacticsAI | Command Center",
  description: "Weaponized interface for creators. Predictable systems for virality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark max-w-[100vw] overflow-x-hidden`}
    >
      <body className="min-h-screen flex flex-col pt-16 relative z-0 text-primary">
        <ProceduralGrid />
        <Navbar />
        <main className="flex-1 flex flex-col w-full relative min-h-0">
          {children}
        </main>
      </body>
    </html>
  );
}
