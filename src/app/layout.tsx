// src/app/layout.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

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
        <AuthProvider>
          <div className="background" />
          <Header />
          <main className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-8 pt-[60px] pb-[70px] md:pt-20 md:pb-10">
            {children}
          </main>
          <Footer />
          <MobileNav />
        </AuthProvider>
      </body>
    </html>
  );
}
