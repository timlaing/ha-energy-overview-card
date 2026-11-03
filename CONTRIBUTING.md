# Contributing

Open an issue in timlaing/ha-energy-overview-card before a substantial change. Use focused branches and Conventional Commit titles (`fix:`, `feat:`, `docs:`, `build:`, `ci:`, `test:`). Pull requests must describe the resulting behavior, relevant validation and any configuration changes using the PR template.

## Development

Use Node.js 24 LTS and the committed npm lockfile:

```sh
npm ci --ignore-scripts
npm run check
npm run build
npx --no-install playwright install chromium
npm run test:coverage
```

The generated module is `dist/energy-overview-card.js`. To develop against a test Home Assistant instance, serve/copy that file as a dashboard JavaScript module and reload resources. Avoid loading the upstream module at the same time.

Vitest runs real Chromium tests for the card/editor, sensor handling, motion, loading and responsive layout. Home Assistant data and forms are mocked; these tests do not establish live frontend or HACS installation compatibility. V8 coverage is mapped to `src/` and exported to `coverage/lcov.info`. See [docs/compatibility.md](docs/compatibility.md) for the verification boundary.

## Validation

Preserve existing valid YAML and the public card type. For UI changes check entity add/select/reorder/delete/save, browser console errors, narrow and wide cards, multiple instances, light/dark, Masonry and Sections. For measurement changes check missing/unavailable states, W/kW, locale/precision, power factor, and zero/negative/inverted motion. Record exact Home Assistant/frontend/browser versions and whether verification used mocks or a running system.

## Repository automation

CI uses `npm ci --ignore-scripts`, typechecks/lints/builds the card, runs Chromium tests with source coverage and audits runtime and development dependencies. PRs also validate the HACS manifest, built artifact and module syntax locally. This is package validation, not proof that HACS can install the remote repository. CodeQL scans JavaScript/TypeScript; Dependabot covers npm and Actions. Metadata workflows label issues/PRs and validate titles without executing PR code. Stale issues are marked after 60 days and closed after another 14; PRs use 30 + 14 days. `keep-open`, security and high-priority items, milestones and draft PRs are exempt. Closing as stale does not mean fixed.

The connected SonarQube Cloud service currently reports automatic PR analysis. Local/CI LCOV is available, but wiring that file into SonarQube requires switching the connected project to CI analysis; do not claim automatic analysis imported it. Verify analysis for the final commit; a passing gate alone does not establish coverage.

`minimatch` is temporarily overridden to 11.0.1 to fix GHSA-g3hv-75wg-m249 in the lint toolchain. Remove the override when ESLint/typescript-eslint resolve a patched version themselves. Lint and browser tests must pass when changing the override.

## Releases

A push to main never publishes a release. Once issue #7 is complete, update package.json and CHANGELOG.md in a reviewed PR, then create a GitHub release tagged `v<package version>` from main. Start with a prerelease when validation is incomplete. The release workflow checks version/tag agreement, builds the tagged revision and attaches `energy-overview-card.js`. It does not publish to npm. Prereleases run the build, local package and module-syntax checks and upload the asset, but skip remote HACS validation: the pinned HACS validator excludes prerelease assets. For stable releases, a separate read-only job runs full HACS validation against the exact release tag after upload. Promoting a prerelease to stable triggers the `released` event, rebuilds the tagged asset and runs remote validation. Initial stable publication also uses `released`; its accompanying `published` event is skipped to avoid duplicate uploads. The local `.github/actions/hacs` wrapper pins the public validator image by digest; verify its OCI source revision when updating it. It cannot run successfully on pre-release-development branches with no committed bundle or release asset. Do not move existing upstream tags.

Verify the downloaded asset and install it through HACS as a custom repository before declaring HACS support. Record tested versions and known limitations in the README/release notes. Preserve upstream historical changelog entries and the MIT attribution.

Main should require a reviewed PR with resolved threads, current CI, and CodeQL, and block branch deletion and force pushes. Administration settings are maintained on GitHub; a workflow file alone does not enforce them.
