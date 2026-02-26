# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build + type-check
npm run lint     # ESLint
npx tsc --noEmit # Type-check without building
```

No test runner is configured yet (added at v0.7).

## Architecture

### Data Flow
```
Server Action / Route Handler
  → Service (src/services/)       ← business logic only
    → Repository Interface (src/repositories/interfaces/)
      → Repository Implementation (src/repositories/in-memory/ | supabase/ | prisma/)
```

Services import **only interfaces**, never concrete implementations. `src/lib/di.ts` is the single file that wires implementations to services — it is the **only file that changes when swapping the database**.

### Route Groups
- `src/app/(app)/` — authenticated app pages; shares the sidebar/topbar layout via `AppShell`
- `src/app/(auth)/` — login/register; centered card layout, no sidebar
- `src/app/api/ai/` — AI Route Handlers (streaming chat, structured generation) — added at v0.5
- `src/app/page.tsx` — redirects to `/dashboard`

### Types
All types are **Zod schemas first**; TypeScript types are derived with `z.infer<>`. Never write a `type` or `interface` that duplicates a Zod schema. Schemas live in `src/types/*.types.ts`.

### Auth
`src/lib/auth/index.ts` exports `getCurrentUserId()` which returns a hardcoded string `"user_dev_1"` until v0.6. Every part of the app calls this function — never hardcode the user ID elsewhere.

### Shadcn/ui
Components are copied into `src/components/ui/` and are owned by the project. Add new ones with:
```bash
npx shadcn@latest add <component-name>
```

### CSS / Design tokens
Custom properties in `src/app/globals.css` define the design system:
- `--nutrition` (green), `--workout` (purple), `--progress-accent` (amber), `--ai-accent` (blue)
- `--sidebar`, `--sidebar-foreground`, `--sidebar-border`, `--sidebar-accent` — dark sidebar tokens (exposed as Tailwind classes: `bg-sidebar`, `text-sidebar-foreground`, etc.)
- Primary brand color: `oklch(0.72 0.19 150.069)` (emerald green — brighter for dark-first palette)
- **Dark-first palette**: `:root` holds dark values directly; `.dark` mirrors it. Depth: sidebar `oklch(0.07)` → background `oklch(0.11)` → card `oklch(0.17)` → muted `oklch(0.21)`
- **Font**: Plus Jakarta Sans via `--font-plus-jakarta` CSS variable (weights 400–800, `display: swap`)
- **Custom easing** (in `@theme inline`): `--ease-spring`, `--ease-out-expo`, `--ease-in-out-smooth`
- **Utility classes**: `.card-hover-lift`, `.nav-item-transition`, `.sidebar-transition`, `.topbar-glass`, `.animate-glow-pulse`, `.animate-fade-slide-up`, `.animate-number-pop`, `.shimmer`

### AI Integration (v0.5+)
- Route Handlers in `src/app/api/ai/` use Vercel AI SDK (`streamText` for chat, `generateObject` for structured responses)
- All prompt templates go in `src/lib/ai/prompts.ts` as typed functions — never inline
- User context for prompts is assembled in `src/lib/ai/context-builders.ts` by querying services

## Key Conventions

- **File naming**: kebab-case with dot notation (`nutrition.service.ts`, `user.repository.ts`)
- **Adding a new module**: create types → repository interface → in-memory impl → service → wire in `di.ts`
- **Server Actions**: live in `src/actions/`, import services from `src/lib/di.ts`, call `revalidatePath()` after mutation, then `redirect()`
- **"use client"** only on components that need browser APIs, event handlers, or React hooks; everything else is a Server Component by default
- **`next/font` variables must be on `<html>`**, not `<body>`. Tailwind v4 preflight sets `font-family: var(--font-sans)` on `<html>` — if the CSS variable class is on `<body>`, the var is out of scope and the font silently falls back to system default.
- **Tailwind v4 canonical classes**: use `bg-sidebar`, `text-sidebar-foreground`, etc. — not bracket notation `bg-[var(--sidebar)]`. The design tokens are exposed as first-class utilities.
- **Zod + React Hook Form**: use `z.number()` (not `z.coerce.number()`) for numeric form fields. `z.coerce` gives inputs `unknown` type which conflicts with RHF's strict `useForm<T>` generic. Convert strings to numbers manually in `onChange` handlers.
- **`useOptimistic`**: use for instant delete/update feedback in list components before server action confirms

## Versioning Roadmap

| Version | Focus |
|---|---|
| v0.1 ✅ | Foundation: app shell, types, interfaces, in-memory repos |
| v0.2 ✅ | Nutrition module: food log, macros, Server Actions, date nav, `useOptimistic` |
| v0.2.1 ✅ | Styling: dark-first OKLCH palette, Plus Jakarta Sans, CSS transitions, favicon, metadata |
| v0.3 | Workout module: sessions, sets/reps, timer |
| v0.4 | Dashboard + Recharts charts |
| v0.5 | AI: Vercel AI SDK + Claude, streaming chat, meal suggestions |
| v0.6 | Supabase + real auth (the repository swap) |
| v0.7 | Vitest + Playwright tests, habits/water/sleep |
| v0.8 | Advanced AI: conversation history, multi-turn |
| v0.9 | Performance, Prisma migration |
| v1.0 | Production hardening, deploy |
