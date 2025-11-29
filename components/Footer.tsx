import styles from "@/styles/Footer.module.css";
import { SiteConfig } from "@/types/site";

interface FooterProps {
  siteConfig: SiteConfig;
}

const Footer = ({ siteConfig }: FooterProps) => (
  <footer className={styles.footer}>
    <div className={styles.contactBlock}>
      <p>{siteConfig.location}</p>
      <a href={`mailto:${siteConfig.email}`} className={styles.email}>
        {siteConfig.email}
      </a>
      <p>{siteConfig.availability}</p>
    </div>
    <div className={styles.socialLinks}>
      <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
    </div>
    <p className={styles.copy}>
      © {new Date().getFullYear()} {siteConfig.siteName}. Built with Next.js.
    </p>
  </footer>
);

export default Footer;
