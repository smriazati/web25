import styles from "@/styles/Footer.module.css";
import { SiteConfig } from "@/types/site";

interface FooterProps {
  siteConfig: SiteConfig;
}

const Footer = ({ siteConfig }: FooterProps) => (
  <footer className={styles.footer}>
    <nav>
      <ul className={styles.contactLinks}>
        <li className={styles.textWrapper}>
          <span className={styles.icon}>📧 </span>
          <a href={`mailto:${siteConfig.email}`} className={styles.text}>
            {siteConfig.email}
          </a>
        </li>
        <li className={styles.textWrapper}>
          <span className={styles.icon}>👩‍💻 </span>
          <a href={siteConfig.social.github} target="_blank" rel="noreferrer" className={styles.text}>GitHub</a>
        </li>
        <li className={styles.textWrapper}>
          <span className={styles.icon}>ℹ️ </span>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className={styles.text}>LinkedIn</a>
        </li>
        <li className={`${styles.textWrapper}`}>
          <span className={styles.icon}>📍 </span>
          <span className={styles.text}>{siteConfig.location}</span>
        </li>
      </ul>
    </nav>


  </footer >
);

export default Footer;
