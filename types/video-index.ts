import { SeoSchema } from "./seo";

export interface VideoIndexPage {
  title: string;
  seo: SeoSchema;
  order?: string[];
}
