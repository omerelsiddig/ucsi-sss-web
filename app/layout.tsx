import type { Metadata, Viewport } from "next";
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

// 1. Update the Title and Description for your members
export const metadata: Metadata = {
  title: "Sudanese Students Society | SSS",
  description: "Official platform for the SSS community. Join us to stay connected.",
};

// 2. Add this to make sure the phone doesn't "zoom out" 
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 3. Changed background to black to match your aesthetic */}
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}