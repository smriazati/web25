import type { Metadata } from "next";
import Link from "next/link";

import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { getVideoIndexPage, getVideoProjects } from "@/lib/content";
import styles from "@/styles/VideoProjects.module.css";

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const page = getVideoIndexPage();
  return {
    title: page.seo.title,
    description: page.seo.description,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      images: [page.seo.featuredImage],
    },
  };
}

const VideoAndAnimationPage = () => {
  const page = getVideoIndexPage();
  const projects = getVideoProjects();

  return (
    <>
      <PageTitle eyebrow="Video & Animation" title={page.title} description={page.intro} />
      <Section title="Projects">
        <div className={styles.list}>
          {projects.map((project) => (
            <Link key={project.slug} href={`/video-and-animation/${project.slug}`} className={styles.projectCard}>
              <h3>{project.title}</h3>
              <p>{project.statement}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
};

export default VideoAndAnimationPage;
