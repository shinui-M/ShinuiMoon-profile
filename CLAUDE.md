# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
npm run lint     # ESLint
```

## Architecture Overview

**Tech Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS 4

This is a **fully static single-page portfolio** — no backend, no auth, no database, no API routes.

### Key Files

- `src/app/page.tsx` — Entire site content. Each section is a standalone function component defined in this one file: `Nav`, `Hero`, `About`, `Education`, `Research`, `AcademicActivities`, `Skills`, `Activities`, `Certificates`, `Footer`. All content is hardcoded inline.
- `src/app/layout.tsx` — Minimal root layout (metadata only).
- `src/app/globals.css` — Tailwind 4 import + body font + scrollbar. No custom component classes.

### Static Assets

- `public/profile.jpg` — Profile photo (Hero section)
- `public/certificates/enrollment.pdf` — 재학증명서
- `public/certificates/transcript.pdf` — 성적증명서
- `public/certificates/toeic.pdf` — TOEIC 성적표

Certificate filenames are fixed; replace files in-place to update them.

### Styling

Tailwind CSS 4 utility classes only. No custom component classes. Color palette is blue-600 for accents, gray-50/100 for backgrounds, white for cards.

### Deployment

Vercel — pushing to `main` on `shinui-M/ShinuiMoon-profile` triggers automatic deployment.
