import Link from "next/link";
import Section from "@/components/Section";
import styles from "@/styles/BackLink.module.css";

interface BackLinkProps {
  href: string;
  children?: React.ReactNode;
}

const BackLink = ({ href, children = "← Back" }: BackLinkProps) => {
  return (
    <Section>
      <Link href={href} className={styles.backLink}>
        {children}
      </Link>
    </Section>
  );
};

export default BackLink;




