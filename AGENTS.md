# AI agent guide

This repo is a **Next.js 16 boilerplate** used as a template for iO Ghent projects. It ships with shared UI components, i18n, and conventions. After installation, projects extend it by adding features and new components following the same patterns.

## What this repo is

- **Next.js 16** (App Router), TypeScript, **next-intl** for i18n.
- **Component library** in `src/components/`: atoms, molecules, organisms, blocks, utils. Styling: **tailwind-variants** (CVA) + **CSS modules** (vanilla CSS with PostCSS).
- **Storybook** for components; **Vitest** + **Jest** for tests. **PNPM** preferred.

## Agent skills (use when modifying or creating code)

When writing or changing code, **read and apply** the project skills in **`.agents/skills/`**:

- **vercel-react-best-practices** – React/Next.js performance (data fetching, bundle, server, client, rerenders, rendering). Use when implementing or refactoring components, pages, or app logic. Index: `.agents/skills/vercel-react-best-practices/SKILL.md`; full guide: `AGENTS.md` or `rules/*.md`.
- **vercel-composition-patterns** – Component architecture, composition, compound components, avoid boolean props, React 19. Use when designing or refactoring component APIs. Index: `.agents/skills/vercel-composition-patterns/SKILL.md`; full guide: `AGENTS.md` or `rules/*.md`.
- **web-design-guidelines** – UI/a11y/design review. Use when reviewing interfaces or accessibility. See `.agents/skills/web-design-guidelines/SKILL.md`.

The Cursor rule **`.cursor/rules/agent-skills.mdc`** is always applied and instructs the agent to use these skills.

## Where to look

| Concern                          | Location                                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| Project overview & conventions   | `.cursor/rules/project-overview.mdc` (always applied)                                   |
| Agent skills (when writing code) | `.cursor/rules/agent-skills.mdc` (always applied), `.agents/skills/`                    |
| Creating/editing components      | `.cursor/rules/components.mdc`                                                          |
| Unit tests                       | `.cursor/rules/testing.mdc`                                                             |
| i18n / translations              | `.cursor/rules/i18n.mdc`                                                                |
| App routes & layout              | `src/app/` (locale segment: `[locale]`)                                                 |
| i18n config                      | `src/i18n/` (request, routing, constants, navigation, types)                            |
| Translation JSON                 | `messages/{locale}/common.json`, `messages/{locale}/app.json`                           |
| SVG sprites                      | `scripts/svg-sprite/`, `src/components/atoms/svg-sprite/`                               |
| Shared styles / theme            | `src/app/[locale]/_styles/base.css`                                                     |
| Test helpers                     | `src/test/test-utils.tsx` (render), `src/test/general-tests.tsx` (describeGeneralTests) |

## Conventions (summary)

- **Components**: Use `export default` and wrap with `memo()` where appropriate. Write with performance in mind: no unnecessary rerenders; use `useCallback`/`useMemo` for stable props passed to memoized children; minimize `"use client"`. Use CVA via `tailwind-variants` with slots/variants; styles live in `*.styles.ts` (and optional `*.module.css`). Use `addClassNameToProps()` from `@/utils/styles` when merging `className`.
- **i18n**: Use `useTranslations(namespace)` (e.g. `"common.button"`). For links, use `Link`, `usePathname`, `useRouter` from `@/i18n/navigation`, not `next/link`. Add new keys to `messages/{locale}/common.json` or `app.json` and run `next typegen` so types stay in sync.
- **Storybook**: Story titles follow `UI/{Layer}/{Name}` (e.g. `UI/Atoms/Button`, `UI/Molecules/Card`).
- **Unit tests**: All components must have at least basic tests. Co-locate `ComponentName.test.tsx`; use `describeGeneralTests` from `@/test/general-tests` and `render` from `@/test/test-utils`. See `.cursor/rules/testing.mdc`.

For full details and examples, use the rule files in `.cursor/rules/`.
