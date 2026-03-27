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

- `src/app/page.tsx` — Entire site content. All sections and hooks live in this one file.
- `src/app/layout.tsx` — Minimal root layout (metadata only).
- `src/app/globals.css` — Tailwind 4 import + body font + scrollbar. No custom component classes.

### Component Structure (`page.tsx`)

The file is marked `"use client"` at the top (required for hooks/interactivity).

**Shared utilities defined at the top:**
- `useInView(threshold)` — IntersectionObserver hook; triggers once when element enters viewport.
- `FadeIn` — Wrapper component using `useInView` to animate children with fade+slide on scroll.
- `useActiveSection(ids)` — Tracks which nav section is currently in view.
- `useScrollProgress()` — Returns scroll percentage (0–100) for the progress bar.
- `useTypingEffect(text, speed)` — Animates a string character by character (used in Hero).
- `SectionHeader` — Reusable `<h2>` + blue underline accent bar.

**Page sections (in render order):** `Nav` → `Hero` → `About` → `Education` → `Research` → `AcademicActivities` → `ResearchInterests` → `Skills` → `Activities` → `Certificates` → `Footer` → `BackToTop`

### Content Editing Pattern

All content is hardcoded inline. To add/edit content:
- **List-based sections** (`Research`, `Activities`, `AcademicActivities`, `Skills`): edit the data arrays at the top of each component function. In `Activities`, items are ordered by year descending — newest year at the top.
- **Prose sections** (`About`, `Hero`): edit JSX directly.
- **Nav links**: edit the `NAV_LINKS` array (also add a matching `id` on the section element).

### Static Assets

- `public/certificates/enrollment.pdf` — 재학증명서
- `public/certificates/transcript.pdf` — 성적증명서
- `public/certificates/toeic.pdf` — TOEIC 성적표
- `public/certificates/dgist-intern.pdf` — DGIST 인턴 수료증
- `public/certificates/scholarship.pdf` — 장학금 수혜 확인서

Certificate filenames are fixed; replace files in-place to update them.

The `Certificates` component renders `desc` split on ` · ` — each segment appears on its own line. Cards use a vertical layout (icon → title → desc lines, center-aligned).

### Styling

Tailwind CSS 4 utility classes only. No custom component classes. Color palette: `blue-600` for accents, `gray-50/100` for backgrounds, `white` for cards. Card hover pattern: `hover:shadow-md hover:-translate-y-0.5 transition-all duration-250`.

### Deployment

Vercel — pushing to `main` on `shinui-M/ShinuiMoon-profile` triggers automatic deployment.
