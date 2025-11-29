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
    images: ["/placeholders/placeholder.jpg"],
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
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Layout siteConfig={siteConfig}>{children}</Layout>
      </body>
    </html>
  );
}
