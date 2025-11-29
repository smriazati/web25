import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

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
    images: ["/placeholders/placeholder.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.variable}>
        <Layout siteConfig={siteConfig}>{children}</Layout>
      </body>
    </html>
  );
}
