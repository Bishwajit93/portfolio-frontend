// src/app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Bishwajit Karmaker Portfolio",
  description: "A unique developer portfolio by Bishwajit(Abdullah).",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className="h-full">
      <body className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
