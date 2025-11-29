import styles from "@/styles/PageTitle.module.css";

interface PageTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

const PageTitle = ({ eyebrow, title, description }: PageTitleProps) => (
  <div className={styles.wrapper}>
    {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
    <h1 className={styles.title}>{title}</h1>
    {description && <p className={styles.description}>{description}</p>}
  </div>
);

export default PageTitle;
