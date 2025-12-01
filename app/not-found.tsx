import Link from "next/link";
import styles from "@/styles/NotFound.module.css"; // optional CSS module
import BackLink from "@/components/BackLink";

export default function NotFound() {
    return (
        <main className={styles.wrapper}>
            <h1 className={styles.title}>
                <span className={styles.titleIcon}>⚠️</span>
                <span className={styles.errorMessage}>Page Not Found</span>
            </h1>
            <p className={styles.description}>
                This site is updated frequently. Were you looking for something specific? If so, just <a href="mailto:sarahriazati@gmail.com">email me</a>!
            </p>
            <BackLink href="/">
                ← Back to Home
            </BackLink>
        </main>
    );
}
