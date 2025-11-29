"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "@/styles/Home.module.css";

interface ProjectLink {
    href: string;
    label: string;
}

interface ExpandableProjectsProps {
    links: ProjectLink[];
}

const ExpandableProjects = ({ links }: ExpandableProjectsProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section
            className={styles.previousProjects}
            data-expanded={isExpanded}
        >
            <h2
                className={styles.previousProjectsTitle}
                onClick={handleToggle}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggle();
                    }
                }}
            >
                <span className={styles.arrow}>⬇️</span>
                <span>Previous projects</span>
                <span className={styles.arrow}>⬇️</span>
            </h2>
            <ul className={styles.previousProjectsList}>
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ExpandableProjects;

