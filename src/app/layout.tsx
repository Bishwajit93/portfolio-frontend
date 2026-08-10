import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abdullahstack.com"),
  title: {
    default: "Bishwajit Karmaker — Backend & Full-Stack Developer",
    template: "%s — Bishwajit Karmaker",
  },
  description: "Berlin-based backend and full-stack developer building production systems with Python, Django, PostgreSQL, TypeScript and Next.js.",
  keywords: ["Bishwajit Karmaker", "Backend Developer", "Full-Stack Developer", "Django Developer", "Python Developer", "Berlin Developer"],
  authors: [{ name: "Bishwajit Karmaker" }],
  openGraph: {
    type: "website",
    title: "Bishwajit Karmaker — Backend & Full-Stack Developer",
    description: "Production-focused software engineering across APIs, data, interfaces and deployment.",
    url: "https://www.abdullahstack.com",
    siteName: "Bishwajit Karmaker Portfolio",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
