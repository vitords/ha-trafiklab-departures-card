# ha-trafiklab-departures-card

A Home Assistant Lovelace card for displaying public transport departures from the [Trafiklab integration](https://github.com/MrSjodin/HomeAssistant_Trafiklab_Integration).

## Features

- Shows upcoming departures from a single Trafiklab sensor
- Filter departures by transport mode, line number, destination, platform, or direction
- Per-group line colors with auto-contrasting text
- Multiple visual themes
- Configurable column layout
- Arrival animations with configurable target (icon, countdown, or whole row)
- Visual config editor

## Installation via HACS

1. In HACS → Integrations, add this repository as a custom repository (category: **Dashboard**)
2. Install **Trafiklab Departures Card**
3. Hard-refresh your browser

## Manual installation

1. Download `ha-trafiklab-departures-card.js` from the [latest release](https://github.com/vitords/ha-trafiklab-departures-card/releases)
2. Copy it to `/config/www/`
3. In HA → Settings → Dashboards → Resources, add `/local/ha-trafiklab-departures-card.js` (type: JavaScript module)

---

## Configuration reference

### Top-level options

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `entity` | string | **required** | Trafiklab sensor entity ID, e.g. `sensor.ulriksdal_departures_upcoming_departures` |
| `title` | string | `"Departures"` | Card title shown in the header |
| `icon` | string | `"mdi:bus-clock"` | MDI icon shown next to the title |
| `show_header` | boolean | `true` | Show or hide the card header |
| `show_list_header` | boolean | `false` | Show column label row above departures |
| `show_realtime_badge` | boolean | `false` | Show an `RT` badge next to destinations with live data |
| `orientation` | `vertical` / `horizontal` | `vertical` | Layout direction |
| `theme` | string | `basic` | Visual theme — see [Themes](#themes) |
| `departures_to_show` | number | `5` | Maximum number of departure rows to display |
| `sort_departures` | boolean | `false` | Sort all departures by time across groups |
| `layout` | list of column keys | see [Columns](#columns) | Which columns to show and in what order |
| `departure_animation` | string | none | Animation played on arriving departures — see [Animations](#animations) |
| `animate_target` | string | `icon-time` | Which part of the row to animate — see [Animations](#animations) |
| `departure_animation_duration` | number | preset default | Duration override in milliseconds |
| `arrival_time_offset` | number | `2` | Minutes before departure to trigger the animation |
| `lines` | list | `[{}]` | Line group definitions — see [Line groups](#line-groups) |

---

### Themes

| Value | Description |
|-------|-------------|
| `basic` | Default HA card style |
| `black-white` | Black background, white text, monospace font |
| `blue-ocean` | Dark blue background, white text |
| `cappucino` | Warm beige tones, coloured left border per line |
| `table` | Bordered rows, useful for the horizontal orientation |

---

### Columns

The `layout` key accepts a list of column identifiers. The default layout is:

```yaml
layout:
  - icon
  - line
  - destination
  - platform
  - time-diff
  - planned-time
  - delay
```

Available columns:

| Key | Description |
|-----|-------------|
| `icon` | Transport mode icon (bus, train, tram…) |
| `line` | Coloured line badge |
| `destination` | Destination name |
| `platform` | Platform or stop number (centered) |
| `time-diff` | Countdown: `Now`, `4m`, or `HH:MM` for >60 min |
| `planned-time` | Scheduled departure time (HH:MM) |
| `estimated-time` | Estimated departure time (HH:MM) |
| `delay` | Delay in minutes, coloured green/red |

---

### Animations

Set `departure_animation` to one of the following values. The animation plays on rows where the countdown is within `arrival_time_offset` minutes.

| Value | Description |
|-------|-------------|
| `flash` | Opacity pulse (3 s loop) |
| `bounce` | Vertical bounce (1 s loop) |
| `shakeX` | Horizontal shake (0.8 s loop) |
| `shakeY` | Vertical shake (0.8 s loop) |
| `fadeIn` | Fade in repeatedly (2 s loop) |
| `fadeOut` | Fade out repeatedly (2 s loop) |
| `zoomIn` | Scale up from 50% (2 s loop) |

Use `animate_target` to control which part of the row animates:

| Value | Description |
|-------|-------------|
| `icon-time` | Icon and countdown (default) |
| `time` | Countdown only |
| `icon` | Icon only |
| `row` | The entire departure row |

---

### Line groups

The `lines` key is a list of groups. Each group defines:
- a filter (which departures belong to this group)
- display settings (color, name override)

Departures are matched to the **first** group whose filter they satisfy. Departures that match no group are hidden.

If `lines` is omitted or empty, all departures are shown in the default color.

#### Line group options

| Key | Type | Description |
|-----|------|-------------|
| `line_color` | string | Hex color for the line badge, e.g. `"#c0392b"` |
| `line_name` | string | Override the line name displayed in the badge |
| `icon` | string | Override the transport mode icon |
| `filter.transport_mode` | string or list | `BUS`, `TRAIN`, `METRO`, `TRAM`, `BOAT`, `TAXI` |
| `filter.line` | string or list | Line number(s), e.g. `"7"` or `["1", "4", "7"]` |
| `filter.destination` | string or list | Case-insensitive substring(s) matched against destination — any match passes (OR logic) |
| `filter.platform` | string or list | Exact platform/stop number(s), e.g. `"3"` or `["1", "2"]` |
| `filter.direction` | string | Direction value from the sensor (`"0"` or `"1"`) |

---

## Examples

### Minimal — show all departures

```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
```

### All buses in red

```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
title: Buses from Ulriksdal
lines:
  - line_color: "#c0392b"
    filter:
      transport_mode: BUS
```

### Trains going north vs south

```yaml
# Card 1 — northbound
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
title: Train → Stockholm
lines:
  - line_color: "#1565c0"
    filter:
      transport_mode: TRAIN
      destination: Stockholm

# Card 2 — southbound
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
title: Train → Solna
lines:
  - line_color: "#1565c0"
    filter:
      transport_mode: TRAIN
      destination: Solna
```

### Mixed card — buses and trains with different colors

```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
title: Ulriksdal
departures_to_show: 10
sort_departures: true
lines:
  - line_color: "#c0392b"
    filter:
      transport_mode: BUS
  - line_color: "#1565c0"
    filter:
      transport_mode: TRAIN
```

### Filter by specific lines only

```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
title: Lines 505 & 509
lines:
  - line_color: "#c0392b"
    filter:
      line:
        - "505"
        - "509"
```

### Filter by platform and destination

```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
title: Platform 3 — northbound
lines:
  - line_color: "#1565c0"
    filter:
      transport_mode: TRAIN
      platform: "3"
      destination:
        - Stockholm
        - Arlanda
```

### Custom columns and theme

```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
theme: cappucino
show_list_header: true
layout:
  - icon
  - line
  - destination
  - time-diff
  - delay
lines:
  - line_color: "#8B4513"
```

### With arrival animation

```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
departure_animation: flash
animate_target: icon-time   # icon-time | time | icon | row
arrival_time_offset: 3
departure_animation_duration: 1500  # ms, omit to use preset default
lines:
  - line_color: "#c0392b"
    filter:
      transport_mode: BUS
  - line_color: "#1565c0"
    filter:
      transport_mode: TRAIN
```
