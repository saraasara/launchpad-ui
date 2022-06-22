# Tech Stack

## Design Tokens

Design tokens are platform-agnostic design decisions that encapsulate our brand. They are the foundation to building user interfaces and new experiences. We write tokens in [yaml syntax](https://yaml.org/) for its readability and brevity.

### Transforms

We use [Style Dictionary](https://amzn.github.io/style-dictionary/#/) to transform tokens into CSS custom properties, ES modules, and CommonJS modules.

## Icons

Our icons are commited as SVGs and then transformed during builds into React components using [SVGR](https://react-svgr.com/).

## Components

Our components are built using [React](https://beta.reactjs.org/). React is simple to use and has strong TypeScript support, making it easy to encapsulate state and expose functionality through properties for components. We use [TypeScript](https://www.typescriptlang.org/) to write cleaner code and provide strong editor integration for consumers of our components. Our styles are written in CSS and live alongside components. Plain CSS offers the best long-term caching and its latest features help address many of the issues CSS frameworks seek to solve, without a cost to performance.

## Package Manager

We use [pnpm](https://pnpm.io/) as our package manager for its speed, space efficiency, and strong monorepo support.

## Development

We use [Storybook](https://storybook.js.org/) to build and test our components in isolation. It also provides us a means to document and communicate component API to engineers through story examples and args tables.

## Build

Our packages are built using [esbuild](https://esbuild.github.io/) for its speed, tree shaking of modules, and flexible API. Packages are built in ESM and CJS formats. Our CSS is processed, transformed, and minified using [@parcel/css](https://github.com/parcel-bundler/parcel-css). It is performant, applies vendor prefixes, and supports modern features (such as CSS nesting and custom media queries). Type declarations are emmitted using the TypeScript compiler.

[Nx](https://nx.dev/) is used to run lint, test, and build scripts on only the packages affected by code changes. Its speed, caching abilities, and project graph features make it ideal for our project.

## Test

We use [Vitest](https://vitest.dev/) to run our unit tests as it is Jest compatible, supports ESM and TypeScript by default, generates [c8](https://github.com/bcoe/c8) code coverage, and provides an instant watch mode. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is used to test our React components and write tests that closely resemble how a user would interact with our components.

To verify component server-side rendering support we use a [Remix](https://remix.run/) playground app to integrate our components into. Powered by esbuild, Remix builds are speedy, making it a great choice for local and CI environments. [Playwright](https://playwright.dev/) is used to verify SSR support by running tests across headless versions of Chromium, WebKit, and Firefox.

## Code Style

We use [ESLint](https://eslint.org/) and [Stylelint](https://stylelint.io/) to highlight problems in our code and [Prettier](https://prettier.io/) to format it to be consistent across the repo.

## Git

Commits, branch names, and pull request titles follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) to create an explicit commit history and communicate intent/scope of changes to consumers.

## Version and Release

We use [Changesets](https://github.com/changesets/changesets) for versioning and releasing our packages. It empowers contributors to declare how their changes should be released via a `changeset`, a markdown file containing semver bump types with a summary of the changes made. The tool is able to process these changesets to update package versions and changelogs.