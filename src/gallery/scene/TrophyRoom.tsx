import { useMemo } from "react";
import { MeshStandardMaterial, Vector2 } from "three";
import { achievementLabel } from "@/content/selectors";
import type { Achievement, AchievementTopic } from "@/content/types";
import { CABINET, cabinetOffset, type Installation, type RoomLayout } from "../layout";
import { useSurface } from "../surfaces";
import { Placed, RoomShell, blockClick, useExhibitEvents } from "./common";
import { RoomIntro } from "./RoomIntro";
import { TextCard, TextStack } from "./type";

// Pure metals only show their reflections, and a dim wood room has little to
// reflect, so the gold is slightly less metallic and glows faintly on its own.
const GOLD = new MeshStandardMaterial({ color: "#e0b545", metalness: 0.75, roughness: 0.28, emissive: "#4a3208", emissiveIntensity: 0.6 });
const BRASS = new MeshStandardMaterial({ color: "#c49a58", metalness: 0.7, roughness: 0.35, emissive: "#3a260c", emissiveIntensity: 0.5 });
/** Engraved plates are painted, so their lettering stays readable. */
const PLATE = new MeshStandardMaterial({ color: "#d4ae6a", roughness: 0.55 });
const DARK_WOOD = new MeshStandardMaterial({ color: "#2e1b0e", roughness: 0.6 });
const PALE = "#f3e3c3";
const MUTED = "#c9b391";
const ACCENT = "#e0b545";
const ENGRAVING = "#2a1a0c";

/** Half the outline of a trophy cup; spun around the y axis to make the cup. */
const CUP_PROFILE = [
  [0, 0],
  [0.3, 0],
  [0.3, 0.05],
  [0.1, 0.09],
  [0.06, 0.3],
  [0.08, 0.42],
  [0.3, 0.58],
  [0.38, 0.95],
  [0.35, 0.97],
  [0.27, 0.66],
  [0, 0.62],
].map(([x, y]) => new Vector2(x, y));

export function TrophyRoom({ room }: { room: RoomLayout }) {
  const panelling = useSurface("wood", room.length / 2.4, 2);
  const materials = useMemo(
    () => ({
      floor: new MeshStandardMaterial({ color: "#1d3a2b", roughness: 0.95 }),
      walls: new MeshStandardMaterial({ map: panelling, roughness: 0.6 }),
      ceiling: new MeshStandardMaterial({ color: "#24160c", roughness: 0.9 }),
    }),
    [panelling],
  );

  return (
    <RoomShell room={room} {...materials}>
      <pointLight position={[0, 3.6, room.length * 0.3]} intensity={10} distance={12} decay={1.6} color="#ffd8a0" />
      <pointLight position={[0, 3.6, room.length * 0.8]} intensity={10} distance={12} decay={1.6} color="#ffd8a0" />
      {room.installations.map((item, index) => (
        <Placed key={index} pose={item.pose}>
          <TrophyInstallation item={item} room={room} />
        </Placed>
      ))}
    </RoomShell>
  );
}

function TrophyInstallation({ item, room }: { item: Installation; room: RoomLayout }) {
  const number = (id: string) => room.numbers[id] ?? "";
  switch (item.type) {
    case "intro":
      return <RoomIntro room={room} ink={PALE} muted={MUTED} accent={ACCENT} />;
    case "cabinet":
      return <Cabinet achievements={item.achievements} number={number} />;
    case "degree":
      return <DegreePlinth achievement={item.achievement} number={number(item.achievement.id)} />;
    default:
      return null;
  }
}

function Cabinet({ achievements, number }: { achievements: Achievement[]; number: (id: string) => string }) {
  const { width: w, height: h, depth: d } = CABINET;
  return (
    <group>
      <group onClick={blockClick}>
        <mesh position={[0, h / 2, 0.02]} material={DARK_WOOD}>
          <boxGeometry args={[w, h, 0.04]} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[(side * w) / 2, h / 2, d / 2]} material={DARK_WOOD}>
            <boxGeometry args={[0.05, h, d]} />
          </mesh>
        ))}
        <mesh position={[0, h, d / 2]} material={DARK_WOOD}>
          <boxGeometry args={[w + 0.05, 0.08, d]} />
        </mesh>
        <mesh position={[0, 0.12, d / 2]} material={DARK_WOOD}>
          <boxGeometry args={[w, 0.24, d]} />
        </mesh>
        {CABINET.shelves.map((y) => (
          <mesh key={y} position={[0, y - 0.015, d / 2]} material={BRASS}>
            <boxGeometry args={[w - 0.06, 0.03, d - 0.04]} />
          </mesh>
        ))}
        <mesh position={[0, h - 0.06, d / 2]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[w - 0.1, d - 0.1]} />
          <meshBasicMaterial color={[2, 1.6, 1.1]} toneMapped={false} />
        </mesh>
      </group>
      <mesh position={[0, (h + 0.24) / 2, d]}>
        <planeGeometry args={[w, h - 0.24]} />
        <meshStandardMaterial color="#cfe8ff" transparent opacity={0.08} roughness={0} depthWrite={false} />
      </mesh>
      {achievements.map((achievement, index) => {
        const offset = cabinetOffset(index);
        return (
          <group key={achievement.id} position={[offset.x, offset.y, d / 2]}>
            <TrophyPiece achievement={achievement} />
            <group position={[0, -0.045, d / 2 - 0.01]}>
              <Plaque achievement={achievement} number={number(achievement.id)} />
            </group>
          </group>
        );
      })}
    </group>
  );
}

/** A small engraved plate hung from the shelf edge under each piece. */
function Plaque({ achievement, number }: { achievement: Achievement; number: string }) {
  const { handlers } = useExhibitEvents(achievement.id);
  return (
    <group {...handlers}>
      <TextCard
        width={0.56}
        padding={0.025}
        color="#c9a45c"
        lines={[
          { text: number, style: "eyebrow", size: 0.016, color: "#5a3a12" },
          { text: achievementLabel(achievement), style: "label", size: 0.022, color: ENGRAVING, gap: 0.3 },
        ]}
      />
    </group>
  );
}

function TrophyPiece({ achievement }: { achievement: Achievement }) {
  const { hovered, handlers } = useExhibitEvents(achievement.id);
  return (
    <group {...handlers} scale={hovered ? 1.1 : 1}>
      {achievement.kind === "award" ? <Medal /> : <SmallCup topic={achievement.topic} />}
    </group>
  );
}

function SmallCup({ topic }: { topic?: AchievementTopic }) {
  return (
    <group>
      <mesh position-y={0.035} material={DARK_WOOD}>
        <boxGeometry args={[0.24, 0.07, 0.18]} />
      </mesh>
      <mesh position-y={0.07} scale={0.22} material={BRASS}>
        <latheGeometry args={[CUP_PROFILE, 32]} />
      </mesh>
      <group position-y={0.34}>
        <Topper topic={topic} />
      </group>
    </group>
  );
}

function Medal() {
  return (
    <group>
      <mesh position-y={0.02} material={DARK_WOOD}>
        <boxGeometry args={[0.22, 0.04, 0.12]} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.035, 0.28, 0]} rotation-z={side * 0.3}>
          <boxGeometry args={[0.045, 0.2, 0.004]} />
          <meshStandardMaterial color={side < 0 ? "#b8322a" : "#1d7a3e"} roughness={0.7} />
        </mesh>
      ))}
      <mesh position-y={0.14} rotation-x={Math.PI / 2} material={GOLD}>
        <cylinderGeometry args={[0.085, 0.085, 0.016, 32]} />
      </mesh>
    </group>
  );
}

/** A small emblem on top of a cup, chosen by the achievement's topic. */
function Topper({ topic }: { topic?: AchievementTopic }) {
  switch (topic) {
    case "data":
      return (
        <group position-y={-0.02}>
          {[0.06, 0.1, 0.08].map((h, i) => (
            <mesh key={i} position={[(i - 1) * 0.035, h / 2, 0]} material={GOLD}>
              <boxGeometry args={[0.025, h, 0.025]} />
            </mesh>
          ))}
        </group>
      );
    case "sql":
      return (
        <group>
          {[0, 0.03, 0.06].map((y) => (
            <mesh key={y} position-y={y} material={GOLD}>
              <cylinderGeometry args={[0.045, 0.045, 0.022, 24]} />
            </mesh>
          ))}
        </group>
      );
    case "ai":
      return (
        <mesh position-y={0.04} material={GOLD}>
          <octahedronGeometry args={[0.05]} />
        </mesh>
      );
    case "cloud":
      return (
        <group position-y={0.03}>
          {[
            [-0.035, 0, 0.03],
            [0.035, 0, 0.03],
            [0, 0.025, 0.04],
          ].map(([x, y, r], i) => (
            <mesh key={i} position={[x, y, 0]} material={GOLD}>
              <sphereGeometry args={[r, 16, 16]} />
            </mesh>
          ))}
        </group>
      );
    case "network":
      return (
        <mesh position-y={0.045} material={GOLD}>
          <icosahedronGeometry args={[0.05]} />
        </mesh>
      );
    case "security":
      return (
        <mesh position-y={0.045} material={GOLD}>
          <dodecahedronGeometry args={[0.048]} />
        </mesh>
      );
    case "mobile":
      return (
        <mesh position-y={0.05} material={GOLD}>
          <boxGeometry args={[0.05, 0.09, 0.012]} />
        </mesh>
      );
    case "frontend":
      return (
        <mesh position-y={0.05} material={GOLD}>
          <torusGeometry args={[0.035, 0.012, 12, 32]} />
        </mesh>
      );
    default:
      return (
        <mesh position-y={0.04} material={GOLD}>
          <sphereGeometry args={[0.04, 20, 20]} />
        </mesh>
      );
  }
}

function DegreePlinth({ achievement, number }: { achievement: Achievement; number: string }) {
  const { hovered, handlers } = useExhibitEvents(achievement.id);
  return (
    <group {...handlers}>
      <mesh position-y={0.55} material={DARK_WOOD}>
        <boxGeometry args={[0.8, 1.1, 0.8]} />
      </mesh>
      <mesh position={[0, 0.8, 0.402]} material={PLATE}>
        <planeGeometry args={[0.66, 0.36]} />
      </mesh>
      <group position={[0, 0.8, 0.405]}>
        <TextStack
          width={0.56}
          align="center"
          anchor="middle"
          lines={[
            { text: `${number} · Degree`, style: "eyebrow", size: 0.022, color: "#5a3a12" },
            { text: achievement.title, style: "display", size: 0.062, color: ENGRAVING, gap: 0.35 },
            { text: achievement.issuer, style: "italic", size: 0.03, color: "#5a3a12", gap: 0.3 },
          ]}
        />
      </group>
      <group position-y={1.1} scale={hovered ? 1.06 : 1}>
        <mesh scale={0.5} material={GOLD}>
          <latheGeometry args={[CUP_PROFILE, 48]} />
        </mesh>
        <group position-y={0.52} rotation-y={Math.PI / 4}>
          <mesh material={DARK_WOOD}>
            <boxGeometry args={[0.24, 0.018, 0.24]} />
          </mesh>
          <mesh position-y={-0.035} material={DARK_WOOD}>
            <cylinderGeometry args={[0.07, 0.07, 0.06, 20]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
