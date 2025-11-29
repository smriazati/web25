import type { Metadata } from "next";

import ClientLogoGrid from "@/components/ClientLogoGrid";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { getWebDevAndDesign } from "@/lib/content";
import styles from "@/styles/WebDevDesign.module.css";

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
      <PageTitle eyebrow="Freelance" title={page.title} description={page.statement} />
      <Section title="Core Skills">
        <ul className={styles.skillsList}>
          {page.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </Section>
      <Section title="Client Collaborations">
        <ClientLogoGrid logos={page.clientLogos} />
      </Section>
    </>
  );
};

export default WebDevDesignPage;
