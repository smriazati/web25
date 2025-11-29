import { SeoSchema } from './seo';

export interface CoursesPageCourseSummary {
  title: string;
  slug: string;
  shortDescription: string;
  departments: string[];
  semesters: string[];
}

export interface CoursesPage {
  title: string;
  slug: string;
  intro: string;
  courses: CoursesPageCourseSummary[];
  seo: SeoSchema;
}
