import { ReactNode } from "react";

import styles from "@/styles/Section.module.css";

interface SectionProps {
  title?: string;
  id?: string;
  children: ReactNode;
}

const Section = ({ title, id, children }: SectionProps) => (
  <section id={id} className={styles.section}>
    {title && <h2 className={styles.heading}>{title}</h2>}
    <div className={styles.content}>{children}</div>
  </section>
);

export default Section;
