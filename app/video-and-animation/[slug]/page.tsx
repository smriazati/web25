import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ImageGallery from "@/components/ImageGallery";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import VideoPlayer from "@/components/VideoPlayer";
import { getVideoProjectBySlug, getVideoProjectSlugs } from "@/lib/content";
import styles from "@/styles/VideoProjectDetail.module.css";

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

  return (
    <>
      <PageTitle eyebrow="Video & Animation" title={project.title} description={project.statement} />

      <Section title="Stills">
        <ImageGallery images={project.stills} altPrefix={project.title} />
      </Section>

      <Section title="Video Clips">
        <div className={styles.videoList}>
          {project.videos.map((video) => (
            <VideoPlayer key={`${video.platform}-${video.id}`} video={video} />
          ))}
        </div>
      </Section>

      <Link href="/video-and-animation" className={styles.backLink}>
        ← Back to all projects
      </Link>
    </>
  );
};

export default VideoProjectPage;
