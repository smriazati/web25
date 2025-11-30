import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ImageGallery from "@/components/ImageGallery";
import Section from "@/components/Section";
import VideoPlayer from "@/components/VideoPlayer";
import { getVideoProjectBySlug, getVideoProjectSlugs, getNextProjectSlug } from "@/lib/content";
import styles from "@/styles/VideoProjectDetail.module.css";
import { RichParagraphs } from "@/components/RichParagraphs";
import BackLink from "@/components/BackLink";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = false;

export async function generateStaticParams() {
  return getVideoProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getVideoProjectBySlug(slug);
  if (!project) {
    return {};
  }

  return {
    title: project.seo.title,
    description: project.seo.description,
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: [project.seo.featuredImage],
    },
  };
}

const VideoProjectPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const project = getVideoProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextSlug = getNextProjectSlug(slug);
  const nextProjectHref = nextSlug ? `/video/${nextSlug}` : "/video";

  return (
    <>
      <div className={styles.breadcrumb}>
        <Link href="/video" className={styles.eyebrow}>
          Video
        </Link>
      </div>
      <h1 className={styles.title}>
        <span>{project.title}</span>
      </h1>
      <div className={styles.description}>
        <RichParagraphs body={project.statement} />
      </div>

      {
        project.stills && (
          <Section>
            <ImageGallery images={project.stills} />
          </Section>
        )
      }

      <Section>
        <div className={styles.videoList}>
          {project.videos.map((video) => (
            <VideoPlayer key={`${video.platform}-${video.id}`} video={video} />
          ))}
        </div>
      </Section>

      <div className={styles.navigation}>
        <BackLink href="/video">← Back to all video projects</BackLink>

        <Link href={nextProjectHref} className={styles.backLink}>
          Next project →
        </Link>
      </div>
    </>
  );
};

export default VideoProjectPage;
