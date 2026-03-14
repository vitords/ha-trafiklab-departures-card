import { LayoutCell } from "../types";

/** CSS grid-template-columns value for each cell */
export const CELL_WIDTHS: Record<LayoutCell, string> = {
  [LayoutCell.ICON]: "28px",
  [LayoutCell.LINE]: "52px",
  [LayoutCell.DESTINATION]: "1fr",
  [LayoutCell.TIME_DIFF]: "44px",
  [LayoutCell.PLANNED_TIME]: "58px",
  [LayoutCell.ESTIMATED_TIME]: "58px",
  [LayoutCell.DELAY]: "52px",
  [LayoutCell.PLATFORM]: "52px",
};

export function buildGridTemplate(layout: Array<LayoutCell | string>): string {
  return layout
    .map((cell) => CELL_WIDTHS[cell as LayoutCell] ?? "auto")
    .join(" ");
}
