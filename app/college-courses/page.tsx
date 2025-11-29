import type { Metadata } from "next";

import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { getCourses, getCoursesPage } from "@/lib/content";
import styles from "@/styles/Courses.module.css";

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
  const courses = getCourses();

  return (
    <>
      <PageTitle eyebrow="Teaching" title={page.title} description={page.intro} />
      <Section title="Courses">
        <div className={styles.courseList}>
          {courses.map((course) => (
            <article key={course.slug} className={styles.courseCard}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div>
                <strong>Learning objectives</strong>
                <ul className={styles.metaList}>
                  {course.learningObjectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Textbook & screenings</strong>
                <ul className={styles.metaList}>
                  {course.textbookAndScreenings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Projects</strong>
                <ul className={styles.projectList}>
                  {course.projects.map((project) => (
                    <li key={project}>{project}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.badges}>
                {course.semestersAndFormatsTaught.map((meeting) => (
                  <span key={`${meeting.semester}-${meeting.format}`}>
                    {meeting.semester} · {meeting.format}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
};

export default CollegeCoursesPage;
