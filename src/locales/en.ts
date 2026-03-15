export const en = {
  col: {
    icon:           "Icon",
    line:           "Line",
    destination:    "Destination",
    time_diff:      "In",
    planned_time:   "Sched.",
    estimated_time: "Est.",
    delay:          "Delay",
    platform:       "Plat.",
  },
  time: {
    now: "Now",
  },
  state: {
    unavailable: "Sensor unavailable",
    not_found:   (entity: string) => `Entity ${entity} not found.`,
    updated:     (time: string)   => `Updated ${time} · Trafiklab`,
  },
};

export type Translations = typeof en;
