import { SeoSchema } from './seo';

export interface ClientLogo {
  name: string;
  logo: string;
  url?: string;
}

export interface WebDevAndDesign {
  title: string;
  slug: string;
  statement: string;
  skills: string[];
  clientLogos: ClientLogo[];
  seo: SeoSchema;
}
