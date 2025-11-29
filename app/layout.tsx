import type { Metadata } from "next";

import Layout from "@/components/Layout";
import { getSiteConfig } from "@/lib/content";

import "./globals.css";

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
      <body>
        <Layout siteConfig={siteConfig}>{children}</Layout>
      </body>
    </html>
  );
}
