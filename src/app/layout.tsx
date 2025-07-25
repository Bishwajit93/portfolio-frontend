// src/app/layout.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Bishwajit Karmaker Portfolio",
  description: "A unique, animated, eye-catching developer portfolio by Abdullah Karmaker.",
  icons: {
    icon: "data:,",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <AuthProvider>
          <div className="background" />
          <Header />
          <main className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-8 py-4 mt-20">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
