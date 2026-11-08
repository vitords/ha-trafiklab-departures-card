export const sv = {
  col: {
    icon:           "Ikon",
    line:           "Linje",
    destination:    "Destination",
    time_diff:      "Om",
    planned_time:   "Avg.",
    estimated_time: "Beräkn.",
    delay:          "Försening",
    platform:       "Spår",
  },
  time: {
    now: "Nu",
  },
  state: {
    unavailable: "Sensor ej tillgänglig",
    no_departures: "Inga avgångar",
    not_found:   (entity: string) => `Entitet ${entity} hittades inte.`,
    updated:     (time: string)   => `Uppdaterad ${time} · Trafiklab`,
    stale:       (time: string)   => `Data kan vara inaktuell · Uppdaterad ${time}`,
  },
};
