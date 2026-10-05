# Shyam Sunder Chiliveri — Portfolio

Personal portfolio built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS v4**. Fully static, deploys to Vercel with zero config.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Deploy to Vercel

1. Push this folder to a Git repository and import it in Vercel (framework preset: Next.js).
2. In **Project → Settings → Environment Variables** add

   ```
   NEXT_PUBLIC_SITE_URL = https://your-domain.com
   ```

   This is used for `metadataBase`, Open Graph / Twitter tags, `sitemap.xml` and `robots.txt`. If it is not set, the site falls back to Vercel's production URL, then to `https://shyam-gupta-chiliveri.github.io` — never `localhost`.

## Content

All content lives in `data/` — edit these files, nothing else:

| File                      | Section                              |
| ------------------------- | ------------------------------------ |
| `data/profile.ts`         | Hero, About, languages, stats, contact |
| `data/projects.ts`        | Projects (case studies have `caseStudy`) and categories |
| `data/experience.ts`      | Experience timeline                  |
| `data/education.ts`       | Education timeline                   |
| `data/certifications.ts`  | Certification cards (`url` makes a card clickable) |
| `data/skills.ts`          | Skill groups                         |

The resume button links to `public/resume.pdf` — replace that file to update it.

## Hero frame animation

The hero draws a frame sequence on a `<canvas>`:

- **Desktop (mouse):** cursor X picks the frame — the portrait looks left / centre / right. Captions appear ("Looking around?", "Found something interesting?"); click the centre to play a greeting.
- **`prefers-reduced-motion`:** a static centre frame, no canvas.

Key poses live in `public/hero-keys/{left,center,right}.jpg`. Rebuild the strip with:

```bash
npm run frames
```

To use real footage instead, drop `frame_0001.webp …` into `public/frames/` (left → centre → right) and copy the centre frame to `public/hero-poster.webp`. The frame count is detected at build time.

## Structure

```
app/            layout (metadata, fonts, JSON-LD), page, globals.css, opengraph-image, sitemap, robots
components/     Nav, Hero, About, Experience, Projects, Certifications, Skills, Contact, Footer, Reveal, Section
data/           all content
lib/            frames, frames.server, site
scripts/        make-frames.mjs
public/         frames/, hero-keys/, hero-poster.webp, resume.pdf, icon.svg
```
