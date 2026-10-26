import { INTRO, type RoomLayout } from "../layout";
import { SYMBOLS } from "../symbols";
import { SymbolMark } from "./adinkra";
import { useExhibitEvents } from "./common";
import { TextStack } from "./type";

/** The wall text at a room's entrance: its symbol, name, what the symbol means, and the statement. */
export function RoomIntro({
  room,
  ink,
  muted,
  accent,
}: {
  room: RoomLayout;
  ink: string;
  muted: string;
  accent: string;
}) {
  const symbol = SYMBOLS[room.symbol];
  const { handlers } = useExhibitEvents(`${room.id}-intro`);
  return (
    <group position={[INTRO.nudge, INTRO.top, 0.01]}>
      {/* Hidden, but still clickable: a target over the whole intro. */}
      <mesh position={[0, -0.85, -0.005]} visible={false} {...handlers}>
        <planeGeometry args={[INTRO.width + 0.3, 2]} />
      </mesh>
      <SymbolMark id={room.symbol} color={accent} size={0.46} position={[-INTRO.width / 2 + 0.23, -0.23, 0]} />
      <group position-y={-0.62}>
        <TextStack
          width={INTRO.width}
          lines={[
            { text: room.eyebrow, style: "eyebrow", size: 0.05, color: accent },
            { text: room.title, style: "display", size: 0.44, color: ink, gap: 0.3 },
            { text: `${symbol.name}, “${symbol.translation}”. ${symbol.meaning}`, style: "italic", size: 0.068, color: muted, gap: 0.55 },
            { text: room.statement, style: "body", size: 0.064, color: ink, gap: 1.3 },
          ]}
        />
      </group>
    </group>
  );
}
