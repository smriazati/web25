import type { Metadata } from "next";
import Link from "next/link";

import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { getCoursesPage, getHomePage, getSiteConfig, getVideoProjects, getWebDevAndDesign } from "@/lib/content";
import styles from "@/styles/Home.module.css";

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
  const site = getSiteConfig();
  const videoProjects = getVideoProjects();
  const webDev = getWebDevAndDesign();
  const coursesPage = getCoursesPage();
  const heroProject = videoProjects[0]?.title ?? "new work";

  const linkCards = [
    {
      href: "/video-and-animation",
      label: "Video & Animation",
      description: `Twelve film, broadcast, and installation commissions including ${heroProject}.`,
    },
    {
      href: "/web-dev-design",
      label: "Freelance Web Clients",
      description: `${webDev.skills.length} core capabilities powering mission-driven marketing sites.`,
    },
    {
      href: "/college-courses",
      label: "College Courses",
      description: `${coursesPage.courses.length} syllabi snapshots with learning objectives and projects.`,
    },
  ];

  return (
    <>
      <PageTitle eyebrow="Portfolio 2025" title="Video, animation, and systems design" description={home.resumeSummary} />

      <Section>
        <div className={styles.hero}>
          <p>{home.codeStatement}</p>
          <p>{site.availability}</p>
        </div>
      </Section>

      <Section title="Selected Work">
        <div className={styles.linkCards}>
          {linkCards.map((card) => (
            <Link key={card.href} href={card.href} className={styles.card}>
              <span>{card.label}</span>
              <p>{card.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Contact & Collaborations" id="contact">
        <div className={styles.contactGrid}>
          <div className={styles.contactDetails}>
            <p>{site.location}</p>
            <p>{site.availability}</p>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.social.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={site.social.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <form className={styles.form} name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div>
              <label htmlFor="message">Project details</label>
              <textarea id="message" name="message" rows={4} required />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </Section>
    </>
  );
};

export default HomePage;
