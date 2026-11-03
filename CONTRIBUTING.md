# Contributing

Open an issue in timlaing/ha-energy-overview-card before a substantial change. Use focused branches and Conventional Commit titles (`fix:`, `feat:`, `docs:`, `build:`, `ci:`, `test:`). Pull requests must describe the resulting behavior, relevant validation and any configuration changes using the PR template.

## Development

Use Node.js 24 LTS and Yarn Classic 1.22.22:

```sh
npm install --global yarn@1.22.22 --ignore-scripts
yarn install --frozen-lockfile --ignore-scripts
npm run lint
npm run build
```

The generated module is `dist/energy-overview-card.js`. To develop against a test Home Assistant instance, serve/copy that file as a dashboard JavaScript module and reload resources. Avoid loading the upstream module at the same time.

The dependency/tooling migration and test coverage are tracked in issue #6. The inherited build is checked separately from real frontend behavior. There is no automated test/coverage claim at this stage.

## Validation

Preserve existing valid YAML and the public card type. For UI changes check entity add/select/reorder/delete/save, browser console errors, narrow and wide cards, multiple instances, light/dark, Masonry and Sections. For measurement changes check missing/unavailable states, W/kW, locale/precision, power factor, and zero/negative/inverted motion. Record exact Home Assistant/frontend/browser versions and whether verification used mocks or a running system.

## Repository automation

CI builds and lints the inherited source with a frozen lockfile. PRs also validate the HACS manifest, built artifact and module syntax locally. This is package validation, not proof that HACS can install the remote repository. CodeQL scans JavaScript/TypeScript; Dependabot covers npm and Actions. Metadata workflows label issues/PRs and validate titles without executing PR code. Stale issues are marked after 60 days and closed after another 14; PRs use 30 + 14 days. `keep-open`, security and high-priority items, milestones and draft PRs are exempt. Closing as stale does not mean fixed.

The connected SonarQube Cloud service reports automatic PR analysis. Meaningful LCOV coverage remains tracked in issue #6. Verify analysis for the final commit; a passing gate does not establish test coverage.

## Releases

A push to main never publishes a release. Once issue #7 is complete, update package.json and CHANGELOG.md in a reviewed PR, then create a GitHub release tagged `v<package version>` from main. Start with a prerelease when validation is incomplete. The release workflow checks version/tag agreement, builds the tagged revision and attaches `energy-overview-card.js`. It does not publish to npm. After upload, a separate read-only job runs the full HACS validator against the exact release tag. The local `.github/actions/hacs` wrapper pins the public validator image by digest; verify its OCI source revision when updating it. It cannot run successfully on pre-release-development branches with no committed bundle or release asset. Do not move existing upstream tags.

Verify the downloaded asset and install it through HACS as a custom repository before declaring HACS support. Record tested versions and known limitations in the README/release notes. Preserve upstream historical changelog entries and the MIT attribution.

Main should require a reviewed PR with resolved threads, current CI, and CodeQL, and block branch deletion and force pushes. Administration settings are maintained on GitHub; a workflow file alone does not enforce them.
