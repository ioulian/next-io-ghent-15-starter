<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` - verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md - Project conventions for next-io-ghent-15-starter

This document is the convention source for projects created from this boilerplate (and for edits inside this repo). Agents generating components must follow these patterns so the codebase stays consistent.

---

## 1. File and folder naming

### Components

- **One component per folder.** Folder name = component name in **kebab-case**; files use **PascalCase** (e.g. `src/components/atoms/button/Button.tsx`, `form-field/FormField.tsx`, `data-table/DataTable.tsx`).
- **Files in that folder:**
  - `ComponentName.tsx` - main component
  - `ComponentName.styles.ts` - tailwind-variants + CSS module imports
  - `ComponentName.module.css` - component-scoped styles (when needed)
  - `ComponentName.hooks.ts` - hooks and context for that component (e.g. `Dialog.hooks.ts`, `Popover.hooks.ts`)
  - `ComponentName.utils.ts` - helpers scoped to the component (when needed)
  - `ComponentName.types.ts` - types scoped to the component (when needed)
  - `ComponentName.constants.ts` - constants scoped to the component (when needed)
  - `ComponentName.context.ts` - context module when kept separate from hooks (when needed)
  - `ComponentName.test.tsx` - Vitest unit/integration tests
  - `ComponentName.stories.tsx` - Storybook stories
- **Subcomponents** of a compound component can use a dot: `DataTable.THead.tsx`, `DataTable.TBody.tsx`, `DataTable.Controls.tsx`. Keep them in the same folder as the root (e.g. `organisms/data-table/`) or create subfolder(s) following atomic design (e.g. `organisms/data-table/atoms/`).
- Place new UI in the matching atomic folder (`atoms/`, `molecules/`, `organisms/`, `blocks/`, `utils/`). Prefer an existing component (`Button`, `Dialog`, `Form`, `DataTable`, …) over inventing a new one.

### Other source files

- **Utils:** `kebab-case.ts` or `kebab-case/` with an `index.ts` where appropriate.
- **Types:** In `src/@types/` with `.d.ts` or `.ts`; use existing path alias `@/types/*`.
- **i18n:** `src/i18n/` - `routing.ts`, `request.ts`, `navigation.ts`, `constants.ts`, `types.ts`.

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

- **`app/`** - Next.js App Router. Locale segment: `app/[locale]/` (see next-intl).
- **`components/`** - Atomic design: `atoms/`, `molecules/`, `organisms/`, `blocks/`, `utils/`.
- **`i18n/`** - next-intl routing, request config, navigation wrappers, locale types.
- **`test/`** - Shared test utilities (e.g. `test-utils.tsx` with `NextIntlClientProvider`), `general-tests.tsx` for base UI API tests.
- **`@types/`** - Global or module augmentation (e.g. `svg-sprite.d.ts`, types for next-intl `AppConfig` in `i18n/types.ts`).

### Root

- **`messages/`** - JSON per locale (e.g. `en-GB/common.json`, `en-GB/app.json`). One folder per locale (`en-GB`, `fr-BE`, `nl-BE` from `src/i18n/constants.ts`).
- **`e2e-tests/`** - Playwright specs (e.g. `svg-sprite.spec.ts`).
- **`scripts/`** - Build/CLI scripts (e.g. `scripts/svg-sprite/` for sprite generation).

---

## 3. Component patterns

### Re-renders: memo, useMemo, useCallback

- **Goal:** A component should not re-render when its props are effectively the same. Use `memo`, `useMemo`, and `useCallback` to keep references stable where it matters.

- **memo:** Wrap every React component in `memo()` and export as default:
  - `export type Props = { ... }; function Component({ ...props }: Props) { ... } export default memo(Component);`
- Use an exported **`Props`** type for the component’s props. For polymorphic/generic components, use `PolymorphicProps` from `@/types/helpers` and keep `export default memo(Component) as typeof Component` (see `Button.tsx`).

- **Stable props for memoized children:** If a parent passes **objects**, **arrays**, or **functions** to a `memo()`-wrapped child, those props are compared by reference. To avoid unnecessary re-renders:
  - **Callbacks:** Use `useCallback` when the callback is passed to a memoized child or appears in a dependency array and you need a stable reference across parent re-renders.
  - **Objects/arrays:** Use `useMemo` for derived objects or arrays passed as props (e.g. style, config, or context value) so the same reference is kept when dependencies don't change.
- **Render props / compound APIs:** When a component accepts a render prop or a "default render" function (e.g. MenuBar's `defaultRender`), pass a stable function (e.g. via `useCallback`) so the parent's re-renders don't force the child to re-render.

- **Don't overdo it:** Use `useCallback` / `useMemo` where referential stability actually affects re-renders (memoized children, effect deps, context). Avoid wrapping every handler or variable "just in case."

### Composition over props

- Prefer **composition** (children, slots, compound components) over large prop APIs:
  - Use **compound components** with a shared context (e.g. `Dialog` + `DialogTrigger`, `DialogContent`, `DialogClose`; `Dropdown` + `DropdownTrigger`, `DropdownMenu`, `DropdownMenuItem`).
  - Context lives in `ComponentName.hooks.ts` (e.g. `DialogContext`, `useDialogContext`) and is provided by the root component.
- For **icons**, accept `ReactNode` (e.g. `iconBefore`, `iconAfter`) and use `cloneElement` + `isValidElement` to inject `className` and `aria-hidden` when the child is a valid element (see `Button.tsx`).

### Client components

- Add **`"use client"`** only when the component uses hooks, browser APIs, or client-only libraries. Keep server components as default for pages and layouts where possible.
- Do not use `useEffect` to copy props into state (`eslint-plugin-react-you-might-not-need-an-effect`).

### Styling (tailwind-variants + CSS modules)

This project does **not** use Tailwind CSS utility classes, `class-variance-authority` (CVA), `tailwind-merge`, or a shadcn-style `cn()`. Class names come from CSS modules; **tailwind-variants** (`tv`) is only the variant composer.

- **Why tailwind-variants instead of CVA:** The API matches CVA (`base`, `variants`, `defaultVariants`, `VariantProps`), and it additionally supports **slots** for multi-part components. Prefer `tv` from `tailwind-variants`; do not add CVA.
- **Single-element variants (CVA-shaped):** Use `base` + `variants` in `ComponentName.styles.ts`, importing classes from the CSS module (see `Paragraph.styles.ts`).
- **Multi-part components (slots):** Map each part in `slots` (e.g. `button`, `content`, `spinner`, `icon`) to CSS module classes, then call `classes.button()`, `classes.content()`, etc. (see `Button.styles.ts`).
- **CSS modules:** Put layout, color, animation, and complex selectors in `ComponentName.module.css`. Open the file with the cascade layer for that atomic level: `@layer atoms`, `@layer molecules`, `@layer organisms`, `@layer blocks`, or `@layer utils`. Layer order is fixed in `src/app/[locale]/_styles/layers.css`.
- **Design tokens:** Use existing CSS variables from `src/app/[locale]/_styles/variables.ts` (e.g. `var(--color-…)`, `var(--radius-01)`, `var(--duration-fast)`, `var(--zIndex-dialog)`, `var(--easing-swift-out)`). Do not invent a second palette inside a component.
- Use **`VariantProps<typeof componentStyles>`** for variant/size props (e.g. `variant?: VariantProps<typeof button>["variant"]`).
- Merge `className` from props with **`addClassNameToProps`** from `@/utils/styles` (`clsx`). Do not add `tailwind-merge` or a custom `cn()`.

### Spreading and refs

- Extend **`ComponentPropsWithRef<"element">`** (or `HTMLProps<HTMLDivElement>` etc.) when the component forwards ref and DOM props, and spread the rest: `...props` after explicit props.
- Use **`WithRequired<..., "children">`** from `@/types/helpers` when children are required.
- Keep `import type` as separate type-only imports (`@typescript-eslint/consistent-type-imports`).

---

## 4. next-intl

### Setup (already in boilerplate)

- **Routing:** `src/i18n/routing.ts` - `defineRouting` with `locales`, `defaultLocale`, `localePrefix: "as-needed"`.
- **Request config:** `src/i18n/request.ts` - `getRequestConfig` loads messages per locale from `messages/${locale}/common.json` and `app.json`.
- **Navigation:** `src/i18n/navigation.ts` - `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` from `createNavigation(routing)`; use these instead of raw `next/link` or `next/navigation` for locale-aware URLs.
- **Middleware:** `src/proxy.ts` uses `createMiddleware(routing)` from `next-intl/middleware`.
- **Layout:** Root layout under `app/[locale]/` wraps children with `NextIntlClientProvider` (no `locale`/`messages` needed in client - they come from request config).

### Usage in code

- **Client components:** `useTranslations("namespace")` - namespace can be a dotted key (e.g. `"common.button"`, `"common.dataTable"`). Call `t("key")` for strings.
- **Server components / async:** `getTranslations({ locale, namespace: "..." })` (e.g. in `generateMetadata`, or server page).
- **Locale:** `useLocale()` when needed on the client.
- **Types:** `src/i18n/types.ts` augments `next-intl` `AppConfig` with `Locale` and `Messages`; keep locale and message types in sync with `messages/` and `i18n/constants.ts`.
- User-facing copy must go through translations. `i18next/no-literal-string` is enabled; stories and tests are exempt.

### Messages and namespaces

- **One namespace per file:** e.g. `common.json` → `useTranslations("common")` or `useTranslations("common.button")`.
- **Page-specific:** e.g. `pages.home.meta` in `getTranslations` for metadata; keep page strings under a `pages` namespace if shared with client.
- Add new keys to **every** locale under `messages/` (`en-GB`, `fr-BE`, `nl-BE`).
- **Check translations:** `pnpm check:translations` (i18n-check) - run before commits.

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

- **Config:** `vitest.config.mts` - projects: default (jsdom) and storybook (browser/Playwright). Setup: `vitest.setup.ts` (e.g. `@testing-library/jest-dom`).
- **Test files:** `**/*.test.tsx` or `**/*.test.ts` next to the code.
- **Render:** Use the custom **`render`** from `src/test/test-utils.tsx`, which wraps the tree in **`NextIntlClientProvider`** with locale and default messages so that `useTranslations` works.
- **Reusable "base API" tests:** Use **`describeGeneralTests(Element, () => ({ render }))`** from `src/test/general-tests.tsx` to assert render, custom `className`, and custom props (see e.g. `SvgSprite.test.tsx`).
- **Run:** `pnpm test` (default project), `pnpm test:watch`, `pnpm test:project-storybook` for Storybook-based tests.

### Playwright (e2e)

- **Specs:** In **`e2e-tests/`** (e.g. `svg-sprite.spec.ts`).
- **Run:** `pnpm test:e2e`.

### Pre-commit / CI

- **Full check:** `pnpm check:precommit` runs format, lint, typecheck, translations, and tests (`test` + `test:e2e`). Keep this passing when adding features.

---

## 7. Libraries to be aware of

- **Next.js 16** - App Router, `[locale]` segment, server/client components.
- **next-intl** - i18n, routing, `useTranslations`, `getTranslations`, `NextIntlClientProvider`, middleware, typed messages/locales.
- **SVG sprites** - `svg-sprite` (build), `SvgSprite` component and `SvgSprite.generated.ts`, `public/sprite.svg`.
- **Vitest** - Unit/integration tests, jsdom and Storybook projects; custom render with next-intl.
- **Playwright** - E2E in `e2e-tests/`.
- **tailwind-variants** - CVA-compatible variant API (`tv`, `VariantProps`) plus **slots**; compose with CSS modules. Do not add CVA or Tailwind utilities.
- **es-toolkit** - Prefer `es-toolkit` (or `es-toolkit/compat` for lodash-shaped names) for helpers such as `get`, `isNil`, `omitBy`, `groupBy`, `debounce`, `omit`, `chunk`. Do not hand-roll these and do not add lodash (`eslint-plugin-depend` flags heavy duplicates). See usage in `src/app/[locale]/_styles/variables.ts` and `src/utils/next.ts`.
- **Zod** - Schemas for forms and env validation.
- **@tanstack/react-form** - Forms via `useAppForm` from `src/components/organisms/form/Form.utils.ts`. Do not add react-hook-form.
- **@tanstack/react-table** / **@tanstack/react-store** - Tables and related local UI state; extend the existing `DataTable` rather than inventing a parallel table stack.
- **@t3-oss/env-nextjs** - Typed env in `src/env.mjs`. Read `env`, not raw `process.env`, in application code.
- **react-use** - Prefer existing hooks (`useEffectOnce`, `useDebounce`, `useUpdateEffect`, …) before adding a new hook under `src/hooks/`.
- **DOMPurify** - Sanitize HTML strings (see `src/utils/trusted-types/`).
- **@floating-ui/react** - Dialogs, popovers, dropdowns, tooltips; compound components use its context and hooks.
- **React 19** - Current patterns (e.g. ref as prop, no legacy context API) are compatible.
- **TypeScript** - Strict mode; use types from the project (`LocaleType`, `SvgSpriteName`, `VariantProps<typeof X>`, `PolymorphicProps`, etc.).

Do **not** install Tailwind, CVA, shadcn, lodash, or react-hook-form as part of normal component work.

---

## 8. Checklist for new code

When adding features to this boilerplate (or a project created from it):

1. **Reuse first:** Prefer existing components (`Button`, `Dialog`, `Form`, `DataTable`, …) and place new UI in the correct atomic folder.
2. **Components:** One kebab-case folder per component, PascalCase files (`ComponentName.tsx` + styles/hooks/utils/types/tests/stories as needed); `export type Props`, `function Component`, export default `memo(Component)` (polymorphic: `as typeof Component`).
3. **Styling:** CSS modules + `tv` from tailwind-variants (slots when multi-part); design tokens via CSS variables; `addClassNameToProps` for `className`. No Tailwind utilities, CVA, or `cn()`.
4. **Utilities:** Use `es-toolkit` / `es-toolkit/compat` instead of custom or lodash helpers.
5. **Re-renders:** Use `memo` on components; use `useCallback` / `useMemo` where referential stability matters (e.g. props to memoized children, effect deps, render props).
6. **Compound components:** Prefer composition + context in `ComponentName.hooks.ts`; avoid prop drilling and huge prop lists.
7. **Forms / tables / env:** Zod + `useAppForm`; extend DataTable; read env from `src/env.mjs`.
8. **Icons:** Use `<SvgSprite name="…" />`; add new SVGs via `src/svg-sprites/` or `scripts/svg-sprite/constants.ts`, then `pnpm svg-sprite:build`.
9. **i18n:** Use `useTranslations` / `getTranslations`; add keys to every locale under `messages/`; run `pnpm check:translations`. No user-facing literal strings in components.
10. **Navigation:** Use `Link` / `redirect` / `useRouter` / `usePathname` from `@/i18n/navigation`, not raw Next.js navigation.
11. **Imports:** Prefer `@/` path aliases; keep `import type` separate.
12. **Client boundary:** `"use client"` only when needed; avoid effect-driven state sync from props.
13. **Tests:** Use `render` from `src/test/test-utils.tsx`; add `*.test.tsx` and/or e2e in `e2e-tests/` as appropriate.
14. **Scripts:** Before dev/build/typecheck, ensure sprite is built if SVGs changed (`pnpm svg-sprite:build`).

Following this document keeps the rest of the project aligned with the same design patterns as this boilerplate.
