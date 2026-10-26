import { Suspense, useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import type { Work } from "@/content/types";
import { PLINTH_HEIGHT, ROOM, SALON, salonOffset, type Installation, type RoomLayout } from "../layout";
import { pickColor, useSurface } from "../surfaces";
import {
  Placed,
  RoomShell,
  blockClick,
  fit,
  imageAspect,
  useCoverTexture,
  useExhibitEvents,
  useWorkImage,
} from "./common";
import { RoomIntro } from "./RoomIntro";
import { SECTION_LABEL, labelLines } from "./labels";
import { TextCard, TextStack } from "./type";

const INK = "#1c1712";
const MUTED = "#6f645a";
const ACCENT = "#9a3d1f";
const CARD = "#fffdf8";
const POSTER_COLORS = ["#b8322a", "#1d7a3e", "#c48a0c", "#1f4e8c", "#7a3e8c", "#17120e"];
const CANVAS_MAX = { w: 1.9, h: 1.35 };
const HERO_MAX = { w: 3.2, h: 2.1 };
const LABEL_WIDTH = 0.7;
const LABEL_PADDING = 0.07;
const LABEL_GAP = 0.12;

export function InterfaceRoom({ room }: { room: RoomLayout }) {
  const floorMap = useSurface("terrazzo", ROOM.width / 2, room.length / 2);
  const materials = useMemo(
    () => ({
      floor: new MeshStandardMaterial({ map: floorMap, roughness: 0.55 }),
      walls: new MeshStandardMaterial({ color: "#f6f3ee", roughness: 0.92 }),
      ceiling: new MeshStandardMaterial({ color: "#fbfaf7", roughness: 1 }),
    }),
    [floorMap],
  );

  return (
    <RoomShell room={room} {...materials}>
      <Skylights length={room.length} />
      <pointLight position={[0, 3.8, room.length * 0.35]} intensity={18} distance={14} decay={1.6} color="#fff4e2" />
      <pointLight position={[0, 3.8, room.length * 0.8]} intensity={18} distance={14} decay={1.6} color="#fff4e2" />
      {room.installations.map((item, index) => (
        <Placed key={index} pose={item.pose}>
          <InterfaceInstallation item={item} room={room} />
        </Placed>
      ))}
    </RoomShell>
  );
}

function InterfaceInstallation({ item, room }: { item: Installation; room: RoomLayout }) {
  const number = (id: string) => room.numbers[id] ?? "";
  switch (item.type) {
    case "intro":
      return <RoomIntro room={room} ink={INK} muted={MUTED} accent={ACCENT} />;
    case "canvas":
      return item.hero ? (
        <HeroCanvas work={item.work} number={number(item.work.id)} />
      ) : (
        <FramedWork work={item.work} max={CANVAS_MAX} number={number(item.work.id)} labelled />
      );
    case "salon":
      return <SalonWall works={item.works} number={number} />;
    case "device":
      return <PhoneOnPlinth work={item.work} number={number(item.work.id)} />;
    default:
      return null;
  }
}

function Skylights({ length }: { length: number }) {
  const count = Math.max(2, Math.round(length / 5));
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <mesh
          key={index}
          position={[0, ROOM.height - 0.01, ((index + 0.5) / count) * length]}
          rotation-x={Math.PI / 2}
          onClick={blockClick}
        >
          <planeGeometry args={[ROOM.width * 0.45, 1.6]} />
          <meshBasicMaterial color={[1.6, 1.55, 1.45]} toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}

function FramedWork({
  work,
  max,
  number,
  labelled,
}: {
  work: Work;
  max: { w: number; h: number };
  number: string;
  labelled?: boolean;
}) {
  const fallback = <Poster work={work} width={max.w} height={max.h * 0.8} />;
  return (
    <Suspense fallback={fallback}>
      {work.image ? (
        <FramedImage work={work} url={work.image} max={max} number={number} labelled={labelled} />
      ) : (
        <PosterWithLabel work={work} max={max} number={number} labelled={labelled} />
      )}
    </Suspense>
  );
}

function WallLabel({ work, number, frame }: { work: Work; number: string; frame: { w: number; h: number } }) {
  const outer = LABEL_WIDTH + LABEL_PADDING * 2;
  const { handlers } = useExhibitEvents(work.id);
  return (
    <group position={[frame.w / 2 + LABEL_GAP + outer / 2, -frame.h / 2, 0.005]} {...handlers}>
      <TextCard
        lines={labelLines(work, number, { ink: INK, muted: MUTED, accent: ACCENT }, 1.12)}
        width={LABEL_WIDTH}
        padding={LABEL_PADDING}
        color={CARD}
        bottomAligned
      />
    </group>
  );
}

function FramedImage({
  work,
  url,
  max,
  number,
  labelled,
}: {
  work: Work;
  url: string;
  max: { w: number; h: number };
  number: string;
  labelled?: boolean;
}) {
  const texture = useWorkImage(url, max.w > 2.5 ? 1600 : 1200);
  const { w, h } = fit(imageAspect(texture), max.w, max.h);
  const { hovered, handlers } = useExhibitEvents(work.id);

  return (
    <group>
      <group {...handlers} scale={hovered ? 1.015 : 1}>
        <mesh position-z={0.02}>
          <boxGeometry args={[w + 0.09, h + 0.09, 0.05]} />
          <meshStandardMaterial color="#1a1511" roughness={0.45} />
        </mesh>
        <mesh position-z={0.047}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
      {labelled && <WallLabel work={work} number={number} frame={{ w: w + 0.09, h: h + 0.09 }} />}
    </group>
  );
}

function PosterWithLabel({
  work,
  max,
  number,
  labelled,
}: {
  work: Work;
  max: { w: number; h: number };
  number: string;
  labelled?: boolean;
}) {
  const { hovered, handlers } = useExhibitEvents(work.id);
  const h = max.h * 0.8;
  return (
    <group>
      <group {...handlers} scale={hovered ? 1.015 : 1}>
        <Poster work={work} width={max.w} height={h} />
      </group>
      {labelled && <WallLabel work={work} number={number} frame={{ w: max.w, h }} />}
    </group>
  );
}

/** Stands in for a work that has no image yet: its title on a colour field with a Kente band. */
function Poster({ work, width, height }: { work: Work; width: number; height: number }) {
  const kente = useSurface("kente", width / 0.6, 0.25);
  return (
    <group position-z={0.03}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={pickColor(work.id, POSTER_COLORS)} roughness={0.85} />
      </mesh>
      <mesh position={[0, -height / 2 + height * 0.07, 0.002]}>
        <planeGeometry args={[width, height * 0.14]} />
        <meshStandardMaterial map={kente} roughness={0.8} />
      </mesh>
      <group position={[0, height * 0.07, 0.004]}>
        <TextStack
          width={width * 0.8}
          align="center"
          anchor="middle"
          lines={[{ text: work.title, style: "display", size: Math.min(0.2, height * 0.16), color: "#fff8ee" }]}
        />
      </group>
    </group>
  );
}

function HeroCanvas({ work, number }: { work: Work; number: string }) {
  const kente = useSurface("kente", 6, 3.4);
  const { handlers } = useExhibitEvents(work.id);
  return (
    <group>
      <mesh position-z={0.005} onClick={blockClick}>
        <planeGeometry args={[5.4, 3.3]} />
        <meshStandardMaterial map={kente} roughness={0.85} />
      </mesh>
      <group position-z={0.04}>
        <FramedWork work={work} max={HERO_MAX} number={number} />
      </group>
      <group position={[0, -HERO_MAX.h / 2 - 0.16, 0.03]} {...handlers}>
        <TextCard
          width={1.9}
          padding={0.08}
          color={CARD}
          lines={[
            { text: `${number} · Centrepiece`, style: "eyebrow", size: 0.03, color: ACCENT },
            { text: work.title, style: "display", size: 0.13, color: INK, gap: 0.35 },
            { text: `Medium: ${work.tags.join(", ")}`, style: "label", size: 0.03, color: MUTED, gap: 0.8 },
          ]}
        />
      </group>
    </group>
  );
}

function SalonWall({ works, number }: { works: Work[]; number: (id: string) => string }) {
  return (
    <>
      {works.map((work, index) => {
        const offset = salonOffset(index);
        return (
          <group key={work.id} position={[offset.x, offset.y, 0]}>
            <SalonFrame work={work} number={number(work.id)} />
          </group>
        );
      })}
    </>
  );
}

function SalonFrame({ work, number }: { work: Work; number: string }) {
  const { w, h } = SALON.frame;
  const { handlers } = useExhibitEvents(work.id);
  return (
    <group>
      <Suspense fallback={<Poster work={work} width={w} height={h} />}>
        {work.image ? (
          <FramedImage work={work} url={work.image} max={{ w, h }} number={number} />
        ) : (
          <PosterWithLabel work={work} max={{ w, h: h / 0.8 }} number={number} />
        )}
      </Suspense>
      <group position={[0, -h / 2 - 0.07, 0.01]} {...handlers}>
        <TextStack
          width={w}
          align="center"
          lines={[
            { text: number, style: "eyebrow", size: 0.02, color: ACCENT },
            { text: work.title, style: "label", size: 0.036, color: INK, gap: 0.25 },
          ]}
        />
      </group>
    </group>
  );
}

const PHONE = { w: 0.46, h: 0.94 };

function PhoneOnPlinth({ work, number }: { work: Work; number: string }) {
  const { hovered, handlers } = useExhibitEvents(work.id);
  return (
    <group {...handlers}>
      <mesh position-y={PLINTH_HEIGHT / 2}>
        <boxGeometry args={[0.66, PLINTH_HEIGHT, 0.66]} />
        <meshStandardMaterial color="#f1ede6" roughness={0.8} />
      </mesh>
      <group position={[0, PLINTH_HEIGHT - 0.1, 0.332]}>
        <TextStack
          width={0.54}
          align="center"
          lines={[
            { text: `${number} · ${SECTION_LABEL[work.section]}`, style: "eyebrow", size: 0.02, color: ACCENT },
            { text: work.title, style: "display", size: 0.068, color: INK, gap: 0.4 },
            { text: `Medium: ${work.tags.join(", ")}`, style: "label", size: 0.024, color: MUTED, gap: 0.8 },
          ]}
        />
      </group>
      <group position={[0, PLINTH_HEIGHT + PHONE.h / 2 + 0.03, 0]} rotation-x={-0.12} scale={hovered ? 1.04 : 1}>
        <RoundedBox args={[PHONE.w, PHONE.h, 0.05]} radius={0.035} smoothness={4}>
          <meshStandardMaterial color="#121212" roughness={0.3} metalness={0.4} />
        </RoundedBox>
        <Suspense fallback={null}>{work.image && <PhoneScreen url={work.image} />}</Suspense>
      </group>
    </group>
  );
}

function PhoneScreen({ url }: { url: string }) {
  const width = PHONE.w - 0.04;
  const height = PHONE.h - 0.06;
  const texture = useCoverTexture(useWorkImage(url, 800), width / height);
  return (
    <mesh position-z={0.026}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
