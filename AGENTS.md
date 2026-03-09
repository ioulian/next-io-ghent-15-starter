# AGENTS.md — Project conventions for next-io-ghent-15-starter

This document describes the conventions used in this Next.js boilerplate. **When extending or installing this project, follow these patterns so the codebase stays consistent.**

---

## 1. File and folder naming

### Components

- **One component per folder.** Folder name = component name in **PascalCase** (e.g. `Button`, `FormField`, `DataTable`).
- **Files in that folder:**
  - `ComponentName.tsx` — main component
  - `ComponentName.styles.ts` — tailwind-variants + optional CSS module imports
  - `ComponentName.module.css` — component-scoped styles (when needed)
  - `ComponentName.hooks.ts` — hooks and context for that component (e.g. `Dialog.hooks.ts`, `Popover.hooks.ts`)
  - `ComponentName.test.tsx` — Vitest unit/integration tests
  - `ComponentName.stories.tsx` — Storybook stories
- **Subcomponents** of a compound component can use a dot: `DataTable.THead.tsx`, `DataTable.TBody.tsx`, `DataTable.Controls.tsx`. Keep them in the same folder as the root (e.g. `organisms/data-table/`) or you can create subfolder(s) for them following atomic design patterns (e.g. `organisms/data-table/atoms/`).

### Other source files

- **Utils:** `kebab-case.ts` or `kebab-case/` with an `index.ts` where appropriate.
- **Types:** In `src/@types/` with `.d.ts` or `.ts`; use existing path alias `@/types/*`.
- **i18n:** `src/i18n/` — `routing.ts`, `request.ts`, `navigation.ts`, `constants.ts`, `types.ts`.

### Path aliases (tsconfig)

Use these instead of relative paths when leaving the current component area:

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/utils/*` → `src/utils/*`
- `@/hooks/*` → `src/hooks/*`
- `@/lib/*` → `src/lib/*`
- `@/styles/*` → `src/styles/*`
- `@/types/*` → `src/@types/*`
- `@/services/*` → `src/services/*`

---

## 2. Code structure

### `src/` layout

- **`app/`** — Next.js App Router. Locale segment: `app/[locale]/` (see next-intl).
- **`components/`** — Atomic design: `atoms/`, `molecules/`, `organisms/`, `blocks/`, `utils/`.
- **`i18n/`** — next-intl routing, request config, navigation wrappers, locale types.
- **`test/`** — Shared test utilities (e.g. `test-utils.tsx` with `NextIntlClientProvider`), `general-tests.tsx` for base UI API tests.
- **`@types/`** — Global or module augmentation (e.g. `svg-sprite.d.ts`, types for next-intl `AppConfig` in `i18n/types.ts`).

### Root

- **`messages/`** — JSON per locale (e.g. `en-GB/common.json`, `en-GB/app.json`). One folder per locale.
- **`e2e-tests/`** — Playwright specs (e.g. `svg-sprite.spec.ts`).
- **`scripts/`** — Build/CLI scripts (e.g. `scripts/svg-sprite/` for sprite generation).

---

## 3. Component patterns

### Re-renders: memo, useMemo, useCallback

- **Goal:** A component should not re-render when its props are effectively the same. Use `memo`, `useMemo`, and `useCallback` to keep references stable where it matters.

- **memo:** Wrap every React component in `memo()` and export as default:
  - `const Component: FC<Props> = (props) => { ... }; export default memo(Component);`
- Use a **named type** for props (e.g. `type Props = { ... }`) and `FC<Props>`. Export the props type when the component is part of a public API.

- **Stable props for memoized children:** If a parent passes **objects**, **arrays**, or **functions** to a `memo()`-wrapped child, those props are compared by reference. To avoid unnecessary re-renders:
  - **Callbacks:** Use `useCallback` when the callback is passed to a memoized child or appears in a dependency array and you need a stable reference across parent re-renders.
  - **Objects/arrays:** Use `useMemo` for derived objects or arrays passed as props (e.g. style, config, or context value) so the same reference is kept when dependencies don’t change.
- **Render props / compound APIs:** When a component accepts a render prop or a “default render” function (e.g. MenuBar’s `defaultRender`), pass a stable function (e.g. via `useCallback`) so the parent’s re-renders don’t force the child to re-render.

- **Don’t overdo it:** Use `useCallback` / `useMemo` where referential stability actually affects re-renders (memoized children, effect deps, context). Avoid wrapping every handler or variable “just in case.”

### Composition over props

- Prefer **composition** (children, slots, compound components) over large prop APIs:
  - Use **compound components** with a shared context (e.g. `Dialog` + `DialogTrigger`, `DialogContent`, `DialogClose`; `Dropdown` + `DropdownTrigger`, `DropdownMenu`, `DropdownMenuItem`).
  - Context lives in `ComponentName.hooks.ts` (e.g. `DialogContext`, `useDialogContext`) and is provided by the root component.
- For **icons**, accept `ReactNode` (e.g. `iconBefore`, `iconAfter`) and use `cloneElement` + `isValidElement` to inject `className` and `aria-hidden` when the child is a valid element (see `Button.tsx`).

### Client components

- Add **`"use client"`** only when the component uses hooks, browser APIs, or client-only libraries. Keep server components as default for pages and layouts where possible.

### Styling (tailwind-variants + CSS modules)

- **Variants and layout:** Use **tailwind-variants** (`tv`) in `ComponentName.styles.ts` with **slots** when the component has multiple styled parts (e.g. `button`, `content`, `spinner`, `icon`).
- **Complex or animation styles:** Use **CSS modules** (`ComponentName.module.css`) and reference them in the `tv` definition (e.g. `slots: { button: styles.button }`).
- Use **`VariantProps<typeof componentStyles>`** for variant/size props (e.g. `variant?: VariantProps<typeof button>["variant"]`).
- Use **`addClassNameToProps`** (from `@/utils/styles`) to merge `className` from props with the variant classes without overwriting.

### Spreading and refs

- Extend **`ComponentPropsWithRef<"element">`** (or `HTMLProps<HTMLDivElement>` etc.) when the component forwards ref and DOM props, and spread the rest: `...props` after explicit props.
- Use **`WithRequired<..., "children">`** from `@/types/helpers` when children are required.

---

## 4. next-intl

### Setup (already in boilerplate)

- **Routing:** `src/i18n/routing.ts` — `defineRouting` with `locales`, `defaultLocale`, `localePrefix: "as-needed"`.
- **Request config:** `src/i18n/request.ts` — `getRequestConfig` loads messages per locale from `messages/${locale}/common.json` and `app.json`.
- **Navigation:** `src/i18n/navigation.ts` — `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` from `createNavigation(routing)`; use these instead of raw Next.js navigation for locale-aware URLs.
- **Middleware:** `src/proxy.ts` (or root middleware) uses `createMiddleware(routing)` from `next-intl/middleware`.
- **Layout:** Root layout under `app/[locale]/` wraps children with `NextIntlClientProvider` (no `locale`/`messages` needed in client — they come from request config).

### Usage in code

- **Client components:** `useTranslations("namespace")` — namespace can be a dotted key (e.g. `"common.button"`, `"common.dataTable"`). Call `t("key")` for strings.
- **Server components / async:** `getTranslations({ locale, namespace: "..." })` (e.g. in `generateMetadata`, or server page).
- **Locale:** `useLocale()` when needed on the client.
- **Types:** `src/i18n/types.ts` augments `next-intl` `AppConfig` with `Locale` and `Messages`; keep locale and message types in sync with `messages/` and `i18n/constants.ts`.

### Messages and namespaces

- **One namespace per file:** e.g. `common.json` → `useTranslations("common")` or `useTranslations("common.button")`.
- **Page-specific:** e.g. `pages.home.meta` in `getTranslations` for metadata; keep page strings under a `pages` namespace if shared with client.
- **Check translations:** `pnpm check:translations` (i18n-check) — run before commits.

---

## 5. SVG sprites

### Workflow

- **Sprite is generated;** do not edit `SvgSprite.generated.ts` or `public/sprite.svg` by hand.
- **Build script:** `pnpm svg-sprite:build` (runs `scripts/svg-sprite/index.ts` and formats the generated file).
- **When to run:** Before `next dev`, `next build`, `next typegen`, and Storybook. The boilerplate runs it in `dev`, `build`, and `check:types`.

### Adding icons

- **Project icons:** Place SVG files under **`src/svg-sprites/`**. Subfolders become part of the id (e.g. `test/logo`).
- **Icons from node_modules:** Register in **`scripts/svg-sprite/constants.ts`** in `NODE_MODULES_SPRITES` (e.g. `tablerChevronLeft: "@tabler/icons/outline/chevron-left.svg"`). Use a consistent prefix (e.g. `tabler*`).
- After adding or changing SVGs, run **`pnpm svg-sprite:build`** so `SvgSprite.generated.ts` and `public/sprite.svg` are updated.

### Using icons in UI

- **Always use the `<SvgSprite>` component** from `@/components/atoms/svg-sprite/SvgSprite`.
- **Props:** `name: SvgSpriteName` (from `SvgSprite.generated.ts`), optional `title` for accessibility. Other SVG props (e.g. `className`, `aria-hidden`) are forwarded.
- **Do not** import raw SVG files or inline SVG for icons that belong in the sprite; use `SvgSprite` with the generated `SvgSpriteName` type.

---

## 6. Testing

### Vitest (unit / integration)

- **Config:** `vitest.config.ts` — projects: default (jsdom) and storybook (browser/Playwright). Setup: `vitest.setup.ts` (e.g. `@testing-library/jest-dom`).
- **Test files:** `**/*.test.tsx` or `**/*.test.ts` next to the code.
- **Render:** Use the custom **`render`** from `src/test/test-utils.tsx`, which wraps the tree in **`NextIntlClientProvider`** with locale and default messages so that `useTranslations` works.
- **Reusable “base API” tests:** Use **`describeGeneralTests(Element, () => ({ render }))`** from `src/test/general-tests.tsx` to assert render, custom `className`, and custom props (see e.g. `SvgSprite.test.tsx`).
- **Run:** `pnpm test` (default project), `pnpm test:watch`, `pnpm test:project-storybook` for Storybook-based tests.

### Playwright (e2e)

- **Specs:** In **`e2e-tests/`** (e.g. `svg-sprite.spec.ts`).
- **Run:** `pnpm test:e2e`.

### Pre-commit / CI

- **Full check:** `pnpm check:precommit` runs format, lint, typecheck, translations, and tests (`test` + `test:e2e`). Keep this passing when adding features.

---

## 7. Libraries to be aware of

- **Next.js 16** — App Router, `[locale]` segment, server/client components.
- **next-intl** — i18n, routing, `useTranslations`, `getTranslations`, `NextIntlClientProvider`, middleware, typed messages/locales.
- **SVG sprites** — `svg-sprite` (build), `SvgSprite` component and `SvgSprite.generated.ts`, `public/sprite.svg`.
- **Vitest** — Unit/integration tests, jsdom and Storybook projects; custom render with next-intl.
- **Playwright** — E2E in `e2e-tests/`.
- **tailwind-variants** — Component variants and slots; use with CSS modules where needed.
- **@floating-ui/react** — Dialogs, popovers, dropdowns, tooltips; compound components use its context and hooks.
- **React 19** — Current patterns (e.g. ref as prop, no legacy context API) are compatible.
- **TypeScript** — Strict mode; use types from the project (`LocaleType`, `SvgSpriteName`, `VariantProps<typeof X>`, etc.).

---

## 8. Checklist for new code

When adding features to this boilerplate (or a project created from it):

1. **Components:** One folder per component (PascalCase), `ComponentName.tsx` + styles/hooks/tests/stories as above; export default `memo(Component)`.
2. **Re-renders:** Use `memo` on components; use `useCallback` / `useMemo` where referential stability matters (e.g. props to memoized children, effect deps, render props).
3. **Compound components:** Prefer composition + context in `ComponentName.hooks.ts`; avoid prop drilling and huge prop lists.
4. **Icons:** Use `<SvgSprite name="…" />`; add new SVGs via `src/svg-sprites/` or `scripts/svg-sprite/constants.ts`, then `pnpm svg-sprite:build`.
5. **i18n:** Use `useTranslations` / `getTranslations` with existing namespaces; add keys to `messages/<locale>/*.json` and run `pnpm check:translations`.
6. **Imports:** Prefer `@/` path aliases for components, utils, hooks, types.
7. **Tests:** Use `render` from `src/test/test-utils.tsx`; add `*.test.tsx` and/or e2e in `e2e-tests/` as appropriate.
8. **Scripts:** Before dev/build/typecheck, ensure sprite is built if SVGs changed (`pnpm svg-sprite:build`).

Following this document keeps the rest of the project aligned with the same design patterns as this boilerplate.
