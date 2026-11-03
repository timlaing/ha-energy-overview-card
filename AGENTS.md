# AGENTS.md

## Project

Maintained fork of Energy Overview Card, owned by @timlaing. Original author: Sebastian Schneider (@Sese-Schneider). Retain the original MIT copyright, history and acknowledgment.

## Repository authority

The original repository, `Sese-Schneider/ha-energy-overview-card`, is no longer maintained. Treat it as a historical reference for the original implementation and attribution.

This repository, `timlaing/ha-energy-overview-card`, is the primary maintained repository and the authoritative source for ongoing development, issues, pull requests, releases, documentation and support. Target this repository for all new work and links. Do not treat the original repository as the current source of truth or direct users there for maintenance.

Funding and active ownership metadata must point to Tim Laing (@timlaing). Keep `.github/FUNDING.yml`, `.github/CODEOWNERS`, package author/repository/homepage/bugs/funding fields, support contacts and current installation/release links aligned with this repository. Funding uses `https://github.com/sponsors/timlaing`. Original-author credits, copyright notices and historical changelog links are attribution, not active ownership metadata; retain them.

Preserve Sebastian Schneider's authorship acknowledgment, original MIT copyright and upstream Git history. This fork's authority does not imply ownership of the original author's copyright or endorsement by the original author.

## Scope and compatibility

- Keep `custom:energy-overview-card`, `energy-overview-card.js`, and existing valid YAML options compatible.
- Source lives in `src/`; generated output lives in `dist/` and is not committed.
- Prefer small, focused changes linked to issues. Do not change live Home Assistant systems without explicit authorization.
- Avoid relying on undocumented frontend elements where practical. Verify any internal APIs against the target stable frontend.
- Test missing/unavailable states, finite animation values, zero/negative power and multiple card instances for affected changes.
- Check phone, tablet and desktop layouts, light/dark themes, Masonry and Sections for UI changes.

## Development

Use Node 24 and Yarn 1.22.22. Run `yarn install --frozen-lockfile --ignore-scripts`, `npm run lint`, and `npm run build`. The inherited source has no automated test suite or coverage yet; issue #6 tracks this. Do not describe a build as runtime or browser verification.

## Repository conventions

Use Conventional Commit messages and PR titles. Populate `.github/PULL_REQUEST_TEMPLATE.md`, including validation and compatibility details. Keep credentials out of commits and workflow logs. Pin actions to full commit SHAs; grant job-level write permissions only where needed. Never execute pull request code in privileged metadata workflows. Do not rewrite published history or bypass protections without explicit authorization.

## Releases

Follow CONTRIBUTING.md. Releases require explicit maintainer action; a push must not publish. Do not claim current Home Assistant or HACS compatibility until the exact release artifact is tested. Update user documentation when behavior changes.
