import type { Metadata } from "next";

import { getHomePage } from "@/lib/content";
import styles from "@/styles/Home.module.css";
import { RichParagraphs } from "@/components/RichParagraphs";
import Image from "next/image";
import Link from "next/link";

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const home = getHomePage();
  return {
    title: home.seo.title,
    description: home.seo.description,
    openGraph: {
      title: home.seo.title,
      description: home.seo.description,
      images: [home.seo.featuredImage],
    },
  };
}

const HomePage = () => {
  const home = getHomePage();

  return (
    <div className={styles.homePage}>

      <section className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}><span className={styles.sectionTitleIcon}>👋</span> About</h2>
        <figure>
          <Image src={home.profileImage.src} alt={home.profileImage.alt} width={300} height={300} />
        </figure>
        <RichParagraphs body={home.codeStatement} />
      </section>
      <section>
        <h2 className={styles.sectionTitle}><span className={styles.sectionTitleIcon}>💼</span> Skills</h2>
        <ul className={styles.skillsList}>
          {home.skills.map((skill) => (
            <li key={skill.title} className={styles.skillsListGroup}>
              <h3 className={styles.skillsTitle}>{skill.title}</h3>
              <div>
                <p>{skill.skills.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <div className={styles.homeSecondarySection}>
        <section
          className={styles.previousProjects}
        >
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleIcon}>✨</span>
            <span>Previous projects</span>
          </h2>
          <ul className={styles.previousProjectsList}>
            {home.linkCards.map((link) => (
              <li key={link.href} className={styles.previousProjectsListItem}>
                <span className={styles.linkCardIcon}>{link.icon}</span>
                <Link href={link.href} className={styles.linkCardLink}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.bioImages}>
          {home.bioImages.map((image) => (
            <figure key={image.src}>
              <Image src={image.src} alt={image.alt} width={150} height={150} />
            </figure>
          ))}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
