# PipeAgent — Handoff

## What PipeAgent is

Agentic CRM for Nicolas Masselot (M1 ESCP) — internship hunting in sales tech (juin/juillet 2026). Kanban pipeline with Claude AI features: pre-call research, email generation (cold/relance/follow-up), lead scoring.

**Local path:** `/Users/nico/Documents/GitHub/pipeagent`
**GitHub repo:** https://github.com/NicolasMasselot/pipeagent — public
**Prod URL:** https://pipeagent.vercel.app — LIVE

## Stack

- Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, shadcn/ui Nova preset
- @dnd-kit/core for drag-and-drop
- Anthropic SDK via server-side proxy `/api/claude` (key never reaches client)
- localStorage persistence (no database)
- Sonner for toasts

## What's been built (all on main)

- **PR #1** — design system (dark theme CSS vars), Sidebar, Topbar, /api/health
- **PR #2** — Kanban board, drag-and-drop, localStorage, seed contacts
- **PR #3** — Claude API proxy, ResearchPanel, EmailPanel, ScorePanel, bulk scoring, shared utils
- **PR #4** — WelcomeDialog, toast.error on all AI calls, favicon, metadata, README
- **Design polish** — animated indigo glow background (`@property` gradient drift), indigo-tinted surfaces, card shadows, sidebar gradient, glass topbar

## Current state

- Branch: `main`, up to date with origin
- Vercel CLI installed (v53.3.1), logged in, project linked at `.vercel/`
- `ANTHROPIC_API_KEY` set in Vercel production env
- `vercel.json` committed — maxDuration 30s for `/api/claude`

## IMPORTANT: Deployment is manual

GitHub auto-deploy is NOT connected (repo was private when Vercel was linked).
After every push, run:
```bash
vercel --prod
```

## Key technical decisions / invariants

- API key is **server-only** — never in client bundle. `/api/claude/route.ts` is the only place it's used.
- `pipeagent.welcomed.v1` localStorage key controls first-run dialog (WelcomeDialog.tsx)
- Score total = `Math.round(avg(responseProbability, profileFit, hiringTiming))`
- Bulk scoring is sequential (not parallel) to respect API rate limits
- `getScoreThreshold()` in `lib/utils/format.ts` → "success" | "warning" | "danger"
- Dark mode forced via `className="dark"` on `<html>` — no toggle
- Model hardcoded as `claude-sonnet-4-5` in `app/api/claude/route.ts` (should be updated to `claude-sonnet-4-6`)
- CSS design tokens in `app/globals.css` — surfaces use `oklch` with indigo tint (~hue 272)
- Animated glow: `@property --gx/--gy` interpolated in `@keyframes glow-drift` on `body`, 22s loop

## Known issues (below 80 code review threshold)

- `PipelineBoard`: `isDragging` state + 50ms setTimeout is fragile — dropping a card may open the sheet. Fix: use `useRef` instead of useState.
- `PipelineBoard.handleDragEnd` calls `saveContacts()` AND `onContactsChange` (which also calls `saveContacts`) — double write on every drag.
- Bulk scoring uses stale contact snapshot — concurrent edits during bulk score may be overwritten.
- `rationale` field returned by Claude scoring prompt is discarded (not stored on Contact).

## Still to do manually

- Take a screenshot of https://pipeagent.vercel.app, save as `public/screenshot.png`, commit + push, then update README.md (replace the "À ajouter" placeholder).
