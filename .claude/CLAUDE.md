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
- `--sidebar`, `--sidebar-foreground`, `--sidebar-border`, `--sidebar-accent` — dark sidebar palette
- Primary brand color: `oklch(0.527 0.154 150.069)` (emerald green)

### AI Integration (v0.5+)
- Route Handlers in `src/app/api/ai/` use Vercel AI SDK (`streamText` for chat, `generateObject` for structured responses)
- All prompt templates go in `src/lib/ai/prompts.ts` as typed functions — never inline
- User context for prompts is assembled in `src/lib/ai/context-builders.ts` by querying services

## Key Conventions

- **File naming**: kebab-case with dot notation (`nutrition.service.ts`, `user.repository.ts`)
- **Adding a new module**: create types → repository interface → in-memory impl → service → wire in `di.ts`
- **Server Actions**: live in `src/actions/`, import services from `src/lib/di.ts`, call `revalidatePath()` after mutation
- **"use client"** only on components that need browser APIs, event handlers, or React hooks; everything else is a Server Component by default

## Versioning Roadmap

| Version | Focus |
|---|---|
| v0.1 ✅ | Foundation: app shell, types, interfaces, in-memory repos |
| v0.2 | Nutrition module: food log, macros, Server Actions |
| v0.3 | Workout module: sessions, sets/reps, timer |
| v0.4 | Dashboard + Recharts charts |
| v0.5 | AI: Vercel AI SDK + Claude, streaming chat, meal suggestions |
| v0.6 | Supabase + real auth (the repository swap) |
| v0.7 | Vitest + Playwright tests, habits/water/sleep |
| v0.8 | Advanced AI: conversation history, multi-turn |
| v0.9 | Performance, Prisma migration |
| v1.0 | Production hardening, deploy |
