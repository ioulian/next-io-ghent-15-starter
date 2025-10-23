# next-io-ghent-15-starter kit (Next.js v16) (App router)

This is a [Next.js](https://nextjs.org/) starter kit created to be used as a template to start new projects in iO Ghent campus. The idea behind is that you can directly start on working on your project instead of setting up Next.js first.

It contains a lot of useful presets and common components to be used in your project. Using latest technologies and dev tools we allow developers to focus on the project first.

## Features

- "Full" Typescript: All project code is written in Typescript where possible. Some other JS files are (where possible) also typed;
- Translations ([next-intl](https://github.com/amannn/next-intl)): Allow using intellisense (with TS) for translations and custom scripts to check if translations are complete. Both server and client components support using translations;
- Favicons: Using default metadata API from Next.js. Only a few specific sizes are needed. (Use <https://realfavicongenerator.net/> with <https://maskable.app/editor>);
- Avif/webm conversion of images (Provided by Next.js);
- Bundle analyser (Provided by Next.js);
- [NVM](https://github.com/nvm-sh/nvm) preset;
- .env variables (Provided by Next.js);
- [SVG Sprites](https://github.com/just-paja/svg-sprites/tree/master/packages/webpack-svg-sprite-loader) (Custom or with [Tabler icons](https://tabler-icons.io/)). SVG spritesheet is exported to .svg file;
- Font optimisation (Provided by Next.js);
- [Storybook](https://github.com/storybookjs/storybook) with a11y checks, next-intl support and Next.js support;
- Common components preset (with a11y in mind): <https://ioulian.github.io/next-ui-ghent-app-starter/>;
- ESLint, Prettier + Husky and lint-staged pre-commit hooks;
- Jest (by Next.js). Most custom components are tested;
- With [next-cache-toolbar](https://github.com/KajSzy/next-cache-toolbar) to easily debug cached api requests;
- Use with PNPM (preferred) or NPM;
- Translations checks with [i18n-check](https://github.com/lingualdev/i18n-check) (Custom checks are still under scripts if needed, as they will check source files too. Custom check can be removed when https://github.com/lingualdev/i18n-check/issues/36 will be fixed)
- Default security headers with CSP and NONCE
- Components:
  - Styled with vanilla css (CSS modules with postcss). Easily customizable.
  - Components are written with performance, a11y and DX in mind. Micro animations where needed. Each component is correctly memoized so no unneccessary rerenders happen. A lot of components work with compound components, so each part of a component is customizable.
  - Styles are managed with CVA using [tailwind-variants](https://github.com/heroui-inc/tailwind-variants). This library also supports slots for more complex components.

## Getting Started

Note: when using npm, patches will not be applied!

### Install

```bash
# PNPM
pnpm create next-app --example https://github.com/ioulian/next-io-ghent-15-starter
pnpm dev

# NPM
npx create-next-app --example https://github.com/ioulian/next-io-ghent-15-starter
npm run dev
```

After installation, you'll probably want to use correct node version and install dependencies again.

```bash
# PNPM
nvm use && pnpm install

# NPM
nvm use && npm install
```

### Storybook

```bash
# PNPM
pnpm storybook

# NPM
npm run storybook
```

### Remove demo content

- Remove content from `src/app/[locale]/page.tsx` and remove folders: `src/app/[locale]/serverside`, `src/app/[locale]/auth-only` and `src/app/[locale]/_components`

## Go live checklist

There are some basic GO-live checks implemented when you run `pnpm build`, but these files should be checked:

- `.env`
- Meta: `src/app/apple-icon.png`, `src/app/favicon.ico`, `src/app/icon.png`, `src/app/manifest.ts`
- `src/middleware.ts` check if the i18n locales match with the config

## Issues/TODO's

Issues and TODO's can be found here: <https://github.com/ioulian/next-io-ghent-15-starter/issues>

## Component export convention

We use `export default` in an component, see discussion here: <https://esdiscuss.org/topic/moduleimport>
