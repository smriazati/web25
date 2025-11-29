export interface SiteConfigSocial {
  github: string;
  linkedin: string;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  baseUrl: string;
  email: string;
  location: string;
  availability: string;
  social: SiteConfigSocial;
}
