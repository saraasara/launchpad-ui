# @launchpad-ui/lozenge

## 0.1.5

### Patch Changes

- [#40](https://github.com/launchdarkly/launchpad-ui/pull/40) [`69c5602`](https://github.com/launchdarkly/launchpad-ui/commit/69c56021b0815e2da5861a696de0453447958cf0) Thanks [@Niznikr](https://github.com/Niznikr)! - Update unknown custom properties:

  - Add `stylelint-value-no-unknown-custom-properties` to check for unknown custom props
  - Pull in vars from all stylesheets

## 0.1.4

### Patch Changes

- [#35](https://github.com/launchdarkly/launchpad-ui/pull/35) [`ed49480`](https://github.com/launchdarkly/launchpad-ui/commit/ed494805b41e86019fb31483ef3e880313f88f4e) Thanks [@Niznikr](https://github.com/Niznikr)! - Build packages first for release

- Updated dependencies [[`ed49480`](https://github.com/launchdarkly/launchpad-ui/commit/ed494805b41e86019fb31483ef3e880313f88f4e)]:
  - @launchpad-ui/tokens@0.1.2

## 0.1.3

### Patch Changes

- [#34](https://github.com/launchdarkly/launchpad-ui/pull/34) [`f335140`](https://github.com/launchdarkly/launchpad-ui/commit/f335140f2a29b900f93f8b9c2f8df1430e373c1a) Thanks [@Niznikr](https://github.com/Niznikr)! - Add alert package:

  - Add alert code, stories, and tests
  - Add icons `Close` and `ExpandMore`
  - Add stylelint to lint CSS
  - Use [@parcel/css](https://github.com/parcel-bundler/parcel-css) to transform and minify styles

## 0.1.2

### Patch Changes

- [#26](https://github.com/launchdarkly/launchpad-ui/pull/26) [`871c5c7`](https://github.com/launchdarkly/launchpad-ui/commit/871c5c7ed9e8910e4f17932e9e64dfd0e6b19261) Thanks [@Niznikr](https://github.com/Niznikr)! - Add React 18 support

## 0.1.1

### Patch Changes

- [#24](https://github.com/launchdarkly/launchpad-ui/pull/24) [`19c7ebe`](https://github.com/launchdarkly/launchpad-ui/commit/19c7ebef9229c1a2bdd34a2a43a0331ddeae5284) Thanks [@Niznikr](https://github.com/Niznikr)! - Add READMEs

- Updated dependencies [[`19c7ebe`](https://github.com/launchdarkly/launchpad-ui/commit/19c7ebef9229c1a2bdd34a2a43a0331ddeae5284)]:
  - @launchpad-ui/tokens@0.1.1

## 0.1.0

### Minor Changes

- [#16](https://github.com/launchdarkly/launchpad-ui/pull/16) [`f6ec504`](https://github.com/launchdarkly/launchpad-ui/commit/f6ec504ba6ce9d4cb12c82c627fbc29480d75171) Thanks [@Niznikr](https://github.com/Niznikr)! - Add lozenge package:

  - Add lozenge code, stories in [CSF 3.0](https://storybook.js.org/blog/component-story-format-3-0/) format, and tests for full coverage
  - Process CSS separately in esbuild script to [keep the import statement in the component](https://esbuild.github.io/content-types/#css-from-js)

### Patch Changes

- [#22](https://github.com/launchdarkly/launchpad-ui/pull/22) [`9add6fd`](https://github.com/launchdarkly/launchpad-ui/commit/9add6fde9c61325a34039d33e7a3e3362daaa072) Thanks [@Niznikr](https://github.com/Niznikr)! - Set tokens as direct dependency

* [#17](https://github.com/launchdarkly/launchpad-ui/pull/17) [`a11258e`](https://github.com/launchdarkly/launchpad-ui/commit/a11258ed0acdd53e74970ca0fe9c26318344271c) Thanks [@Niznikr](https://github.com/Niznikr)! - Include styles in exports

* Updated dependencies [[`e6e3f62`](https://github.com/launchdarkly/launchpad-ui/commit/e6e3f6278411792b20aaaf2d7eb0d213184ecc32), [`a11258e`](https://github.com/launchdarkly/launchpad-ui/commit/a11258ed0acdd53e74970ca0fe9c26318344271c)]:
  - @launchpad-ui/tokens@0.1.0