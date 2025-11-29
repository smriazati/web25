import styles from "@/styles/Footer.module.css";
import { SiteConfig } from "@/types/site";

interface FooterProps {
  siteConfig: SiteConfig;
}

const Footer = ({ siteConfig }: FooterProps) => (
  <footer className={styles.footer}>
    <nav>
      <ul className={styles.contactLinks}>
        <li>
          <span className={styles.icon}>📧 </span><a href={`mailto:${siteConfig.email}`} className={styles.email}>
            <span className={styles.text}>{siteConfig.email}</span>
          </a>
        </li>
        <li>
          <span className={styles.icon}>👩‍💻 </span>
          <a href={siteConfig.social.github} target="_blank" rel="noreferrer" className={styles.text}>GitHub</a>
        </li>
        <li>
          <span className={styles.icon}>ℹ️ </span>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className={styles.text}>LinkedIn</a>
        </li>
      </ul>
    </nav>

    <div className={styles.secondaryInfo}>
      <p>📍 {siteConfig.location}</p>
    </div>
  </footer >
);

export default Footer;
