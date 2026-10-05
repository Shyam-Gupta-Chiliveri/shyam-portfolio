# Shyam Sunder Chiliveri — Portfolio

**Live site:** [https://shyam-portfolio-ruby.vercel.app](https://shyam-portfolio-ruby.vercel.app)

Personal portfolio built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS v4**. Deployed on **Vercel** from this GitHub repo.

| | |
| --- | --- |
| Website | [shyam-portfolio-ruby.vercel.app](https://shyam-portfolio-ruby.vercel.app) |
| GitHub | [Shyam-Gupta-Chiliveri/shyam-portfolio](https://github.com/Shyam-Gupta-Chiliveri/shyam-portfolio) |
| Hosting | Vercel (production, auto-deploys from `main`) |

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Deploy to Vercel

This project is already live on Vercel. Pushing to `main` updates production.

Optional: in **Project → Settings → Environment Variables** set

```
NEXT_PUBLIC_SITE_URL = https://shyam-portfolio-ruby.vercel.app
```

This is used for `metadataBase`, Open Graph / Twitter tags, `sitemap.xml` and `robots.txt`. If it is not set, the site falls back to Vercel’s production URL, then to `https://shyam-portfolio-ruby.vercel.app` — never `localhost`.

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
