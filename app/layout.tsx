import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";

import Layout from "@/components/Layout";
import { getSiteConfig } from "@/lib/content";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const siteConfig = getSiteConfig();

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.tagline,
  metadataBase: new URL(siteConfig.baseUrl),
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.tagline,
    // images: [""],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmSans.variable}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >{`
          try {
            const saved = localStorage.getItem("theme");
            const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const dark = saved === "dark" || (!saved && system);
            if (dark) {
              document.documentElement.classList.add("dark");
            }
          } catch (e) {}
        `}</Script>
        <Layout siteConfig={siteConfig}>{children}</Layout>
      </body>
    </html>
  );
}
