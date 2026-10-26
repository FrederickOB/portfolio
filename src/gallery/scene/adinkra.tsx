import { use, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";
import { SYMBOL_IDS, symbolSvg, type SymbolId } from "../symbols";

/** An Adinkra symbol stamped flat onto a surface, like ink on cloth. */
export function SymbolMark({
  id,
  color,
  size,
  position,
  rotation,
}: {
  id: SymbolId;
  color: string;
  size: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const texture = useTexture(symbolSvg(id, color), (t) => {
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = 8;
  });
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial map={texture} transparent alphaTest={0.4} roughness={0.85} />
    </mesh>
  );
}

const FRIEZE_CELL = 128;
const friezes = new Map<string, Promise<CanvasTexture>>();

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

/**
 * A strip of all nine symbols separated by stitched comb lines, the way
 * Adinkra cloth is stamped in bands. Drawn once per colour pair.
 */
async function drawFrieze(ink: string, thread: string) {
  const images = await Promise.all(SYMBOL_IDS.map((id) => loadImage(symbolSvg(id, ink, 256))));
  const canvas = document.createElement("canvas");
  canvas.width = FRIEZE_CELL * images.length;
  canvas.height = FRIEZE_CELL;
  const ctx = canvas.getContext("2d")!;
  const inset = FRIEZE_CELL * 0.2;

  ctx.fillStyle = thread;
  ctx.fillRect(0, 2, canvas.width, 3);
  ctx.fillRect(0, FRIEZE_CELL - 5, canvas.width, 3);
  images.forEach((image, i) => {
    const x = i * FRIEZE_CELL;
    for (const dx of [-6, 0, 6]) ctx.fillRect(x + dx - 1, 14, 2, FRIEZE_CELL - 28);
    ctx.drawImage(image, x + inset, inset, FRIEZE_CELL - inset * 2, FRIEZE_CELL - inset * 2);
  });

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

/** A frieze band `length` metres long; each stamp is a square `height` tall. */
export function Frieze({
  length,
  height,
  ink,
  thread,
  position,
  rotationY = 0,
}: {
  length: number;
  height: number;
  ink: string;
  thread: string;
  position: [number, number, number];
  rotationY?: number;
}) {
  const key = `${ink}|${thread}`;
  if (!friezes.has(key)) friezes.set(key, drawFrieze(ink, thread));
  const source = use(friezes.get(key)!);
  const texture = useMemo(() => {
    const t = source.clone();
    t.repeat.set(length / (height * SYMBOL_IDS.length), 1);
    t.needsUpdate = true;
    return t;
  }, [source, length, height]);

  return (
    <mesh position={position} rotation-y={rotationY}>
      <planeGeometry args={[length, height]} />
      <meshStandardMaterial map={texture} transparent alphaTest={0.3} roughness={0.9} />
    </mesh>
  );
}

