import styles from "@/styles/PageTitle.module.css";
import Link from "next/link";

interface PageTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  eyebrowLink?: string;
}

const PageTitle = ({ eyebrow, title, description, eyebrowLink }: PageTitleProps) => (
  <div className={styles.wrapper}>
    {eyebrow ? (
      eyebrowLink ? (
        <div className={styles.eyebrowLinkWrapper}>
          <Link href={eyebrowLink} className={styles.eyebrow}>
            {eyebrow}
          </Link>
        </div>
      ) : (
        <p className={styles.eyebrow}>{eyebrow}</p>
      )
    ) : null}

    <h1 className={styles.title}>{title}</h1>
    {description && <p className={styles.description}>{description}</p>}
  </div>
);

export default PageTitle;
