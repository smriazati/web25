import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SiteConfig } from "@/types/site";
import styles from "@/styles/Layout.module.css";

interface LayoutProps {
  children: ReactNode;
  siteConfig: SiteConfig;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/video", label: "Video" },
  { href: "/web-dev-design", label: "Web Dev & Design" },
  { href: "/college-courses", label: "College Courses" },
];

const Layout = ({ children, siteConfig }: LayoutProps) => (
  <div className={styles.shell}>
    <Header siteName={siteConfig.siteName} tagline={siteConfig.tagline} navLinks={navLinks} />
    <main className={styles.main}>{children}</main>
    <Footer siteConfig={siteConfig} />
  </div>
);

export default Layout;
