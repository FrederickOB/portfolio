import { useEffect, useMemo } from "react";
import { CanvasTexture, RepeatWrapping, SRGBColorSpace, type Texture } from "three";

/**
 * Surface textures drawn in code, so the architecture downloads nothing.
 * Patterns use a seeded random, so they look the same on every visit.
 */

type Draw = (ctx: CanvasRenderingContext2D, size: number, random: () => number) => void;

function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawTexture(size: number, draw: Draw): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  draw(canvas.getContext("2d")!, size, seededRandom(size));
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

const terrazzo: Draw = (ctx, size, random) => {
  ctx.fillStyle = "#ece6dc";
  ctx.fillRect(0, 0, size, size);
  const chips = ["#c8b6a2", "#9a9590", "#d9a441", "#4e7f6a", "#b5543c", "#ffffff"];
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = chips[Math.floor(random() * chips.length)];
    ctx.beginPath();
    const r = 1 + random() * (random() > 0.92 ? 7 : 3);
    ctx.ellipse(random() * size, random() * size, r, r * (0.5 + random() * 0.5), random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
};

/** Warp stripes alternating with weft blocks, in Kente's gold, green, red and black. */
const kente: Draw = (ctx, size) => {
  const gold = "#e3a812";
  const green = "#1d7a3e";
  const red = "#b8322a";
  const black = "#17120e";
  const block = size / 4;
  for (let col = 0; col < 4; col++) {
    const x = col * block;
    if (col % 2 === 0) {
      const stripes = [gold, black, gold, green, gold, red, gold, black];
      const w = block / stripes.length;
      stripes.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(x + i * w, 0, w, size);
      });
    } else {
      const rows = 8;
      const h = size / rows;
      for (let row = 0; row < rows; row++) {
        ctx.fillStyle = row % 2 === 0 ? green : gold;
        ctx.fillRect(x, row * h, block, h);
        ctx.fillStyle = row % 2 === 0 ? red : black;
        ctx.fillRect(x, row * h + h * 0.42, block, h * 0.16);
      }
    }
  }
};

const laterite: Draw = (ctx, size, random) => {
  const tiles = 4;
  const tile = size / tiles;
  for (let row = 0; row < tiles; row++) {
    for (let col = 0; col < tiles; col++) {
      const shade = 0.9 + random() * 0.2;
      ctx.fillStyle = `rgb(${Math.round(150 * shade)}, ${Math.round(74 * shade)}, ${Math.round(46 * shade)})`;
      ctx.fillRect(col * tile, row * tile, tile, tile);
    }
  }
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = random() > 0.5 ? "rgba(60, 24, 12, 0.18)" : "rgba(255, 210, 170, 0.12)";
    ctx.fillRect(random() * size, random() * size, 1 + random() * 2, 1 + random() * 2);
  }
  ctx.strokeStyle = "rgba(70, 30, 16, 0.55)";
  ctx.lineWidth = 3;
  for (let i = 0; i <= tiles; i++) {
    ctx.beginPath();
    ctx.moveTo(i * tile, 0);
    ctx.lineTo(i * tile, size);
    ctx.moveTo(0, i * tile);
    ctx.lineTo(size, i * tile);
    ctx.stroke();
  }
};

const wood: Draw = (ctx, size, random) => {
  ctx.fillStyle = "#5c3a21";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 90; i++) {
    const x = random() * size;
    ctx.strokeStyle = random() > 0.5 ? "rgba(30, 16, 8, 0.25)" : "rgba(140, 92, 52, 0.18)";
    ctx.lineWidth = 1 + random() * 2;
    ctx.beginPath();
    for (let y = 0; y <= size; y += 8) {
      ctx.lineTo(x + Math.sin(y / 40 + i) * 3, y);
    }
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(20, 10, 4, 0.6)";
  for (let x = 0; x <= size; x += size / 2) ctx.fillRect(x - 2, 0, 4, size);
};

const concrete: Draw = (ctx, size, random) => {
  ctx.fillStyle = "#121722";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 3000; i++) {
    const light = random() > 0.5;
    ctx.fillStyle = light ? "rgba(120, 140, 180, 0.05)" : "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(random() * size, random() * size, 1 + random() * 3, 1 + random() * 3);
  }
};

const SURFACES = { terrazzo, kente, laterite, wood, concrete } as const;
const SIZES: Record<keyof typeof SURFACES, number> = {
  terrazzo: 512,
  kente: 256,
  laterite: 512,
  wood: 512,
  concrete: 256,
};

/** A surface texture repeated across `repeat` tiles, disposed with the component. */
export function useSurface(name: keyof typeof SURFACES, repeatX: number, repeatY: number): Texture {
  const texture = useMemo(() => {
    const t = drawTexture(SIZES[name], SURFACES[name]);
    t.repeat.set(repeatX, repeatY);
    return t;
  }, [name, repeatX, repeatY]);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

/** A stable pick from a palette, so the same work always gets the same colour. */
export function pickColor(id: string, palette: readonly string[]) {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return palette[Math.abs(hash) % palette.length];
}
