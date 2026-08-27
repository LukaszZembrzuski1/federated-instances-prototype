Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
 and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.2]
### Deprecated
* [REL-1324347] Repository is deprecated and no longer maintained — MFE development has moved to [relativityone/mfe-framework](https://github.com/relativityone/mfe-framework). Updated `README.md` to route users to the new repo and set `catalog-info.yaml` lifecycle to `deprecated`. This repository will be archived.

## [1.4.1]
### Updated
* [REL-1279606, REL-1279607, REL-1279608] Upgraded vite and @vitejs/plugin-react to resolve a vulnerability

## [1.4.0]
### Updated
* [REL-1276667] Upgraded Node.js to Active LTS v24.14.1 — updated `.nvmrc`, `package.json` engines (`>= 24`), and regenerated `package-lock.json`.
* GitHub Actions: bumped `actions/checkout` to `v6`, `actions/setup-node` to `v6`, `jfrog/setup-jfrog-cli` to `v4`, and set `node-version: '24'` across all workflows.

## [1.3.0]
### Added
* [REL-1267929] Local API communication for development: OAuth2 client_credentials flow and dev proxy.
  * **Dev auth plugin** (`vite-plugins/devAuthPlugin.ts`): On `npm run dev`, fetches an access token from `{DEV_API_BASE}Relativity/Identity/connect/token` using `CLIENT_ID` and `CLIENT_SECRET` from `.env`; token is kept in Node only (never in the client bundle).
  * **Relativity proxy**: Proxies multiple path prefixes to the dev instance with `Authorization: Bearer <token>`: `/relativity.rest`, `/Relativity.Rest`, `/Relativity.REST`, `/Relativity`, `/releye`. Base URL is normalized so `DEV_API_BASE` works with or without a trailing slash.
  * **`.env.example`**: Template with `CLIENT_ID`, `CLIENT_SECRET`, and `DEV_API_BASE` for team onboarding.
  * **Dev Auth Onboarding** (`docs/DEV_AUTH_ONBOARDING.md`): Guide for creating `.env`, configuring OAuth2 client credentials, running the dev server, and troubleshooting token/401 issues.

### Updated
* **`.gitignore`**: Ignore `.env.local` and `.env.*.local` in addition to `.env`.
* **Vite config**: Register `devAuthPlugin()` and `proxy: createRelativityProxy()` so the dev server uses the new auth and proxy (no impact on production builds).

## [1.2.1]
### Updated
* [REL-1241642] Bump `react-router` to 7.12.0 to resolve vulnerability.

## [1.2.0]
### Changed
* Migrated testing framework from Vitest to Jest
* Updated test script to use `jest --watch` instead of `vitest --mode=test`

### Added
* Jest configuration (`jest.config.cjs`) with TypeScript support via ts-jest
* Jest TypeScript configuration (`tsconfig.jest.json`) for test compilation
* Jest test setup file (`src/__mocks__/jest.setup.ts`) to suppress jsdom CSS parsing errors
* Jest mocks for CSS files (`src/__mocks__/cssMock.cjs`, `src/__mocks__/cssTransform.cjs`)
* Jest mock for static assets (`src/__mocks__/fileMock.js`)
* Jest dependencies: `jest`, `@jest/globals`, `@types/jest`, `jest-environment-jsdom`, `ts-jest`, `identity-obj-proxy`
* Husky with pre-commit hook to run circular dependency checks before commits
* Madge for circular dependency detection with `check:circular-deps` script
* Mock implementation for `virtual:__federation__` module to enable testing of components that use module federation (e.g., RelativityIcons)
* Path aliases (`@/*` for source files, `@test` for test files) configured in TypeScript, Vite, and Jest
* Prettier package as a dev dependency (was missing, only the plugin was installed)
* `relativity-ui` package as a dependency to replace PrimeReact components

### Removed
* Vitest and Vitest configuration (`vitest.config.ts`)
* Vitest dependency from package.json

### Updated
* Test file (`src/__tests__/App.test.tsx`) to use Jest globals instead of Vitest imports
* TypeScript configuration to include Jest types in `tsconfig.app.json`
* TypeScript node configuration (`tsconfig.node.json`) to add React/React-DOM path aliases for proper module resolution
* Vite configuration to remove Vitest reference, add React/React-DOM deduplication, and explicit React/React-DOM path aliases
* Removed unused PrimeReact `Image` component import, replaced with native `img` tag in `MFE.tsx`
* Removed unused `Messages` component, `useRef` hook, and search handler from `PrimeReact.tsx`
* Updated `relativity-ui` dependency from `^0.0.73` to `^0.2.2`
* Improved Prettier configuration with import sorting plugin (`@trivago/prettier-plugin-sort-imports`) to automatically organize imports
* Updated dependencies: React and React DOM to 19.2.0, updated ESLint, testing libraries, and other dev dependencies
* Improved file structure with better organization of components, utilities, types, and tests
* Configured VS Code to use TypeScript from `node_modules` instead of IDE bundled version
* Configured Prettier as default formatter for JavaScript, TypeScript, JSX, TSX, CSS, and SCSS files in VS Code settings
* Optimized Jest performance with caching, parallel execution (`maxWorkers: 50%`), and test path ignore patterns
* Updated test script to use `--onlyChanged` flag for faster watch mode execution
* Added `test:ci` script for CI environments with coverage and limited workers
* Optimized TypeScript Jest configuration with `skipLibCheck` for faster compilation

## [1.1.2]
### Updated
* [REL-1224059] Remove duplicate tag-commit step in actions.

## [1.1.1]
### Updated
* [REL-1219832] Update asset map documentation.

## [1.1.0]
### Updated
* [REL-1188204] Update for progressive rollout to cdn.

## [1.0.26]
### Updated
- [REL-1208083] Bump `relativity-foundation-react` and `relativity-foundation-core` to latest (v.2.0.10)

## [1.0.25]
### Updated
- [REL-1192694] Add prettier configuration with suggested vscode setting configuration

## [1.0.24]
### Updated
* [REL-1191845] Update Registering and Exposing Modules documentation.

## [1.0.23]
### Updated
* [REL-1183283] Fix dev mode by adding foundation core to dev dependency and updating foundation config.

## [1.0.22]
### Updated
* [REL-1173844] Add React error boundary and foundation's structured logging examples.

## [1.0.21]
### Updated
* [REL-1173844] Reorganize docs folder to properly build Backstage/Roadie docs.

## [1.0.20]
### Added
* [REL-1122617] Added links to CDN documentation.

## [1.0.19]
### Updated
* [REL-1147382] Add a getting started guide and minimum documentation needed for Roadie/Backstage docs.

## [1.0.18]
### Updated
* [REL-1146592] Updated react and react-dom to version 19.1.0.

## [1.0.17]
### Updated
* [REL-1146592] Updated dedpendency config to align with relativity-foundation implementation.

## [1.0.16]
### Added
* [REL-1147381] Add foundation and relativity-theme.

## [1.0.16]
### Added
* [REL-1160670] Add and expose `Documentation` app that houses all pages and demo.

## [1.0.15]
### Added
* [REL-1129909] Added vitest debug launch.json

## [1.0.14]
### Updated
* [REL-1145929] Update deploy to CDN to overwrite.

## [1.0.13]
### Added
* [REL-1130037] Add loadDependency to window and example consumption [App4.tsx](/src/components/App4.tsx) and [documentation](./DEPENDENCY_CONSUMPTION.md)

## [1.0.12]
### Added
* [REL-1122614] Add PrimeReact page with examples and links to documentation.

## [1.0.11]
### Added
* [REL-1122616] Add MFE page with setup and dev instructions.

## [1.0.10]
### Added
* [REL-1103450] Add usage of `relativity-icons` via NF.

## [1.0.9]
### Updated
* [REL-1113680] Updated deploy to CDN action to use version 1.6.0. This includes adding a new secret for CDN_CLIENT_ID

## [1.0.8]
### Updated
* [REL-1111051] Add artifactory-setup-action

## [1.0.7]
### Updated
* Default include root to false when publishing to CDN. If the dist folder is included, the paths in the remoteEntry are incorrect.

## [1.0.6]
### Updated
* [REL-1101157] Changed GitHub Action to allow publish to CDN from main on dispatch workflow without requiring a version change.

## [1.0.5]
### Updated
* [REL-1101157] Changed CDN action version to 1.4.3

## [1.0.4]
### Added
* [REL-1101157] Added second app to demonstrate exposing multiple components

## [1.0.3]
### Updated
* [REL-1092992] Update CDN environment for job to be regression, also update references to loader to applet

## [1.0.2]
### Updated
* [REL-1092992] Update GHA to verify version.txt is modified before tag and publish. Fix cdn deploy on merge to main.

## [1.0.1]
### Updated
* [REL-1101175] Update `deploy-to-cdn` GHA params

## [1.0.0]
### Added
* [REL-1090319] Added version.txt, changelog, and updated actions to get secrets from Azure Key Vault