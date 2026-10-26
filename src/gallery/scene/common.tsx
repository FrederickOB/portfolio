import { useMemo, useState } from "react";
import { useCursor, useTexture } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { SRGBColorSpace, type Material, type Texture } from "three";
import { sizedImage } from "@/lib/images";
import { ROOM, WALL_THICKNESS, type RoomLayout } from "../layout";
import { useGallery } from "../store";

/** A click that started a drag (looking around) shouldn't also count as a click. */
const isDrag = (event: ThreeEvent<MouseEvent>) => event.delta > 6;

/** Walls and fittings swallow clicks so the floor behind them can't be clicked through. */
export const blockClick = (event: ThreeEvent<MouseEvent>) => event.stopPropagation();

export function useExhibitEvents(id: string) {
  const [hovered, setHovered] = useState(false);
  const focused = useGallery((state) => state.focusedId === id);
  useCursor(hovered);

  const handlers = useMemo(
    () => ({
      onClick: (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        if (!isDrag(event)) useGallery.getState().focus(id);
      },
      onPointerOver: (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        setHovered(true);
      },
      onPointerOut: () => setHovered(false),
    }),
    [id],
  );

  return { hovered, focused, handlers };
}

/** A work's image from Cloudinary, sized for how large it hangs. */
export function useWorkImage(url: string, width: number): Texture {
  return useTexture(sizedImage(url, width), (texture) => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 8;
  });
}

export function imageAspect(texture: Texture) {
  const image = texture.image as { width: number; height: number };
  return image.width / image.height;
}

/** Fits an image of the given aspect inside a box, keeping its proportions. */
export function fit(aspect: number, maxWidth: number, maxHeight: number) {
  return aspect > maxWidth / maxHeight
    ? { w: maxWidth, h: maxWidth / aspect }
    : { w: maxHeight * aspect, h: maxHeight };
}

/** Crops a texture to fill a box of the given aspect, keeping the top of tall images. */
export function useCoverTexture(texture: Texture, aspect: number) {
  return useMemo(() => {
    const cropped = texture.clone();
    const source = imageAspect(texture);
    if (source > aspect) {
      cropped.repeat.set(aspect / source, 1);
      cropped.offset.set((1 - cropped.repeat.x) / 2, 0);
    } else {
      cropped.repeat.set(1, source / aspect);
      cropped.offset.set(0, 1 - cropped.repeat.y);
    }
    cropped.needsUpdate = true;
    return cropped;
  }, [texture, aspect]);
}

interface WallProps {
  length: number;
  height: number;
  material: Material;
  /** A centred doorway. */
  door?: { width: number; height: number };
  position: [number, number, number];
  rotationY?: number;
}

/** A wall running along its local x axis, standing on the floor. */
export function Wall({ length, height, material, door, position, rotationY = 0 }: WallProps) {
  const pieces = door
    ? [
        { x: -(length + door.width) / 4, y: height / 2, w: (length - door.width) / 2, h: height },
        { x: (length + door.width) / 4, y: height / 2, w: (length - door.width) / 2, h: height },
        { x: 0, y: (height + door.height) / 2, w: door.width, h: height - door.height },
      ]
    : [{ x: 0, y: height / 2, w: length, h: height }];

  return (
    <group position={position} rotation-y={rotationY}>
      {pieces.map((piece, index) => (
        <mesh key={index} position={[piece.x, piece.y, 0]} material={material} onClick={blockClick}>
          <boxGeometry args={[piece.w, piece.h, WALL_THICKNESS]} />
        </mesh>
      ))}
    </group>
  );
}

/** A floor that walks the visitor to wherever they click. */
export function Floor({
  width,
  depth,
  material,
  position,
}: {
  width: number;
  depth: number;
  material: Material;
  position: [number, number, number];
}) {
  return (
    <mesh
      position={position}
      rotation-x={-Math.PI / 2}
      material={material}
      onClick={(event) => {
        event.stopPropagation();
        if (!isDrag(event)) useGallery.getState().walkToPoint(event.point.x, event.point.z);
      }}
    >
      <planeGeometry args={[width, depth]} />
    </mesh>
  );
}

/**
 * A room's floor, walls and ceiling, placed and turned so that its local +z
 * runs from the lobby doorway into the room. The lobby wall closes the open end.
 */
export function RoomShell({
  room,
  floor,
  walls,
  ceiling,
  children,
}: {
  room: RoomLayout;
  floor: Material;
  walls: Material;
  ceiling: Material;
  children?: React.ReactNode;
}) {
  const { length } = room;
  // Side walls start at the middle of the lobby wall, so their ends stay hidden inside it.
  const sideLength = length + WALL_THICKNESS / 2;
  return (
    <group position={[room.origin.x, 0, room.origin.z]} rotation-y={room.rotationY}>
      <Floor width={ROOM.width} depth={length} material={floor} position={[0, 0, length / 2]} />
      <Wall
        length={sideLength}
        height={ROOM.height}
        material={walls}
        position={[-ROOM.width / 2, 0, sideLength / 2]}
        rotationY={Math.PI / 2}
      />
      <Wall
        length={sideLength}
        height={ROOM.height}
        material={walls}
        position={[ROOM.width / 2, 0, sideLength / 2]}
        rotationY={Math.PI / 2}
      />
      <Wall length={ROOM.width + WALL_THICKNESS} height={ROOM.height} material={walls} position={[0, 0, length]} />
      <Ceiling width={ROOM.width} depth={length} height={ROOM.height} material={ceiling} position={[0, length / 2]} />
      {children}
    </group>
  );
}

/** Places an installation at its pose inside a room. */
export function Placed({
  pose,
  children,
}: {
  pose: { x: number; y: number; z: number; rotationY: number };
  children: React.ReactNode;
}) {
  return (
    <group position={[pose.x, pose.y, pose.z]} rotation-y={pose.rotationY}>
      {children}
    </group>
  );
}

export function Ceiling({
  width,
  depth,
  height,
  material,
  position,
}: {
  width: number;
  depth: number;
  height: number;
  material: Material;
  position: [number, number];
}) {
  return (
    <mesh position={[position[0], height, position[1]]} rotation-x={Math.PI / 2} material={material} onClick={blockClick}>
      <planeGeometry args={[width, depth]} />
    </mesh>
  );
}
