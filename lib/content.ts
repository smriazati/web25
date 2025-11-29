import fs from "node:fs";
import path from "node:path";

import { HomePage } from "@/types/home";
import { VideoProject } from "@/types/video-project";
import { WebDevAndDesign } from "@/types/web-dev-design";
import { CoursesPage } from "@/types/courses-page";
import { Course } from "@/types/course";
import { SiteConfig } from "@/types/site";
import { VideoIndexPage } from "@/types/video-index";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const readJsonFile = <T>(relativePath: string): T => {
  const filePath = path.join(CONTENT_ROOT, relativePath);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
};

const readJsonDirectory = <T>(relativeDir: string): T[] => {
  const directory = path.join(CONTENT_ROOT, relativeDir);
  const entries = fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
  return entries
    .map((file) => readJsonFile<T>(path.join(relativeDir, file)))
    .sort((a, b) => {
      const aSlug = (a as { slug?: string }).slug ?? "";
      const bSlug = (b as { slug?: string }).slug ?? "";
      return aSlug.localeCompare(bSlug);
    });
};

export const getSiteConfig = (): SiteConfig => readJsonFile<SiteConfig>("site.json");

export const getHomePage = (): HomePage => readJsonFile<HomePage>("home.json");

export const getVideoIndexPage = (): VideoIndexPage => readJsonFile<VideoIndexPage>("video-index.json");

export const getVideoProjects = (): VideoProject[] => readJsonDirectory<VideoProject>("video-projects");

export const getVideoProjectSlugs = (): string[] =>
  fs
    .readdirSync(path.join(CONTENT_ROOT, "video-projects"))
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""));

export const getVideoProjectBySlug = (slug: string): VideoProject | null => {
  const filePath = path.join("video-projects", `${slug}.json`);
  const absolutePath = path.join(CONTENT_ROOT, filePath);
  if (!fs.existsSync(absolutePath)) {
    return null;
  }

  return readJsonFile<VideoProject>(filePath);
};

export const getWebDevAndDesign = (): WebDevAndDesign =>
  readJsonFile<WebDevAndDesign>("web-dev-design.json");

export const getCoursesPage = (): CoursesPage => readJsonFile<CoursesPage>("courses/index.json");

export const getCourses = (): Course[] => readJsonDirectory<Course>("courses/entries");

export const getCourseBySlug = (slug: string): Course | null => {
  const filePath = path.join("courses/entries", `${slug}.json`);
  const absolutePath = path.join(CONTENT_ROOT, filePath);
  if (!fs.existsSync(absolutePath)) {
    return null;
  }

  return readJsonFile<Course>(filePath);
};
