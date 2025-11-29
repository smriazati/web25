import { SeoSchema } from './seo';

export interface CourseMeetingFormat {
  semester: string;
  format: string;
}

export interface Course {
  title: string;
  slug: string;
  description: string;
  learningObjectives: string[];
  textbookAndScreenings: string[];
  projects: string[];
  semestersAndFormatsTaught: CourseMeetingFormat[];
  seo: SeoSchema;
}
