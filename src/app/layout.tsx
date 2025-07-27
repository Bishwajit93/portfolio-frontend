// src/app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Bishwajit Karmaker Portfolio",
  description: "A unique, animated, eye-catching developer portfolio by Abdullah Karmaker.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className="h-full">
      <body className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
