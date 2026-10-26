import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  MeshStandardMaterial,
  Object3D,
  Vector3,
  type Group,
  type InstancedMesh,
  type Texture,
} from "three";
import type { Work } from "@/content/types";
import { ROOM, type Installation, type RoomLayout } from "../layout";
import { useSurface } from "../surfaces";
import { Placed, RoomShell, fit, imageAspect, useExhibitEvents, useWorkImage } from "./common";
import { labelLines } from "./labels";
import { RoomIntro } from "./RoomIntro";
import { TextStack } from "./type";

/** Colours above 1 are brighter than white, which is what the bloom pass picks up. */
const GLOW = {
  cyan: [0.35, 1.6, 2.4] as [number, number, number],
  violet: [1.1, 0.7, 2.6] as [number, number, number],
  amber: [2.4, 1.4, 0.4] as [number, number, number],
};
const TEXT = "#dce6ff";
const MUTED = "#8ea3c4";
const ACCENT = "#7dd3fc";
const PANEL_MAX = { w: 2, h: 1.25 };
const HERO_MAX = { w: 3.2, h: 1.9 };
const SCULPTURE_DISTANCE = 1.7;
/** Lower than the other rooms' plinths, so sculptures never hide the panel labels. */
const PLINTH_HEIGHT = 0.75;

export function SignalRoom({ room }: { room: RoomLayout }) {
  const floorMap = useSurface("concrete", ROOM.width / 2, room.length / 2);
  const materials = useMemo(
    () => ({
      floor: new MeshStandardMaterial({ map: floorMap, roughness: 0.32, metalness: 0.5 }),
      walls: new MeshStandardMaterial({ color: "#0b0f19", roughness: 0.85 }),
      ceiling: new MeshStandardMaterial({ color: "#05070c", roughness: 1 }),
    }),
    [floorMap],
  );

  return (
    <RoomShell room={room} {...materials}>
      <pointLight position={[0, 3.6, room.length * 0.5]} intensity={6} distance={16} decay={1.6} color="#7dd3fc" />
      <LightLines length={room.length} />
      {room.installations.map((item, index) => (
        <Placed key={index} pose={item.pose}>
          <SignalInstallation item={item} room={room} />
        </Placed>
      ))}
    </RoomShell>
  );
}

function SignalInstallation({ item, room }: { item: Installation; room: RoomLayout }) {
  switch (item.type) {
    case "intro":
      return <RoomIntro room={room} ink={TEXT} muted={MUTED} accent={ACCENT} />;
    case "panel":
      return <DataPanel work={item.work} hero={item.hero} floorY={-item.pose.y} number={room.numbers[item.work.id] ?? ""} />;
    default:
      return null;
  }
}

function DataPanel({ work, hero, floorY, number }: { work: Work; hero: boolean; floorY: number; number: string }) {
  const max = hero ? HERO_MAX : PANEL_MAX;
  const placeholder = <PanelFrame work={work} w={max.w} h={max.h * 0.7} number={number} hero={hero} />;
  return (
    <group>
      <Suspense fallback={placeholder}>
        {work.image ? <ImagePanel work={work} url={work.image} max={max} number={number} hero={hero} /> : placeholder}
      </Suspense>
      <group position={[0, floorY, SCULPTURE_DISTANCE]}>
        <Sculpture work={work} />
      </group>
    </group>
  );
}

function ImagePanel({
  work,
  url,
  max,
  number,
  hero,
}: {
  work: Work;
  url: string;
  max: { w: number; h: number };
  number: string;
  hero: boolean;
}) {
  const texture = useWorkImage(url, max.w > 2.5 ? 1600 : 1200);
  const { w, h } = fit(imageAspect(texture), max.w, max.h);
  return <PanelFrame work={work} w={w} h={h} map={texture} number={number} hero={hero} />;
}

/** A lit screen with a glowing edge, and its label underneath. */
function PanelFrame({
  work,
  w,
  h,
  map,
  number,
  hero,
}: {
  work: Work;
  w: number;
  h: number;
  map?: Texture;
  number: string;
  hero: boolean;
}) {
  const { hovered, handlers } = useExhibitEvents(work.id);
  const labelWidth = hero ? 2.6 : 1.9;
  return (
    <group>
      <group {...handlers} scale={hovered ? 1.015 : 1}>
        <mesh position-z={0.01}>
          <planeGeometry args={[w + 0.05, h + 0.05]} />
          <meshBasicMaterial color={hovered ? GLOW.amber : GLOW.cyan} toneMapped={false} />
        </mesh>
        <mesh position-z={0.02}>
          <planeGeometry args={[w, h]} />
          {map ? <meshBasicMaterial map={map} toneMapped={false} /> : <meshBasicMaterial color="#111827" />}
        </mesh>
        {!map && (
          <group position-z={0.03}>
            <TextStack width={w * 0.8} align="center" anchor="middle" lines={[{ text: work.title, style: "display", size: 0.18, color: TEXT }]} />
          </group>
        )}
      </group>
      {/* A fixed reading width, starting at the panel's left edge, however narrow the image. */}
      <group position={[-w / 2 + labelWidth / 2, -h / 2 - 0.12, 0.02]}>
        <mesh position={[0, hero ? -0.4 : -0.32, -0.005]} visible={false} {...handlers}>
          <planeGeometry args={[labelWidth, hero ? 0.85 : 0.7]} />
        </mesh>
        <TextStack width={labelWidth} lines={labelLines(work, number, { ink: TEXT, muted: MUTED, accent: ACCENT }, hero ? 1.5 : 1.25)} />
      </group>
    </group>
  );
}

function Sculpture({ work }: { work: Work }) {
  const { handlers } = useExhibitEvents(work.id);
  return (
    <group {...handlers}>
      <mesh position-y={PLINTH_HEIGHT / 2}>
        <boxGeometry args={[0.8, PLINTH_HEIGHT, 0.8]} />
        <meshStandardMaterial color="#1b2436" roughness={0.35} metalness={0.3} />
      </mesh>
      <mesh position-y={PLINTH_HEIGHT - 0.02}>
        <boxGeometry args={[0.82, 0.02, 0.82]} />
        <meshBasicMaterial color={GLOW.violet} toneMapped={false} />
      </mesh>
      <group position-y={PLINTH_HEIGHT + 0.05}>
        {work.section === "case-study" ? <FlowSculpture /> : work.section === "personal" ? <PillarSculpture /> : <OrbitSculpture />}
      </group>
    </group>
  );
}

/** Thin lines of light where the walls meet the floor and ceiling. */
function LightLines({ length }: { length: number }) {
  const edges = [
    { x: -ROOM.width / 2 + 0.11, y: 0.03 },
    { x: ROOM.width / 2 - 0.11, y: 0.03 },
    { x: -ROOM.width / 2 + 0.11, y: ROOM.height - 0.03 },
    { x: ROOM.width / 2 - 0.11, y: ROOM.height - 0.03 },
  ];
  return (
    <>
      {edges.map(({ x, y }) => (
        <mesh key={`${x}-${y}`} position={[x, y, length / 2]}>
          <boxGeometry args={[0.02, 0.025, length]} />
          <meshBasicMaterial color={GLOW.cyan} toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}

const FLOW_PARTICLES = 24;

/** Data moving through a pipeline: particles riding a looping tube. */
function FlowSculpture() {
  const curve = useMemo(() => {
    const points = Array.from({ length: 9 }, (_, i) => {
      const t = (i / 8) * Math.PI * 2;
      return new Vector3(Math.sin(t) * 0.26, 0.08 + i * 0.045, Math.cos(t) * 0.26);
    });
    return new CatmullRomCurve3(points);
  }, []);
  const particles = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame(({ clock }) => {
    const mesh = particles.current;
    if (!mesh) return;
    for (let i = 0; i < FLOW_PARTICLES; i++) {
      const t = (clock.elapsedTime * 0.12 + i / FLOW_PARTICLES) % 1;
      dummy.position.copy(curve.getPointAt(t));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 96, 0.018, 8, false]} />
        <meshStandardMaterial color="#1e3a5f" emissive="#38bdf8" emissiveIntensity={0.4} roughness={0.4} />
      </mesh>
      <instancedMesh ref={particles} args={[undefined, undefined, FLOW_PARTICLES]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color={GLOW.cyan} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

const PILLARS = 5;

/** A field of light columns rising and falling. */
function PillarSculpture() {
  const bars = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame(({ clock }) => {
    const mesh = bars.current;
    if (!mesh) return;
    for (let i = 0; i < PILLARS * PILLARS; i++) {
      const col = i % PILLARS;
      const row = Math.floor(i / PILLARS);
      const height = 0.05 + 0.25 * (0.5 + 0.5 * Math.sin(clock.elapsedTime * 1.3 + col * 0.8 + row * 0.5));
      dummy.position.set((col - 2) * 0.12, height / 2, (row - 2) * 0.12);
      dummy.scale.set(1, height, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={bars} args={[undefined, undefined, PILLARS * PILLARS]}>
      <boxGeometry args={[0.07, 1, 0.07]} />
      <meshBasicMaterial color={GLOW.violet} toneMapped={false} />
    </instancedMesh>
  );
}

/** Rings turning at different speeds around a bright core. */
function OrbitSculpture() {
  const rings = useRef<Group>(null);
  useFrame((_, delta) => {
    rings.current?.children.forEach((ring, i) => {
      ring.rotation.x += delta * (0.3 + i * 0.25);
      ring.rotation.y += delta * (0.5 - i * 0.15);
    });
  });
  return (
    <group position-y={0.25}>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={GLOW.amber} toneMapped={false} />
      </mesh>
      <group ref={rings}>
        {[0.16, 0.24, 0.32].map((radius) => (
          <mesh key={radius}>
            <torusGeometry args={[radius, 0.008, 8, 64]} />
            <meshBasicMaterial color={GLOW.cyan} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

