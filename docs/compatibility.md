# Compatibility verification

## Development changes

The compatibility branch replaces obsolete Polymer editor controls, awaits HA form loading through `window.loadCardHelpers()`, handles missing/unavailable measurements, bounds animation inputs (durations from 1 ms to one day to keep SMIL clock syntax valid), removes shared SVG path IDs and unsafe HTML construction, wraps narrow layouts and adds Masonry/Sections sizing. Existing card type, filename, options and CSS class hooks are retained. No fork release has been published.

The frontend loading contract was checked against Home Assistant frontend **20260930.5** (`hui-button-card`, its editor, `ha-form` and card helpers). This is source verification, not a running frontend test. The matching stable Core baseline at investigation was **2026.10.4**. A beta has not been tested.

## Automated checks

Real headless Chromium runs source tests with mocked HA data/form contracts. Tests cover sensor state/precision/locale handling, W/kW/BTU conversion, power factor, signed/inverted/stopped motion, multiple cards, HTML escaping, empty/add/select/move/delete/reopen editor behavior, keyboard selection, cold loading/retry and widths from 180 to 1280 pixels. Coverage is source-mapped V8 coverage in `coverage/lcov.info`.

The production ES module is separately built and checked for HACS manifest/asset agreement and JavaScript module syntax. Runtime and development dependencies are audited together. A clean audit does not prove frontend compatibility.

## Release verification still needed (issue #7)

- Install the exact built module into a test HA instance on a pinned stable frontend/Core pair; test an available beta separately.
- Exercise real entity, icon, select, boolean and number selectors after a cold browser start on a dashboard with no button/entities cards.
- Check save/reopen and YAML/GUI switching, browser console errors, Masonry and Sections sizing, touch/keyboard behavior and light/dark themes on phone/tablet/desktop.
- Publish only with explicit maintainer authorization, then download and verify the release asset and install through HACS as a custom repository.
- Keep prerelease local/package validation separate from stable remote HACS validation.

No live Home Assistant configuration was changed by these development tests.
