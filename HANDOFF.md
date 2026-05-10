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
- **PR #5** — Phase 7 layout refacto (sidebar removed, full-width sticky topbar, grid+sticky column headers on xl+, flex+horizontal-scroll on smaller), guided demo tour with Sheet `modal={false}` to bypass Radix DismissableLayer, robust spotlight polling (cancellable, requires non-zero rect), `Add contact` via Claude LinkedIn-bio parsing, company logos (Clearbit + initials fallback), drag perf fixes (memo, useMemo, useCallback, scoped transitions, isDraggingRef with 50ms reset)
- **Design polish** — animated indigo glow background (`@property` gradient drift), indigo-tinted surfaces, card shadows, glass topbar
- **Post-PR#5 fixes & content pass** — demo tour sheet-close bug fixed (`onInteractOutside` on SheetContent prevents Radix DismissableLayer from closing the sheet when clicking "Suivant"); full content rewrite: research texts and emails in proper French sentences (no telegraphic fragments), pitch angles anchored in real CV experiences, style rules injected into AI research prompt; profile.ts aligned to real CV (removed fake entries); Hero subtitle rewritten as a proper sentence; Databricks seed brief corrected (MosaicML naming, removed unverifiable ARR figure).

## Current state

- Branch: `main`, up to date with origin
- Vercel CLI installed (v53.3.1), logged in, project linked at `.vercel/`
- `ANTHROPIC_API_KEY` set in Vercel production env
- `vercel.json` committed — maxDuration 30s for `/api/claude`
- Production deployed: https://pipeagent.vercel.app
- `public/screenshot.png` checked in and embedded in README

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
- Model: `claude-sonnet-4-6` in `app/api/claude/route.ts`
- CSS design tokens in `app/globals.css` — surfaces use `oklch` with indigo tint (~hue 272)
- Animated glow: `@property --gx/--gy` interpolated in `@keyframes glow-drift` on `body`, 22s loop
- Demo tour fix: `onInteractOutside={(e) => { if (preventOutsideClose) e.preventDefault(); }}` on SheetContent — blocks Radix DismissableLayer from closing the sheet when clicking the "Suivant" button outside it. `onPointerDownOutside` alone was insufficient because Radix's `DialogContentNonModal` only sets `hasPointerDownOutsideRef` when the event is not already prevented, causing a subsequent `focusOutside` event to fire `onDismiss` anyway.

## Known issues (below 80 code review threshold)

- Bulk scoring uses stale contact snapshot — concurrent edits during bulk score may be overwritten.
- `rationale` field returned by Claude scoring prompt is discarded (not stored on Contact).
- DemoTour step-effect deps include `contacts` — if contacts mutate during the tour (bulk score landing, drag end), the effect re-fires and resets the current step's auto-advance. Not hit in normal flow; only matters if user triggers bulk scoring while the tour is running.

## Still to do manually

- Refresh `public/screenshot.png` after meaningful UI changes (use `node /tmp/screenshot.mjs` pattern: headless Chrome + CDP `Page.addScriptToEvaluateOnNewDocument` to set `pipeagent.welcomed.v1` before navigation).
