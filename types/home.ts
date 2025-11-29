import { SeoSchema } from './seo';

export interface LinkCard {
  href: string;
  label: string;
  icon: string;
}

export interface Skill {
  title: string;
  skills: string[];
}

export interface Image {
  src: string;
  alt: string;
}
export interface HomePage {
  codeStatement: string[];
  profileImage: Image;
  linkCards: LinkCard[];
  bioImages: Image[];
  skills: Skill[];
  seo: SeoSchema;
}
