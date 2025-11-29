# **GENERAL INSTRUCTIONS FOR CURSOR**

Using the technical spec below:

* scaffold a new **Next.js \+ TypeScript** project

* create all folders, components, and routes

* generate all JSON content files with placeholder data

* generate **TypeScript interfaces/types** for every JSON schema (in `/types` folder)

* ensure all pages use TypeScript types when loading and rendering JSON data

* ensure every page compiles with placeholder content

* create minimal styling aligned with the spec

* include metadata for every route using Next.js metadata API

* include a README describing how to run, edit content, generate static export, and deploy to Netlify

* ensure no server-side features are used (static export must work)

---

# **TECH**

* React / Next.js (app router)

* **TypeScript (required)**

* CSS Modules

* Version control on GitHub

* “next export” static export

* No server components that break static export

* Use `react-player` for video embeds

* Static JSON content stored in `/content`

---

# **JSON CONTENT SCHEMAS**

For each schema:

1. Create a `.json` example file inside `/content/...`

2. Create a matching TypeScript type in `/types/*.ts`

3. Import those types in pages/components

---

## **✅ SEO Schema (Reusable)**

**SeoSchema**

`export interface SeoSchema {`  
  `title: string;`  
  `description: string;`  
  `featuredImage: string; // /public/... path`  
`}`

---

## **✅ 1\. Home Page Schema**

**HomePage**

`export interface HomePage {`  
  `codeStatement: string;`  
  `resumeSummary: string;`  
  `seo: SeoSchema;`  
`}`

---

## **✅ 2\. Video & Animation Project Schema**

**VideoProject**

`export interface VideoProject {`  
  `title: string;`  
  `slug: string;`  
  `statement: string;`

  `stills: string[]; // image paths`

  `videos: {`  
    `platform: "youtube" | "vimeo";`  
    `id: string; // video ID only`  
    `caption: string;`  
  `}[];`

  `seo: SeoSchema;`  
`}`

One JSON file per video project.

---

## **✅ 3\. Web Dev & Design Schema**

**WebDevAndDesign**

`export interface WebDevAndDesign {`  
  `title: string; // "Web Development & Design"`  
  `slug: string;  // "web-dev-design"`

  `statement: string;`

  `skills: string[];`

  `clientLogos: {`  
    `name: string;`  
    `logo: string; // filename in /public`  
    `url?: string;`  
  `}[];`

  `seo: SeoSchema;`  
`}`

---

## **✅ 4\. Course Schema (Individual)**

**Course**

`export interface Course {`  
  `title: string;`  
  `slug: string;`  
  `description: string;`

  `learningObjectives: string[];`  
  `textbookAndScreenings: string[];`  
  `projects: string[];`

  `semestersAndFormatsTaught: {`  
    `semester: string;`  
    `format: string; // e.g. "in-person"`  
  `}[];`

  `seo: SeoSchema;`  
`}`

---

## **✅ 5\. College Courses Index Page Schema**

**CoursesPage**

`export interface CoursesPage {`  
  `title: string; // "College Courses"`  
  `slug: string;`  
  `intro: string;`

  `courses: {`  
    `title: string;`  
    `slug: string;`  
    `shortDescription: string;`  
  `}[];`

  `seo: SeoSchema;`  
`}`

---

# **COMPONENTS TO GENERATE**

* `<Layout />`

* `<Header />`

* `<Footer />`

* `<PageTitle />`

* `<Section />`

* `<VideoPlayer />`

  * uses `react-player`

  * supports Vimeo \+ YouTube

  * responsive width, max-width 800px

  * custom controls disabled

* `<ImageGallery />`

* `<ClientLogoGrid />`

All components must be created in `/components`, written in **TypeScript** (`.tsx`).

---

# **PROJECT STRUCTURE**

`/app`  
  `/(site sections)`  
`/components`  
`/content`  
`/types`  
`/styles`  
`/public`

---

# **ROUTING**

* Home: `/`

* Video project detail pages: `/video-and-animation/[slug]`

* Web dev & design: `/web-dev-design`

* College courses index: `/college-courses`

---

# **DYNAMIC PAGES**

**Video project pages**

* Must use `getStaticPaths` \+ `getStaticProps` (or Next.js export-friendly equivalents)

* Build one page per JSON file in `/content/video-projects`

---

# **SEO**

All pages must define Next.js `metadata` using:

* title

* description

* featured image

Values must come from the JSON content.

---

# **DESIGN STYLE**

* simple, text-driven, mobile-first

* white background

* black Helvetica text

* contained line lengths

* minimal CSS (CSS Modules)

---

# **DEPLOYMENT REQUIREMENTS**

* Use `next export` to generate static HTML

* No server-side rendering

* Videos must be **client-side rendered only**

* Ensure all routes and dynamic paths work with static export

* Deployment target: Netlify

---

# **PLACEHOLDER CONTENT**

For each JSON file:

* use lorem ipsum for text

* placeholder images like `/placeholders/project1.jpg`

* placeholder Vimeo/YouTube IDs

* placeholder client logos in `/public/logos/...`

---

# **SITE OUTLINE (content to scaffold)**

### **HOME PAGE**

* Code statement

* Resume summary

* Links to:

  * video & animation

  * freelance web clients

  * college courses

* Contact info \+ simple contact form

* Links to GitHub \+ LinkedIn

### **VIDEO & ANIMATION**

Video project pages for:

* monumental

* citizen ashe

* overland

* matt and kim

* fader tv

* joey badass

* peeing cloud

* fabrica

* on this land

* how to

* manifesto

* birds around the world

### **WEB DEV & DESIGN**

* statement

* skills

* client logos:

otherlove  
 renewal by andersen  
 leaf filter  
 durham for all  
 scalawag  
 pretty in the pines  
 society social  
 fabrica  
 unc-greensboro department of museum studies  
 The Samuel DuBois Cook Center on Social Equity at Duke  
 superfree

### **COLLEGE COURSES**

Single page with sections for:

* Intermediate Media Production

* Motion Graphic Production

* Foundations of Interactive Media

* Intermediate Interactive Media

* Intro to Digital Storytelling

Each course includes:

* textbook/screenings

* learning objectives

* projects

* semesters taught

