# ha-trafiklab-departures-card

A Home Assistant Lovelace card for displaying public transport departures from the [Trafiklab integration](https://github.com/MrSjodin/HomeAssistant_Trafiklab_Integration).

## Features

- Shows upcoming departures from a Trafiklab sensor
- Filter departures by transport mode (BUS, TRAIN, METRO, TRAM, BOAT)
- Filter by line number or destination
- Per-group line colors (with auto-contrasting text)
- Multiple themes: Basic, Black & White, Blue Ocean, Cappuccino, Table
- Real-time indicator badge
- Arrival animation support
- Visual config editor

## Installation via HACS

1. In HACS, add this repository as a custom repository (category: Dashboard)
2. Install "Trafiklab Departures Card"
3. Reload your browser

## Manual Installation

1. Download `ha-trafiklab-departures-card.js` from the latest release
2. Copy it to `/config/www/`
3. In HA → Settings → Dashboards → Resources, add `/local/ha-trafiklab-departures-card.js` (type: JavaScript module)

## Configuration

### Minimal example

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

### Three cards on one dashboard

**Card 1 — all buses:**
```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
title: Buses
lines:
  - line_color: "#c0392b"
    filter:
      transport_mode: BUS
```

**Card 2 — trains north:**
```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
title: Train → Stockholm
lines:
  - line_color: "#1565c0"
    filter:
      transport_mode: TRAIN
      destination: Stockholm
```

**Card 3 — trains south:**
```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
title: Train → Solna
lines:
  - line_color: "#1565c0"
    filter:
      transport_mode: TRAIN
      destination: Solna
```

### Multi-group single card

Show buses (red) and trains (blue) together in one card:
```yaml
type: custom:trafiklab-departures-card
entity: sensor.ulriksdal_departures_upcoming_departures
title: Ulriksdal
departures_to_show: 10
lines:
  - line_color: "#c0392b"
    filter:
      transport_mode: BUS
  - line_color: "#1565c0"
    filter:
      transport_mode: TRAIN
```

## Full config reference

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `entity` | string | **required** | Trafiklab sensor entity ID |
| `title` | string | `"Departures"` | Card title |
| `icon` | string | `"mdi:bus-clock"` | Header icon |
| `show_header` | boolean | `true` | Show/hide card header |
| `show_list_header` | boolean | `false` | Show column labels |
| `orientation` | `vertical`/`horizontal` | `vertical` | Layout direction |
| `theme` | string | `basic` | Visual theme |
| `departures_to_show` | number | `5` | Max rows |
| `sort_departures` | boolean | `false` | Sort by time across groups |
| `departure_animation` | string | `none` | Animation on arrival: `flash`, `bounce`, `shakeX`, `fadeIn`, etc. |
| `departure_animation_duration` | number | preset | Duration in ms |
| `arrival_time_offset` | number | `2` | Minutes before departure to trigger animation |
| `lines` | array | `[{}]` | Line group definitions (see below) |

### Line group options

| Key | Type | Description |
|-----|------|-------------|
| `line_color` | string | Hex color for line badge (e.g. `"#c0392b"`) |
| `line_name` | string | Override the line name displayed |
| `icon` | string | Override transport icon |
| `filter.transport_mode` | string or array | `BUS`, `TRAIN`, `METRO`, `TRAM`, `BOAT`, `TAXI` |
| `filter.line` | string or array | Line number(s), e.g. `"7"` or `["1","4"]` |
| `filter.destination` | string | Case-insensitive substring match on destination |
| `filter.direction` | string | Direction value from sensor |

If no `filter` is specified in a group, it matches all departures. Groups are evaluated in order — each departure is assigned to the **first** matching group.
