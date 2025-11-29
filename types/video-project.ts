import { SeoSchema } from './seo';

export interface VideoProjectVideo {
  platform: 'youtube' | 'vimeo';
  id: string;
  caption: string;
}

export interface VideoProject {
  title: string;
  slug: string;
  statement: string;
  stills: string[];
  videos: VideoProjectVideo[];
  seo: SeoSchema;
}
