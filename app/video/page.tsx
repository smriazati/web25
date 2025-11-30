import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import BackLink from "@/components/BackLink";
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

const VideoPage = () => {
  const page = getVideoIndexPage();
  const projects = getVideoProjects();

  return (
    <div className={styles.container}>
      <Section title="Video Projects">
        <div className={styles.list}>
          {projects.map((project) => (
            <Link key={project.slug} href={`/video/${project.slug}`} className={styles.projectCard}>
              <h3>{project.title}</h3>
            </Link>
          ))}
        </div>
      </Section>
      <BackLink href="/">← Back to home page</BackLink>
    </div>
  );
};

export default VideoPage;
