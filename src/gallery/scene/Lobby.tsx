import { useMemo } from "react";
import { MeshStandardMaterial } from "three";
import { latestFirst } from "@/content/selectors";
import { GALLERY_COPY } from "@/content/site-copy";
import type { Experience } from "@/content/types";
import { DOOR, LOBBY, LOBBY_PLAN, WALL_THICKNESS, fixtureFacing, type RoomLayout } from "../layout";
import { SYMBOLS, SYMBOL_IDS, type SymbolId } from "../symbols";
import { useSurface } from "../surfaces";
import { Frieze, SymbolMark } from "./adinkra";
import { Ceiling, Floor, Wall, blockClick, useExhibitEvents } from "./common";
import { TextStack } from "./type";

const INK = "#2b1d14";
const CLAY = "#8a3f22";
const MUTED = "#6e5646";
const PLASTER = "#efe4d4";
const GOLD = "#d9ad3c";

const { halfWidth: hw, halfDepth: hd, height: H } = LOBBY;
/** Distance of wall-mounted text from the wall's centre line, just proud of its face. */
const FACE = WALL_THICKNESS / 2 + 0.02;
/** Every wall panel's text starts at the same height, so the room reads as one hang. */
const PANEL_TOP = 3;

/** Placement on each lobby wall, facing into the room. */
const WALLS = {
  north: { at: (x: number): [number, number, number] => [x, 0, -hd + FACE], rotationY: 0 },
  south: { at: (x: number): [number, number, number] => [x, 0, hd - FACE], rotationY: Math.PI },
  west: { at: (z: number): [number, number, number] => [-hw + FACE, 0, z], rotationY: Math.PI / 2 },
  east: { at: (z: number): [number, number, number] => [hw - FACE, 0, z], rotationY: -Math.PI / 2 },
};

function OnWall({
  wall,
  along,
  children,
}: {
  wall: keyof typeof WALLS;
  along: number;
  children: React.ReactNode;
}) {
  return (
    <group position={WALLS[wall].at(along)} rotation-y={WALLS[wall].rotationY}>
      {children}
    </group>
  );
}

export function Lobby({ rooms, experience }: { rooms: RoomLayout[]; experience: Experience[] }) {
  const floorMap = useSurface("laterite", (hw * 2) / 4, (hd * 2) / 4);
  const materials = useMemo(
    () => ({
      floor: new MeshStandardMaterial({ map: floorMap, roughness: 0.75 }),
      walls: new MeshStandardMaterial({ color: PLASTER, roughness: 0.95 }),
      ceiling: new MeshStandardMaterial({ color: "#e6d8c6", roughness: 1 }),
    }),
    [floorMap],
  );
  const room = (id: RoomLayout["id"]) => rooms.find((r) => r.id === id);

  return (
    <group>
      <Floor width={hw * 2} depth={hd * 2} material={materials.floor} position={[0, 0, 0]} />
      <Ceiling width={hw * 2} depth={hd * 2} height={H} material={materials.ceiling} position={[0, 0]} />
      <mesh position={[0, H - 0.02, 0.5]} rotation-x={Math.PI / 2} onClick={blockClick}>
        <planeGeometry args={[4, 2.6]} />
        <meshBasicMaterial color={[1.3, 1.24, 1.14]} toneMapped={false} />
      </mesh>
      <Wall length={hw * 2 + 0.2} height={H} material={materials.walls} door={DOOR} position={[0, 0, -hd]} />
      <Wall length={hw * 2 + 0.2} height={H} material={materials.walls} position={[0, 0, hd]} />
      <Wall length={hd * 2} height={H} material={materials.walls} door={DOOR} position={[-hw, 0, 0]} rotationY={Math.PI / 2} />
      <Wall length={hd * 2} height={H} material={materials.walls} door={DOOR} position={[hw, 0, 0]} rotationY={Math.PI / 2} />
      <pointLight position={[0, 4.6, 0.5]} intensity={40} distance={22} decay={1.4} color="#ffe6c4" />

      <Friezes />
      <Medallion id="gyeNyame" at={[0, 1.4]} radius={1.5} />
      {room("interface") && <Medallion id={room("interface")!.symbol} at={[-hw + 1.6, 0]} radius={0.8} />}
      {room("signal") && <Medallion id={room("signal")!.symbol} at={[hw - 1.6, 0]} radius={0.8} />}
      {room("trophy") && <Medallion id={room("trophy")!.symbol} at={[0, -hd + 1.6]} radius={0.8} />}

      <TitleWall trophy={room("trophy")} />
      <Statement />
      <NowShowing />
      <Figures />
      <Chronology experience={experience} />
      <SymbolsPlaque />
      {room("interface") && <DoorSign room={room("interface")!} wall="west" />}
      {room("signal") && <DoorSign room={room("signal")!} wall="east" />}
      <Desk />
      <GiftShop />
    </group>
  );
}

/** Adinkra stamped in a band around the top of the lobby, the way cloth is stamped in rows. */
function Friezes() {
  const band = { height: 0.42, y: 5.45, ink: "#5a2e18", thread: "#b8892a" };
  const across = hw * 2 - WALL_THICKNESS;
  const deep = hd * 2 - WALL_THICKNESS;
  return (
    <>
      {(["north", "south", "west", "east"] as const).map((wall) => {
        const [x, , z] = WALLS[wall].at(0);
        return (
          <Frieze
            key={wall}
            length={wall === "north" || wall === "south" ? across : deep}
            height={band.height}
            ink={band.ink}
            thread={band.thread}
            position={[x, band.y, z]}
            rotationY={WALLS[wall].rotationY}
          />
        );
      })}
    </>
  );
}

function Medallion({ id, at, radius }: { id: SymbolId; at: [number, number]; radius: number }) {
  return (
    <group position={[at[0], 0.004, at[1]]} rotation-x={-Math.PI / 2}>
      <mesh>
        <ringGeometry args={[radius * 0.88, radius, 72]} />
        <meshStandardMaterial color="#b8892a" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position-z={-0.001}>
        <circleGeometry args={[radius * 0.88, 72]} />
        <meshStandardMaterial color="#5e2a16" roughness={0.85} />
      </mesh>
      <SymbolMark id={id} color={GOLD} size={radius * 1.2} position={[0, 0, 0.002]} />
    </group>
  );
}

/** Name, exhibition title and the headline, over the doorway facing the entrance. */
function TitleWall({ trophy }: { trophy?: RoomLayout }) {
  const { artist, title } = GALLERY_COPY.exhibition;
  return (
    <OnWall wall="north" along={0}>
      <HitArea id="lobby-title" width={10.5} height={1.75} y={LOBBY_PLAN.title.centre} />
      <group position-y={3.6}>
        <TextStack
          width={11}
          align="center"
          anchor="bottom"
          lines={[
            { text: artist, style: "display", size: 0.7, color: INK },
            { text: title, style: "italic", size: 0.38, color: CLAY, gap: 0.15 },
            { text: GALLERY_COPY.quote, style: "body", size: 0.115, color: MUTED, gap: 1 },
          ]}
        />
      </group>
      {trophy && (
        <group position-y={DOOR.height + 0.1}>
          <TextStack width={3} align="center" anchor="bottom" lines={[{ text: trophy.title, style: "eyebrow", size: 0.07, color: CLAY }]} />
        </group>
      )}
    </OnWall>
  );
}

/**
 * An invisible target over wall text, so a click anywhere on it walks over and
 * opens it. `y` is the height of its centre within the parent group. Hidden
 * meshes still receive clicks but are never drawn.
 */
function HitArea({ id, width, height, y }: { id: string; width: number; height: number; y: number }) {
  const { handlers } = useExhibitEvents(id);
  return (
    <mesh position={[0, y, -0.005]} visible={false} {...handlers}>
      <planeGeometry args={[width + 0.3, height + 0.3]} />
    </mesh>
  );
}

function Statement() {
  const { eyebrow, title, body } = GALLERY_COPY.statement;
  const symbol = SYMBOLS.eseNeTekrema;
  return (
    <OnWall wall="north" along={LOBBY_PLAN.statement.x}>
      <group position-y={PANEL_TOP}>
        <HitArea id="lobby-about" width={4.4} height={1.3} y={-0.65} />
        <SymbolMark id="eseNeTekrema" color={CLAY} size={0.62} position={[-1.85, -0.36, 0]} />
        <group position-x={0.38}>
          <TextStack
            width={3.6}
            lines={[
              { text: eyebrow, style: "eyebrow", size: 0.06, color: CLAY },
              { text: title, style: "display", size: 0.3, color: INK, gap: 0.35 },
              { text: `${symbol.name}: ${symbol.meaning}`, style: "italic", size: 0.075, color: MUTED, gap: 0.5 },
              { text: body, style: "body", size: 0.082, color: INK, gap: 1.1 },
            ]}
          />
        </group>
      </group>
    </OnWall>
  );
}

function NowShowing() {
  const { eyebrow, title, body } = GALLERY_COPY.now;
  return (
    <OnWall wall="north" along={LOBBY_PLAN.now.x}>
      <group position-y={PANEL_TOP}>
        <HitArea id="lobby-now" width={4} height={1.1} y={-0.55} />
        <TextStack
          width={3.9}
          lines={[
            { text: eyebrow, style: "eyebrow", size: 0.06, color: CLAY },
            { text: title, style: "display", size: 0.3, color: INK, gap: 0.35 },
            { text: body, style: "body", size: 0.082, color: INK, gap: 1.1 },
          ]}
        />
      </group>
    </OnWall>
  );
}

/** The headline numbers, large on the west wall, read left to right. */
function Figures() {
  const along = LOBBY_PLAN.figures;
  return (
    <>
      {GALLERY_COPY.figures.slice(0, along.length).map(({ figure, caption }, index) => (
        <OnWall key={figure} wall="west" along={along[index]}>
          <HitArea id={`lobby-figure-${index}`} width={2.3} height={1.5} y={2.35} />
          <group position-y={2.35}>
            <TextStack
              width={2.2}
              align="center"
              anchor="middle"
              lines={[
                { text: figure, style: "display", size: 0.82, color: CLAY },
                { text: caption, style: "body", size: 0.078, color: INK, gap: 0.45 },
              ]}
            />
          </group>
        </OnWall>
      ))}
    </>
  );
}

/** Roles as a chronology, latest first, with a rule and a dot per role. */
function Chronology({ experience }: { experience: Experience[] }) {
  const rows = latestFirst(experience).slice(0, 7);
  const width = 4.4;
  const left = -width / 2;
  const ruleX = left + 1.05;
  const pitch = 0.36;
  const firstRow = -0.85;

  return (
    <OnWall wall="east" along={LOBBY_PLAN.chronology.z}>
      <group position-y={PANEL_TOP}>
        <HitArea id="lobby-career" width={width} height={2.2} y={-1.05} />
        <TextStack
          width={width}
          lines={[
            { text: "Chronology", style: "eyebrow", size: 0.06, color: CLAY },
            { text: "Career", style: "display", size: 0.3, color: INK, gap: 0.35 },
          ]}
        />
        <mesh position={[ruleX, firstRow - ((rows.length - 1) * pitch) / 2 - 0.08, -0.001]}>
          <planeGeometry args={[0.012, (rows.length - 1) * pitch + 0.1]} />
          <meshBasicMaterial color={CLAY} />
        </mesh>
        {rows.map((row, index) => {
          const y = firstRow - index * pitch;
          return (
            <group key={row.id} position-y={y}>
              <group position-x={left + 0.45}>
                <TextStack width={0.9} lines={[{ text: row.period.replace("-", "–"), style: "label", size: 0.06, color: MUTED }]} />
              </group>
              <mesh position={[ruleX, -0.05, 0]}>
                <circleGeometry args={[0.035, 24]} />
                <meshBasicMaterial color={CLAY} />
              </mesh>
              <group position-x={ruleX + 0.2 + 1.5}>
                <TextStack
                  width={3}
                  lines={[
                    { text: row.company, style: "display", size: 0.12, color: INK },
                    { text: row.role, style: "body", size: 0.058, color: MUTED, gap: 0.2 },
                  ]}
                />
              </group>
            </group>
          );
        })}
      </group>
    </OnWall>
  );
}

/** Explains the symbols that mark the rooms. Clicking it lists all nine with their meanings. */
function SymbolsPlaque() {
  const { eyebrow, title, body } = GALLERY_COPY.symbols;
  const placed = SYMBOL_IDS.filter((id) => SYMBOLS[id].role);
  const width = 4.4;
  const columns = 3;
  const cell = width / columns;

  return (
    <OnWall wall="east" along={LOBBY_PLAN.symbols.z}>
      <group position-y={PANEL_TOP}>
        <HitArea id="lobby-symbols" width={width} height={2.4} y={-1.15} />
        <TextStack
          width={width}
          lines={[
            { text: eyebrow, style: "eyebrow", size: 0.06, color: CLAY },
            { text: title, style: "display", size: 0.26, color: INK, gap: 0.35 },
            { text: body, style: "body", size: 0.064, color: INK, gap: 0.9 },
          ]}
        />
        {placed.map((id, index) => {
          const x = -width / 2 + cell * ((index % columns) + 0.5);
          const y = -1.12 - Math.floor(index / columns) * 0.78;
          return (
            <group key={id} position={[x, y, 0]}>
              <SymbolMark id={id} color={CLAY} size={0.3} position={[0, -0.15, 0]} />
              <group position-y={-0.36}>
                <TextStack
                  width={cell - 0.1}
                  align="center"
                  lines={[
                    { text: SYMBOLS[id].name, style: "display", size: 0.085, color: INK },
                    { text: SYMBOLS[id].translation, style: "italic", size: 0.056, color: MUTED, gap: 0.15 },
                  ]}
                />
              </group>
            </group>
          );
        })}
      </group>
    </OnWall>
  );
}

/** Room name over a side doorway, under the room's symbol. */
function DoorSign({ room, wall }: { room: RoomLayout; wall: "west" | "east" }) {
  return (
    <OnWall wall={wall} along={0}>
      <HitArea id={`${room.id}-intro`} width={3.6} height={1.75} y={4.25} />
      <SymbolMark id={room.symbol} color={CLAY} size={0.62} position={[0, 4.62, 0]} />
      <group position-y={DOOR.height + 0.14}>
        <TextStack
          width={4}
          align="center"
          anchor="bottom"
          lines={[
            { text: room.title, style: "display", size: 0.46, color: INK },
            { text: room.subtitle, style: "eyebrow", size: 0.064, color: CLAY, gap: 0.8 },
          ]}
        />
      </group>
    </OnWall>
  );
}

function Desk() {
  const { hovered, handlers } = useExhibitEvents("lobby-contact");
  const at = LOBBY_PLAN.desk;
  return (
    <group position={[at.x, 0, at.z]} rotation-y={fixtureFacing(at)} {...handlers}>
      <mesh position-y={0.55}>
        <boxGeometry args={[2.2, 1.1, 0.7]} />
        <meshStandardMaterial color={hovered ? "#a04a28" : CLAY} roughness={0.7} />
      </mesh>
      <mesh position-y={1.12}>
        <boxGeometry args={[2.3, 0.05, 0.8]} />
        <meshStandardMaterial color="#2e1b0e" roughness={0.5} />
      </mesh>
      <SymbolMark id="adwo" color="#f3d9b8" size={0.34} position={[-0.72, 0.68, 0.352]} />
      <group position={[0.18, 0.84, 0.352]}>
        <TextStack
          width={1.4}
          align="center"
          lines={[
            { text: "Reception", style: "display", size: 0.2, color: "#fff3e2" },
            { text: "Get in touch", style: "eyebrow", size: 0.05, color: "#f3d9b8", gap: 0.8 },
          ]}
        />
      </group>
    </group>
  );
}

function GiftShop() {
  const { hovered, handlers } = useExhibitEvents("lobby-cv");
  const kente = useSurface("kente", 0.5, 0.5);
  const at = LOBBY_PLAN.shop;
  return (
    <group position={[at.x, 0, at.z]} rotation-y={fixtureFacing(at)} {...handlers}>
      <mesh position-y={0.4}>
        <boxGeometry args={[1.7, 0.8, 0.7]} />
        <meshStandardMaterial color="#2e1b0e" roughness={0.6} />
      </mesh>
      {[-0.45, 0, 0.45].map((x, i) => (
        <mesh key={x} position={[x, 0.82 + i * 0.012, 0]} rotation-y={(i - 1) * 0.15} scale={hovered ? 1.05 : 1}>
          <boxGeometry args={[0.32, 0.03 + i * 0.012, 0.44]} />
          <meshStandardMaterial map={kente} roughness={0.8} />
        </mesh>
      ))}
      <group position={[0, 0.66, 0.352]}>
        <TextStack
          width={1.5}
          align="center"
          lines={[
            { text: "Gift shop", style: "display", size: 0.17, color: "#fff3e2" },
            { text: "Take a free CV", style: "eyebrow", size: 0.045, color: "#f3d9b8", gap: 0.8 },
          ]}
        />
      </group>
    </group>
  );
}
