import { create } from "zustand";
import {
  fieldOfView,
  lookAt,
  nearestWalkable,
  planRoute,
  type Exhibit,
  type GalleryLayout,
  type Spot,
  type Waypoint,
} from "./layout";

/**
 * Where the visitor stands and looks. The Player rewrites it every frame, so
 * it lives outside React state; read it in animation frames, not renders.
 */
export const pose: Spot = { x: 0, z: 0, yaw: 0, pitch: 0 };

/** How much of a wide screen the info panel covers on the right, in CSS pixels (see GalleryHud). */
const PANEL_COVER = 416;

/**
 * The info panel covers the right of wide screens and the bottom of narrow
 * ones. On wide screens, step a little to the right so the exhibit sits in the
 * open part while still being seen face-on; on narrow ones, look a little down.
 */
function framed(layout: GalleryLayout, { view, distance }: Exhibit): Spot {
  const { innerWidth: width, innerHeight: height } = window;
  const tanHalf = Math.tan(((fieldOfView(width / height) / 2) * Math.PI) / 180);
  if (width >= 640) {
    const shift = PANEL_COVER / 2 / (width / 2);
    const step = distance * shift * tanHalf * (width / height);
    const spot = nearestWalkable(layout, view.x + Math.cos(view.yaw) * step, view.z - Math.sin(view.yaw) * step);
    return { ...view, ...spot };
  }
  return { ...view, pitch: view.pitch - Math.atan(0.45 * tanHalf) };
}

interface GalleryState {
  layout: GalleryLayout | null;
  focusedId: string | null;
  touring: boolean;
  route: Waypoint[] | null;
  /** Bumped for every new route so the Player restarts from its first point. */
  routeId: number;
  /** Resets the gallery and stands the visitor at the entrance or a deep-linked exhibit. */
  enter: (layout: GalleryLayout, exhibitId?: string) => void;
  walkTo: (target: Waypoint) => void;
  walkToPoint: (x: number, z: number) => void;
  focus: (id: string | null) => void;
  step: (direction: 1 | -1) => void;
  setTouring: (touring: boolean) => void;
  /** Called when the visitor takes over with the keyboard or by dragging. */
  takeControl: () => void;
  arrive: () => void;
}

export const useGallery = create<GalleryState>((set, get) => ({
  layout: null,
  focusedId: null,
  touring: false,
  route: null,
  routeId: 0,

  enter: (layout, exhibitId) => {
    const exhibit = layout.exhibits.find((e) => e.id === exhibitId);
    Object.assign(pose, exhibit ? framed(layout, exhibit) : layout.start);
    set({ layout, focusedId: exhibit?.id ?? null, touring: false, route: null });
  },

  walkTo: (target) => {
    const { layout, routeId } = get();
    if (!layout) return;
    set({ route: planRoute(layout, pose, target), routeId: routeId + 1 });
  },

  walkToPoint: (x, z) => {
    const { layout } = get();
    if (!layout) return;
    const target = nearestWalkable(layout, x, z);
    set({ touring: false });
    get().walkTo({ ...target, yaw: lookAt(pose, target), pitch: 0 });
  },

  focus: (id) => {
    const layout = get().layout;
    const exhibit = layout?.exhibits.find((e) => e.id === id);
    if (!layout || !exhibit) {
      set({ focusedId: null, touring: false });
      return;
    }
    set({ focusedId: exhibit.id });
    get().walkTo(framed(layout, exhibit));
  },

  step: (direction) => {
    const { layout, focusedId } = get();
    if (!layout || layout.tour.length === 0) return;
    const index = focusedId ? layout.tour.indexOf(focusedId) : -1;
    const next = index === -1 && direction === -1 ? layout.tour.length - 1 : index + direction;
    get().focus(layout.tour[(next + layout.tour.length) % layout.tour.length]);
  },

  setTouring: (touring) => {
    set({ touring });
    if (touring && !get().focusedId) get().step(1);
  },

  takeControl: () => {
    if (get().route || get().touring) set({ route: null, touring: false });
  },

  arrive: () => set({ route: null }),
}));
