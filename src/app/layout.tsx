import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Bishwajit Karmaker Portfolio",
  description: "A unique, animated, eye-catching developer portfolio by Abdullah Karmaker.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="flex flex-col min-h-screen bg-black text-white">
        <AuthProvider>
          <div className="background" />
          <Header />
          <main className="flex-1 w-full pb-[60px] md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileNav />
        </AuthProvider>
      </body>
    </html>
  );
}
