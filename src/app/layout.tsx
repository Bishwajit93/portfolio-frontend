// src/app/layout.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Head from "next/head";
import "./globals.css"; // Global CSS import

// Corrected metadata definition with fallback values
export const metadata: Metadata = {
  title: "Abdullah Karmaker Portfolio",  // Static title (you can replace it)
  description: "A unique, animated, eye-catching developer portfolio by Abdullah Karmaker.", // Static description (you can replace it)
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Head>
          {/* Add meta and title dynamically */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content={metadata.description || "Default Description"} />
          <meta name="author" content="Abdullah Karmaker" />
          <meta name="keywords" content="portfolio, web developer, Abdullah Karmaker" />
          <title>{typeof metadata.title === "string" ? metadata.title : "Default Title"}</title>
        </Head>
        <div className="background"></div>
        <Header />
        <main className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-8 py-4 mt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
