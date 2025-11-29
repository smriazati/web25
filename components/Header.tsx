import Link from "next/link";

import styles from "@/styles/Header.module.css";
import DarkModeToggle from "@/components/DarkModeToggle";

interface HeaderProps {
  siteName: string;
  tagline: string;
  navLinks: { href: string; label: string }[];
}

const Header = ({ siteName, tagline, navLinks }: HeaderProps) => (
  <header className={styles.header}>
    <div>
      <Link href="/" className={styles.siteName}>
        {siteName}
      </Link>
      {/* <p className={styles.tagline}>{tagline}</p> */}
    </div>
    <div className={styles.headerRight}>
      <DarkModeToggle />
      {/* <nav>
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav> */}
    </div>
  </header>
);

export default Header;
