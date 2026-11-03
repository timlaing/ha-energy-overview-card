# Energy Overview Card

A Home Assistant dashboard card for live power, voltage, current, frequency and power factor, with animated power flow.

Maintained by [Tim Laing (@timlaing)](https://github.com/timlaing). This fork continues the original work by [Sebastian Schneider (@Sese-Schneider)](https://github.com/Sese-Schneider/ha-energy-overview-card). Thank you to Sebastian for creating the card and making it available under the MIT license. Original history, copyright and release notes are retained.

[![CI](https://github.com/timlaing/ha-energy-overview-card/actions/workflows/ci.yml/badge.svg)](https://github.com/timlaing/ha-energy-overview-card/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Compatibility

This fork starts from upstream v2.5.0. The development module has passed isolated browser checks on Home Assistant Core 2026.10.4 and 2026.11.0b4. The editor, unavailable-state handling, responsive layout and sizing have regression fixes in development; HACS release installation and physical-device checks are still outstanding. See [the compatibility issues](https://github.com/timlaing/ha-energy-overview-card/issues) and [release verification tracker #7](https://github.com/timlaing/ha-energy-overview-card/issues/7).

Existing `custom:energy-overview-card` YAML and the `energy-overview-card.js` filename are retained. See [verification details](docs/compatibility.md) before treating these development changes as release-ready.

**Features:**

- Variable amount of monitoring entities
- Voltage, Current, Power, Frequency and Power Factor display
- Automatic unit of measurement detection and ordering
- Adjustable names, colors, labels and icons
- Configurable dynamic animations adapting to power usage

_Three-phase power monitoring example:_

![](.github/assets/card.gif)

## Configuration

A graphical editor is included. It supports adding, selecting, moving and deleting entities, including starting with an empty card. If frontend forms fail to load, use Retry or the YAML editor.

After installation, press "Add Card", search for "Energy Overview", and configure it visually or use the YAML options below.

## Options

| Name      | Type               | Requirement  | Description                                                                                                           | Default    |
| --------- | ------------------ | ------------ | --------------------------------------------------------------------------------------------------------------------- | ---------- |
| type      | string             | **Required** | `custom:energy-overview-card`                                                                                         |            |
| entities  | Array<PowerEntity> | **Required** | List of power entities (see below)                                                                                    |            |
| animation | AnimationConfig    | _Optional_   | Animation configuration (see below)                                                                                   |            |
| order_by  | string             | _Optional_   | Value name of which to sort all entities. Options are: `power`, `voltage`, `current`, `frequency`, and `power_factor` | No sorting |
| title     | string             | _Optional_   | Title of the card                                                                                                     |            |

#### PowerEntity

| Name           | Type            | Requirement  | Description                        | Default                                |
| -------------- | --------------- | ------------ | ---------------------------------- | -------------------------------------- |
| power          | state entity    | **Required** | State entity for power             |                                        |
| voltage        | state entity    | _Optional_   | State entity for voltage           |                                        |
| current        | state entity    | _Optional_   | State entity for current           |                                        |
| frequency      | state entity    | _Optional_   | State entity for frequency         |                                        |
| power_factor   | state entity    | _Optional_   | State entity for power_factor      |                                        |
| name           | string          | _Optional_   | Name label                         |                                        |
| icon_leading   | string          | _Optional_   | Leading MD icon                    | `mdi:transmission-tower`               |
| icon_trailing  | string          | _Optional_   | Trailing MD icon                   | `mdi:home-lightning-bolt`              |
| label_leading  | string          | _Optional_   | Leading label                      |                                        |
| label_trailing | string          | _Optional_   | Trailing label                     |                                        |
| color          | string          | _Optional_   | CSS color                          | `var(--energy-grid-consumption-color)` |
| animation      | AnimationConfig | _Optional_   | Overwrite for the global animation |                                        |

#### AnimationConfig

| Name         | Type    | Requirement | Description                                                       | Default |
| ------------ | ------- | ----------- | ----------------------------------------------------------------- | ------- |
| power        | number  | _Optional_  | Wattage level at which the animation runs at `min_duration` speed | 1000    |
| min_duration | number  | _Optional_  | Minimum duration of the animation at `>= power W`                 | 1       |
| max_duration | number  | _Optional_  | Maximum duration of the animation at `> 0 W`                      | 10      |
| inverted     | boolean | _Optional_  | Inverts the animation direction                                   | false   |

### Example configuration

```yaml
type: custom:energy-overview-card
entities:
  - power: sensor.a_p
    current: sensor.a_c
    voltage: sensor.a_v
    power_factor: sensor.a_pf
    label_leading: "P"
    label_trailing: "L1"
    icon_leading: "mdi:transmission-tower"
    icon_trailing: "mdi:home-lightning-bolt"
    color: "#488fc2"
  - power: sensor.b_p
    current: sensor.b_c
    voltage: sensor.b_v
    power_factor: sensor.b_pf
    label_leading: "P"
    label_trailing: "L2"
    color: "#7dbff5"
    animation:
      power: 100
      min_duration: 2
      max_duration: 5
  - power: sensor.c_p
    current: sensor.c_c
    voltage: sensor.c_v
    frequency: sensor.c_fq
    power_factor: sensor.c_pf
    label_leading: "P"
    label_trailing: "L3"
    color: "#b1f2ff"
animation:
  power: 1000
  min_duration: 1
  max_duration: 10
```

## Installation

### HACS

This fork is a custom repository; it is not currently listed as a HACS default repository. After the first validated fork release is published:

1. Open HACS, select **Custom repositories**, and add `https://github.com/timlaing/ha-energy-overview-card` as a **Dashboard** repository.
2. Download Energy Overview Card and reload dashboard resources.
3. Add `custom:energy-overview-card` using the YAML example above.

Until that release exists, build the source for development as described in [CONTRIBUTING.md](CONTRIBUTING.md).

### Manual installation

After a fork release is available, download `energy-overview-card.js` from [this fork's releases](https://github.com/timlaing/ha-energy-overview-card/releases), copy it to `config/www/`, and register `/local/energy-overview-card.js` as a **JavaScript module** in dashboard resources. Reload the browser after changing resources.

### Migrating from the original repository

Keep your existing card YAML. Remove the original HACS installation/resource before loading this fork, then install this fork and refresh the browser. Both versions register the same custom element, so load only one copy. Keep a copy of the previous JavaScript file if you need to roll back.

## Contributing and support

Use [this fork's issues](https://github.com/timlaing/ha-energy-overview-card/issues) for bugs and feature requests. Include Home Assistant/frontend and card versions, a minimal YAML example, browser/device details and relevant console errors with secrets removed.

See [CONTRIBUTING.md](CONTRIBUTING.md) for development and releases, [SECURITY.md](SECURITY.md) for private vulnerability reporting, and [ACKNOWLEDGMENTS.md](ACKNOWLEDGMENTS.md) for attribution.

Support ongoing maintenance through [GitHub Sponsors (@timlaing)](https://github.com/sponsors/timlaing).
