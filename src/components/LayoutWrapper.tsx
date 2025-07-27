"use client";

import { ReactNode, useEffect } from "react";
import { setViewportHeight } from "@/utils/setViewportHeight";
import { AuthProvider } from "@/context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

type Props = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: Props) {
  useEffect(() => {
    setViewportHeight();
  }, []);

  return (
    <AuthProvider>
      <div className="background" />
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-8 pt-[60px] pb-[70px] md:pt-20 md:pb-10">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </AuthProvider>
  );
}
