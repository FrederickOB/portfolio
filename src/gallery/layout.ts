import { GALLERY_COPY } from "@/content/site-copy";
import type { Achievement, Work } from "@/content/types";
import type { SymbolId } from "./symbols";

/**
 * Turns portfolio content into a floor plan. Everything that hangs in the
 * gallery is placed here, so the scene and the camera agree on where each
 * work is and where to stand to look at it. Units are metres; y is up and the
 * entrance is at +z.
 */

export const EYE_HEIGHT = 1.6;
export const CAMERA_FOV = 62;
const MAX_PORTRAIT_FOV = 80;

/**
 * Vertical field of view for a screen shape. Portrait screens get a taller
 * view so they don't see a narrow slice of each room, capped before it bulges.
 */
export function fieldOfView(aspect: number) {
  if (aspect >= 1) return CAMERA_FOV;
  const halfWidth = Math.tan(((CAMERA_FOV / 2) * Math.PI) / 180);
  const vertical = ((2 * Math.atan(halfWidth / aspect)) * 180) / Math.PI;
  return Math.min(vertical, MAX_PORTRAIT_FOV);
}
export const WALL_THICKNESS = 0.2;
export const LOBBY = { halfWidth: 8, halfDepth: 7, height: 6 } as const;
export const DOOR = { width: 3, height: 3.2 } as const;

/** Rooms grow by bays: each bay has four wall spots and two plinth spots. */
export const ROOM = {
  width: 10,
  height: 4.5,
  bayDepth: 6,
  entryDepth: 1.5,
  endDepth: 3,
} as const;

/** Small works share a wall spot, two by two, like a salon hang. */
export const SALON = {
  frame: { w: 1.05, h: 0.72 },
  columns: [-0.62, 0.62],
  rows: [2.15, 1.2],
  capacity: 4,
} as const;

export const CABINET = {
  width: 2.4,
  height: 2.6,
  depth: 0.5,
  columns: [-0.72, 0, 0.72],
  shelves: [1.95, 1.25, 0.55],
  capacity: 9,
} as const;

export const PLINTH_HEIGHT = 1;

const WALL_INSET = WALL_THICKNESS / 2 + 0.02;
const WALK_MARGIN = 0.45;
const DOOR_STEP = 1.2;

export type RoomId = "interface" | "signal" | "trophy";
export type Region = RoomId | "lobby";

/** A camera pose on the floor. Yaw 0 looks towards -z; positive pitch looks up. */
export interface Spot {
  x: number;
  z: number;
  yaw: number;
  pitch: number;
}

/** A point on a walking route. Without a yaw the visitor faces where they walk. */
export interface Waypoint {
  x: number;
  z: number;
  yaw?: number;
  pitch?: number;
}

/** Where an installation stands in its room. Its front faces local +z. */
export interface Pose {
  x: number;
  y: number;
  z: number;
  rotationY: number;
}

export interface Rect {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export type Installation =
  | { type: "intro"; pose: Pose }
  | { type: "canvas"; pose: Pose; work: Work; hero: boolean }
  | { type: "salon"; pose: Pose; works: Work[] }
  | { type: "device"; pose: Pose; work: Work }
  | { type: "panel"; pose: Pose; work: Work; hero: boolean }
  | { type: "cabinet"; pose: Pose; achievements: Achievement[] }
  | { type: "degree"; pose: Pose; achievement: Achievement };

export interface RoomLayout {
  id: RoomId;
  title: string;
  subtitle: string;
  /** The Adinkra symbol that marks the room. */
  symbol: SymbolId;
  /** The curator's statement on the room's intro wall. */
  statement: string;
  /** A count line for the intro wall, e.g. "12 works". */
  eyebrow: string;
  /** Catalogue numbers by exhibit id, in walking order: "I 01", "I 02"… */
  numbers: Record<string, string>;
  /** Centre of the doorway in the lobby wall, where local z is 0. */
  origin: { x: number; z: number };
  /** Turns the room's local +z (into the room) into world space. */
  rotationY: number;
  length: number;
  installations: Installation[];
  /** Just inside the door, looking in. */
  entry: Spot;
  bounds: Rect;
}

export type ExhibitSubject =
  | { kind: "work"; work: Work }
  | { kind: "achievement"; achievement: Achievement }
  | { kind: "title" }
  | { kind: "statement" }
  | { kind: "now" }
  | { kind: "figure"; index: number }
  | { kind: "career" }
  | { kind: "symbols" }
  | { kind: "intro"; room: RoomId }
  | { kind: "contact" }
  | { kind: "cv" };

export interface Exhibit {
  id: string;
  region: Region;
  subject: ExhibitSubject;
  view: Spot;
  /** How far the view stands from the exhibit. */
  distance: number;
}

export interface GalleryLayout {
  rooms: RoomLayout[];
  exhibits: Exhibit[];
  /** Exhibit ids in guided-tour order. */
  tour: string[];
  walkable: Rect[];
  start: Spot;
}

const ROOM_PLACEMENT: Record<
  RoomId,
  { origin: { x: number; z: number }; rotationY: number; symbol: SymbolId; prefix: string }
> = {
  interface: { origin: { x: -LOBBY.halfWidth, z: 0 }, rotationY: -Math.PI / 2, symbol: "ananseNtontan", prefix: "I" },
  signal: { origin: { x: LOBBY.halfWidth, z: 0 }, rotationY: Math.PI / 2, symbol: "mateMasie", prefix: "S" },
  trophy: { origin: { x: 0, z: -LOBBY.halfDepth }, rotationY: Math.PI, symbol: "hyeWonHye", prefix: "A" },
};

/** Centre of the wall segments either side of a lobby doorway. */
const LOBBY_SEGMENT = (LOBBY.halfWidth + DOOR.width / 2) / 2;
const LOBBY_SIDE_SEGMENT = (LOBBY.halfDepth + DOOR.width / 2) / 2;

/**
 * Where things stand in the lobby. Wall panels give their position along the
 * wall and the height of the middle of their text.
 */
export const LOBBY_PLAN = {
  /** In front of the starting view, either side of the path to the Hall of Achievements. */
  desk: { x: -2.9, z: -2.6 },
  shop: { x: 2.9, z: -2.6 },
  /** North wall, over the doorway: name, exhibition title and headline. */
  title: { centre: 4.35 },
  /** North wall, left of the doorway. */
  statement: { x: -LOBBY_SEGMENT, centre: 2.45 },
  /** North wall, right of the doorway. */
  now: { x: LOBBY_SEGMENT, centre: 2.5 },
  /** East wall, north of the doorway. */
  chronology: { z: -LOBBY_SIDE_SEGMENT, centre: 1.95 },
  /** East wall, south of the doorway. */
  symbols: { z: LOBBY_SIDE_SEGMENT, centre: 1.9 },
  /** West wall, two figures either side of the doorway, read left to right. */
  figures: [5.65, 2.85, -2.85, -5.65],
} as const;

/** The intro wall on the first spot of each room's left wall. */
export const INTRO = {
  width: 2.1,
  /** Height of the top of the text above the intro's pose. */
  top: 1.05,
  /** Local +x points back towards the entrance, away from the next work on the wall. */
  nudge: 0.15,
} as const;

// --- Geometry helpers --------------------------------------------------------

function rotate(x: number, z: number, angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c + z * s, z: -x * s + z * c };
}

function toWorld(room: Pick<RoomLayout, "origin" | "rotationY">, x: number, z: number) {
  const r = rotate(x, z, room.rotationY);
  return { x: room.origin.x + r.x, z: room.origin.z + r.z };
}

function localRectToWorld(
  room: Pick<RoomLayout, "origin" | "rotationY">,
  minX: number,
  maxX: number,
  minZ: number,
  maxZ: number,
): Rect {
  const corners = [
    toWorld(room, minX, minZ),
    toWorld(room, maxX, minZ),
    toWorld(room, minX, maxZ),
    toWorld(room, maxX, maxZ),
  ];
  return {
    minX: Math.min(...corners.map((c) => c.x)),
    maxX: Math.max(...corners.map((c) => c.x)),
    minZ: Math.min(...corners.map((c) => c.z)),
    maxZ: Math.max(...corners.map((c) => c.z)),
  };
}

function inside(rect: Rect, x: number, z: number) {
  return x >= rect.minX && x <= rect.maxX && z >= rect.minZ && z <= rect.maxZ;
}

/**
 * Where to stand to look at a point on an installation. `offset` is in the
 * installation's own space: x along its face, y up from its pose, z out of it.
 */
function viewOf(
  room: Pick<RoomLayout, "origin" | "rotationY">,
  pose: Pose,
  offset: { x: number; y: number; z?: number },
  distance: number,
): Spot {
  const local = rotate(offset.x, offset.z ?? 0, pose.rotationY);
  const anchor = toWorld(room, pose.x + local.x, pose.z + local.z);
  const yaw = room.rotationY + pose.rotationY;
  const anchorY = pose.y + offset.y;
  return {
    x: anchor.x + Math.sin(yaw) * distance,
    z: anchor.z + Math.cos(yaw) * distance,
    yaw,
    pitch: Math.atan2(anchorY - EYE_HEIGHT, distance),
  };
}

/** Yaw that faces from one point towards another. */
export function lookAt(from: { x: number; z: number }, to: { x: number; z: number }) {
  return Math.atan2(from.x - to.x, from.z - to.z);
}

function chunk<T>(items: readonly T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

// --- Slots ------------------------------------------------------------------

/** Wall spots alternate left and right as you walk deeper into the room. */
function wallSlot(index: number, y: number): Pose {
  const bay = Math.floor(index / 4);
  const within = index % 4;
  const side = within % 2 === 0 ? -1 : 1;
  const depth = within < 2 ? 0.25 : 0.75;
  return {
    x: side * (ROOM.width / 2 - WALL_INSET),
    y,
    z: ROOM.entryDepth + (bay + depth) * ROOM.bayDepth,
    rotationY: side === -1 ? Math.PI / 2 : -Math.PI / 2,
  };
}

function plinthSlot(index: number): Pose {
  const bay = Math.floor(index / 2);
  const depth = index % 2 === 0 ? 0.25 : 0.75;
  return { x: 0, y: 0, z: ROOM.entryDepth + (bay + depth) * ROOM.bayDepth, rotationY: Math.PI };
}

function roomLength(bays: number) {
  return ROOM.entryDepth + bays * ROOM.bayDepth + ROOM.endDepth;
}

function bayCount(wallItems: number, plinthItems: number) {
  return Math.max(1, Math.ceil(wallItems / 4), Math.ceil(plinthItems / 2));
}

export function salonOffset(index: number) {
  return { x: SALON.columns[index % 2], y: SALON.rows[Math.floor(index / 2)] };
}

export function cabinetOffset(index: number) {
  return { x: CABINET.columns[index % 3], y: CABINET.shelves[Math.floor(index / 3)] };
}

// --- Rooms -------------------------------------------------------------------

function isDevice(work: Work) {
  return work.tags.some((tag) => /react native/i.test(tag));
}

function makeRoom(
  id: RoomId,
  text: { title: string; subtitle: string; statement: string; eyebrow: string },
  bays: number,
  build: (length: number) => Installation[],
): RoomLayout {
  const { origin, rotationY, symbol, prefix } = ROOM_PLACEMENT[id];
  const length = roomLength(bays);
  const entry = toWorld({ origin, rotationY }, 0, ROOM.entryDepth);
  const room: RoomLayout = {
    id,
    ...text,
    symbol,
    numbers: {},
    origin,
    rotationY,
    length,
    installations: build(length),
    entry: { ...entry, yaw: rotationY + Math.PI, pitch: 0 },
    bounds: localRectToWorld({ origin, rotationY }, -ROOM.width / 2, ROOM.width / 2, 0, length),
  };
  exhibitsOf(room)
    .filter(({ exhibit }) => exhibit.subject.kind === "work" || exhibit.subject.kind === "achievement")
    .forEach(({ exhibit }, index) => {
      room.numbers[exhibit.id] = `${prefix} ${String(index + 1).padStart(2, "0")}`;
    });
  return room;
}

function count(n: number, noun: string) {
  return `${n} ${noun}${n === 1 ? "" : "s"}`;
}

function interfaceRoom(works: Work[]): RoomLayout {
  const devices = works.filter(isDevice);
  const flat = works.filter((work) => !isDevice(work));
  const caseStudies = flat.filter((work) => work.section === "case-study");
  const hero = caseStudies[0];
  const canvases = caseStudies.slice(1);
  const salons = chunk(
    flat.filter((work) => work.section !== "case-study"),
    SALON.capacity,
  );
  const bays = bayCount(1 + canvases.length + salons.length, devices.length);

  const text = {
    title: "Interface",
    subtitle: "Frontend engineering",
    statement: GALLERY_COPY.rooms.interface,
    eyebrow: count(works.length, "work"),
  };
  return makeRoom("interface", text, bays, (length) => {
    let slot = 0;
    const installations: Installation[] = [
      { type: "intro", pose: wallSlot(slot++, 1.7) },
      ...canvases.map((work) => ({
        type: "canvas" as const,
        pose: wallSlot(slot++, 1.65),
        work,
        hero: false,
      })),
      ...salons.map((group) => ({ type: "salon" as const, pose: wallSlot(slot++, 0), works: group })),
      ...devices.map((work, index) => ({ type: "device" as const, pose: plinthSlot(index), work })),
    ];
    if (hero) {
      installations.push({
        type: "canvas",
        pose: { x: 0, y: 1.75, z: length - WALL_INSET, rotationY: Math.PI },
        work: hero,
        hero: true,
      });
    }
    return installations;
  });
}

function signalRoom(works: Work[]): RoomLayout {
  const hero = works.find((work) => work.section === "case-study") ?? works[0];
  const rest = works.filter((work) => work !== hero);
  const bays = bayCount(1 + rest.length, 0);

  const text = {
    title: "Signal",
    subtitle: "Data & AI",
    statement: GALLERY_COPY.rooms.signal,
    eyebrow: count(works.length, "work"),
  };
  return makeRoom("signal", text, bays, (length) => {
    let slot = 0;
    const installations: Installation[] = [
      { type: "intro", pose: wallSlot(slot++, 1.7) },
      ...rest.map((work) => ({
        type: "panel" as const,
        pose: wallSlot(slot++, 2.05),
        work,
        hero: false,
      })),
    ];
    if (hero) {
      installations.push({
        type: "panel",
        pose: { x: 0, y: 2.2, z: length - WALL_INSET, rotationY: Math.PI },
        work: hero,
        hero: true,
      });
    }
    return installations;
  });
}

function trophyRoom(achievements: Achievement[]): RoomLayout {
  const degrees = achievements.filter((a) => a.kind === "degree");
  const cabinets = chunk(
    achievements.filter((a) => a.kind !== "degree"),
    CABINET.capacity,
  );
  const [heroDegree, ...otherDegrees] = degrees;
  const bays = bayCount(1 + cabinets.length, otherDegrees.length);

  const years = achievements.flatMap((a) => (a.date ? [Number(a.date.slice(0, 4))] : []));
  const span = years.length ? ` · ${Math.min(...years)} to ${Math.max(...years)}` : "";
  const text = {
    title: "Hall of Achievements",
    subtitle: "Education & certifications",
    statement: GALLERY_COPY.rooms.trophy,
    eyebrow: `${count(achievements.length, "piece")}${span}`,
  };
  return makeRoom("trophy", text, bays, (length) => {
    let slot = 0;
    const installations: Installation[] = [
      { type: "intro", pose: wallSlot(slot++, 1.7) },
      ...cabinets.map((group) => ({
        type: "cabinet" as const,
        pose: wallSlot(slot++, 0),
        achievements: group,
      })),
      ...otherDegrees.map((achievement, index) => ({
        type: "degree" as const,
        pose: plinthSlot(index),
        achievement,
      })),
    ];
    if (heroDegree) {
      installations.push({
        type: "degree",
        pose: { x: 0, y: 0, z: length - 2, rotationY: Math.PI },
        achievement: heroDegree,
      });
    }
    return installations;
  });
}

// --- Exhibits ------------------------------------------------------------------

interface Placed {
  exhibit: Exhibit;
  /** Depth into the room, for walking order. */
  depth: number;
  inTour: boolean;
}

function exhibitsOf(room: RoomLayout): Placed[] {
  const placed: Placed[] = [];
  const add = (
    subject: ExhibitSubject,
    id: string,
    pose: Pose,
    offset: { x: number; y: number; z?: number },
    distance: number,
    inTour: boolean,
  ) =>
    placed.push({
      exhibit: { id, region: room.id, subject, view: viewOf(room, pose, offset, distance), distance },
      depth: pose.z,
      inTour,
    });

  for (const item of room.installations) {
    switch (item.type) {
      case "canvas":
        add({ kind: "work", work: item.work }, item.work.id, item.pose, { x: 0, y: 0 }, item.hero ? 4.6 : 3.3, true);
        break;
      case "panel":
        add({ kind: "work", work: item.work }, item.work.id, item.pose, { x: 0, y: -0.2 }, item.hero ? 5.2 : 4.4, true);
        break;
      case "device":
        add({ kind: "work", work: item.work }, item.work.id, item.pose, { x: 0, y: PLINTH_HEIGHT + 0.45 }, 1.9, true);
        break;
      case "salon":
        item.works.forEach((work, index) =>
          add({ kind: "work", work }, work.id, item.pose, salonOffset(index), 2.1, true),
        );
        break;
      case "cabinet":
        item.achievements.forEach((achievement, index) =>
          add(
            { kind: "achievement", achievement },
            achievement.id,
            item.pose,
            { ...cabinetOffset(index), z: CABINET.depth / 2 },
            1.9,
            false,
          ),
        );
        break;
      case "degree":
        add({ kind: "achievement", achievement: item.achievement }, item.achievement.id, item.pose, { x: 0, y: 1.45 }, 2.4, true);
        break;
      case "intro":
        add({ kind: "intro", room: room.id }, `${room.id}-intro`, item.pose, { x: INTRO.nudge, y: 0.3 }, 3.2, true);
        break;
    }
  }
  return placed.sort((a, b) => a.depth - b.depth);
}

function lobbyExhibit(id: string, subject: ExhibitSubject, at: { x: number; z: number }): Exhibit {
  const facing = fixtureFacing(at);
  const distance = 2.4;
  return {
    id,
    region: "lobby",
    subject,
    view: {
      x: at.x + Math.sin(facing) * distance,
      z: at.z + Math.cos(facing) * distance,
      yaw: facing,
      pitch: -0.12,
    },
    distance,
  };
}

/** A text panel on a lobby wall, viewed straight on. `facing` is the way the panel faces. */
function wallExhibit(
  id: string,
  subject: ExhibitSubject,
  at: { x: number; z: number },
  facing: number,
  centreY: number,
  distance = 3.6,
): Exhibit {
  return {
    id,
    region: "lobby",
    subject,
    view: {
      x: at.x + Math.sin(facing) * distance,
      z: at.z + Math.cos(facing) * distance,
      yaw: facing,
      pitch: Math.atan2(centreY - EYE_HEIGHT, distance),
    },
    distance,
  };
}

/** Which way a lobby fixture faces: towards the middle of the room. */
export function fixtureFacing(at: { x: number; z: number }) {
  return Math.atan2(0 - at.x, 1 - at.z);
}

export function buildLayout(works: readonly Work[], achievements: readonly Achievement[]): GalleryLayout {
  const rooms = [
    interfaceRoom(works.filter((work) => work.side === "frontend")),
    signalRoom(works.filter((work) => work.side === "data")),
    trophyRoom([...achievements]),
  ];

  const placed = rooms.flatMap(exhibitsOf);
  const northWall = -LOBBY.halfDepth + WALL_INSET;
  const eastWall = LOBBY.halfWidth - WALL_INSET;
  const westWall = -LOBBY.halfWidth + WALL_INSET;
  const { title, statement, now, chronology, symbols, figures } = LOBBY_PLAN;
  const exhibits = [
    // Stand well back from the title wall so the whole name fits in view.
    wallExhibit("lobby-title", { kind: "title" }, { x: 0, z: northWall }, 0, title.centre, 7.2),
    wallExhibit("lobby-about", { kind: "statement" }, { x: statement.x, z: northWall }, 0, statement.centre),
    wallExhibit("lobby-now", { kind: "now" }, { x: now.x, z: northWall }, 0, now.centre),
    ...figures.map((z, index) =>
      wallExhibit(`lobby-figure-${index}`, { kind: "figure", index }, { x: westWall, z }, Math.PI / 2, 2.35, 3.4),
    ),
    wallExhibit("lobby-career", { kind: "career" }, { x: eastWall, z: chronology.z }, -Math.PI / 2, chronology.centre, 4.4),
    wallExhibit("lobby-symbols", { kind: "symbols" }, { x: eastWall, z: symbols.z }, -Math.PI / 2, symbols.centre, 4.4),
    ...placed.map((p) => p.exhibit),
    lobbyExhibit("lobby-contact", { kind: "contact" }, LOBBY_PLAN.desk),
    lobbyExhibit("lobby-cv", { kind: "cv" }, LOBBY_PLAN.shop),
  ];

  const m = WALK_MARGIN;
  const walkable: Rect[] = [
    {
      minX: -LOBBY.halfWidth + m,
      maxX: LOBBY.halfWidth - m,
      minZ: -LOBBY.halfDepth + m,
      maxZ: LOBBY.halfDepth - m,
    },
    ...rooms.flatMap((room) => [
      localRectToWorld(room, -ROOM.width / 2 + m, ROOM.width / 2 - m, m, room.length - m),
      localRectToWorld(room, -DOOR.width / 2 + m, DOOR.width / 2 - m, -DOOR_STEP, DOOR_STEP),
    ]),
  ];

  return {
    rooms,
    exhibits,
    tour: [
      "lobby-title",
      "lobby-about",
      "lobby-now",
      ...placed.filter((p) => p.inTour).map((p) => p.exhibit.id),
      "lobby-career",
      "lobby-contact",
    ],
    walkable,
    start: { x: 0, z: LOBBY.halfDepth - 1.6, yaw: 0, pitch: 0.06 },
  };
}

// --- Movement -------------------------------------------------------------------

export function regionAt(layout: GalleryLayout, x: number, z: number): Region {
  return layout.rooms.find((room) => inside(room.bounds, x, z))?.id ?? "lobby";
}

function doorPoint(room: RoomLayout, side: "room" | "lobby") {
  return toWorld(room, 0, side === "room" ? DOOR_STEP : -DOOR_STEP);
}

/** A route that goes through doorways instead of walls. */
export function planRoute(layout: GalleryLayout, from: { x: number; z: number }, to: Waypoint): Waypoint[] {
  const start = regionAt(layout, from.x, from.z);
  const end = regionAt(layout, to.x, to.z);
  const via: Waypoint[] = [];
  if (start !== end) {
    const leaving = layout.rooms.find((room) => room.id === start);
    const entering = layout.rooms.find((room) => room.id === end);
    if (leaving) via.push(doorPoint(leaving, "room"), doorPoint(leaving, "lobby"));
    if (entering) via.push(doorPoint(entering, "lobby"), doorPoint(entering, "room"));
  }
  return [...via, to];
}

/** Keeps the visitor off walls, sliding along them instead of stopping dead. */
export function clampToWalkable(layout: GalleryLayout, x: number, z: number, fromX: number, fromZ: number) {
  const ok = (px: number, pz: number) => layout.walkable.some((rect) => inside(rect, px, pz));
  if (ok(x, z)) return { x, z };
  if (ok(x, fromZ)) return { x, z: fromZ };
  if (ok(fromX, z)) return { x: fromX, z };
  return { x: fromX, z: fromZ };
}

/** The nearest walkable point, for floor clicks right next to a wall. */
export function nearestWalkable(layout: GalleryLayout, x: number, z: number) {
  let best = { x, z, distance: Infinity };
  for (const rect of layout.walkable) {
    const px = Math.min(Math.max(x, rect.minX), rect.maxX);
    const pz = Math.min(Math.max(z, rect.minZ), rect.maxZ);
    const distance = Math.hypot(px - x, pz - z);
    if (distance < best.distance) best = { x: px, z: pz, distance };
  }
  return { x: best.x, z: best.z };
}

