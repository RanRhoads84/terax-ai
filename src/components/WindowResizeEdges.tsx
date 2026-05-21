import { IS_MAC } from "@/lib/platform";
import { getCurrentWindow } from "@tauri-apps/api/window";

type ResizeDir =
  | "East"
  | "North"
  | "NorthEast"
  | "NorthWest"
  | "South"
  | "SouthEast"
  | "SouthWest"
  | "West";

const EDGE = 5;
const CORNER = 8;

type Zone = {
  dir: ResizeDir;
  cursor: string;
  style: React.CSSProperties;
};

const ZONES: Zone[] = [
  // edges
  {
    dir: "North",
    cursor: "cursor-ns-resize",
    style: { top: 0, left: CORNER, right: CORNER, height: EDGE },
  },
  {
    dir: "South",
    cursor: "cursor-ns-resize",
    style: { bottom: 0, left: CORNER, right: CORNER, height: EDGE },
  },
  {
    dir: "West",
    cursor: "cursor-ew-resize",
    style: { left: 0, top: CORNER, bottom: CORNER, width: EDGE },
  },
  {
    dir: "East",
    cursor: "cursor-ew-resize",
    style: { right: 0, top: CORNER, bottom: CORNER, width: EDGE },
  },
  // corners
  {
    dir: "NorthWest",
    cursor: "cursor-nwse-resize",
    style: { top: 0, left: 0, width: CORNER, height: CORNER },
  },
  {
    dir: "NorthEast",
    cursor: "cursor-nesw-resize",
    style: { top: 0, right: 0, width: CORNER, height: CORNER },
  },
  {
    dir: "SouthWest",
    cursor: "cursor-nesw-resize",
    style: { bottom: 0, left: 0, width: CORNER, height: CORNER },
  },
  {
    dir: "SouthEast",
    cursor: "cursor-nwse-resize",
    style: { bottom: 0, right: 0, width: CORNER, height: CORNER },
  },
];

export function WindowResizeEdges() {
  if (IS_MAC) return null;

  const w = getCurrentWindow();

  return (
    <div className="pointer-events-none absolute inset-0 z-50 select-none">
      {ZONES.map((zone) => (
        <div
          key={zone.dir}
          className={`pointer-events-auto absolute ${zone.cursor}`}
          style={zone.style}
          onMouseDown={(e) => {
            e.preventDefault();
            void w.startResizeDragging(zone.dir);
          }}
        />
      ))}
    </div>
  );
}
