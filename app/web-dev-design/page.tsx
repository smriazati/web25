import type { Metadata } from "next";

import ClientLogoGrid from "@/components/ClientLogoGrid";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { getWebDevAndDesign } from "@/lib/content";
import styles from "@/styles/WebDevDesign.module.css";
import BackLink from "@/components/BackLink";

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const page = getWebDevAndDesign();
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

const WebDevDesignPage = () => {
  const page = getWebDevAndDesign();

  return (
    <>
      <PageTitle eyebrow="Freelance Web Development & Design" title={page.title} description={page.statement} />
      <Section title="Clients">
        <ClientLogoGrid logos={page.clientLogos} />
        <BackLink href="/">← Back to home page</BackLink>

      </Section>
    </>
  );
};

export default WebDevDesignPage;
