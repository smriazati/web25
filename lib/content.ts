import fs from "node:fs";
import path from "node:path";

import { HomePage, Skill } from "@/types/home";
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

export const getHomePage = (): HomePage => {
  const data = readJsonFile<Omit<HomePage, 'skills'> & { skills: Record<string, Skill> }>("home.json");
  return {
    ...data,
    skills: Object.values(data.skills),
  };
};

export const getVideoIndexPage = (): VideoIndexPage => readJsonFile<VideoIndexPage>("video-index.json");

export const getVideoProjects = (): VideoProject[] => {
  // Read all projects without sorting
  const directory = path.join(CONTENT_ROOT, "video-projects");
  const entries = fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
  const allProjects = entries.map((file) => readJsonFile<VideoProject>(path.join("video-projects", file)));

  // Get the order array from video-index.json
  const indexPage = getVideoIndexPage();
  const order = indexPage.order || [];

  // If no order specified, return alphabetically sorted (backward compatibility)
  if (order.length === 0) {
    return allProjects.sort((a, b) => a.slug.localeCompare(b.slug));
  }

  // Create a map of projects by slug for quick lookup
  const normalizeSlug = (s: string) =>
    s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");

  const projectMap = new Map<string, VideoProject>();
  allProjects.forEach((project) => {
    projectMap.set(normalizeSlug(project.slug), project);
  });

  const orderedProjects: VideoProject[] = [];
  const usedSlugs = new Set<string>();

  order.forEach((slug) => {
    const project = projectMap.get(normalizeSlug(slug));
    if (project) {
      orderedProjects.push(project);
      usedSlugs.add(normalizeSlug(slug));
    }
  });

  const remainingProjects = allProjects
    .filter((project) => !usedSlugs.has(normalizeSlug(project.slug)))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return [...orderedProjects, ...remainingProjects];
};

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

export const getNextProjectSlug = (currentSlug: string): string | null => {
  const projects = getVideoProjects();
  if (projects.length === 0) {
    return null;
  }

  // Normalize slug for matching (same logic as in getVideoProjects)
  const normalizeSlug = (s: string) =>
    s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");

  const normalizedCurrent = normalizeSlug(currentSlug);

  // Find current project's index
  const currentIndex = projects.findIndex(
    (project) => normalizeSlug(project.slug) === normalizedCurrent
  );

  // If current project not found, return null
  if (currentIndex === -1) {
    return null;
  }

  // Get next project (wrapping around to first if at the end)
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex].slug;
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
