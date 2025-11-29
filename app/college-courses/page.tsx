import type { Metadata } from "next";

import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { getCoursesPage } from "@/lib/content";
import styles from "@/styles/Courses.module.css";
import BackLink from "@/components/BackLink";

export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const page = getCoursesPage();
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

const CollegeCoursesPage = () => {
  const page = getCoursesPage();

  return (
    <>
      <PageTitle eyebrow="Teaching" title={page.title} description={page.intro} />
      <div>
        <ul className={styles.courseList}>
          {page.courses.map((course) => (
            <li key={course.slug} className={styles.courseCard}>
              <h2>{course.title}</h2>
              <p>{course.shortDescription}</p>
              <div>
                <h3>University Departments</h3>
                <p>{course.departments.join(", ")}</p>
              </div>
              <div>
                <h3>Semesters offered</h3>
                <p>{course.semesters.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <BackLink href="/">← Back to home</BackLink>
    </>
  );
};

export default CollegeCoursesPage;
