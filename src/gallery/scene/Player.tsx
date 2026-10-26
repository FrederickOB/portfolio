import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import { EYE_HEIGHT, clampToWalkable, type Waypoint } from "../layout";
import { pose, useGallery } from "../store";

const WALK_SPEED = 3.2;
const GLIDE_SPEED = 4.5;
const TURN_SPEED = 1.8;
const LOOK_SPEED = 0.005;
const PITCH_LIMIT = 0.75;
/** Pixels a pointer has to move before a press counts as a drag rather than a click. */
const DRAG_THRESHOLD = 5;
/** How close to the end of a route the visitor starts turning to face the exhibit. */
const SETTLE_DISTANCE = 2.5;

const KEYS = {
  forward: ["KeyW", "ArrowUp"],
  back: ["KeyS", "ArrowDown"],
  left: ["KeyA"],
  right: ["KeyD"],
  turnLeft: ["ArrowLeft", "KeyQ"],
  turnRight: ["ArrowRight", "KeyE"],
};
const MOVEMENT_KEYS = new Set(Object.values(KEYS).flat());

function angleDelta(from: number, to: number) {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

/** The visitor: turns pointer drags, keys and routes into camera movement. */
export function Player() {
  const camera = useThree((state) => state.camera);
  const canvas = useThree((state) => state.gl.domElement);
  const pressed = useRef(new Set<string>());
  const route = useRef({ id: -1, index: 0 });

  useEffect(() => {
    let drag: { x: number; y: number; dragging: boolean } | null = null;

    const onPointerDown = (event: PointerEvent) => {
      drag = { x: event.clientX, y: event.clientY, dragging: false };
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!drag) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (!drag.dragging && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      if (!drag.dragging) {
        drag.dragging = true;
        useGallery.getState().takeControl();
      }
      drag.x = event.clientX;
      drag.y = event.clientY;
      pose.yaw += dx * LOOK_SPEED;
      pose.pitch = MathUtils.clamp(pose.pitch + dy * LOOK_SPEED, -PITCH_LIMIT, PITCH_LIMIT);
    };
    const onPointerUp = () => {
      drag = null;
    };

    const typing = (event: KeyboardEvent) =>
      event.target instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName);
    const onKeyDown = (event: KeyboardEvent) => {
      if (typing(event)) return;
      if (event.code === "Escape") useGallery.getState().focus(null);
      if (MOVEMENT_KEYS.has(event.code)) {
        event.preventDefault();
        pressed.current.add(event.code);
      }
    };
    const onKeyUp = (event: KeyboardEvent) => pressed.current.delete(event.code);
    const onBlur = () => pressed.current.clear();

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [canvas]);

  useFrame((_, frameDelta) => {
    const delta = Math.min(frameDelta, 0.1);
    const state = useGallery.getState();
    const held = (codes: string[]) => (codes.some((code) => pressed.current.has(code)) ? 1 : 0);
    const forward = held(KEYS.forward) - held(KEYS.back);
    const strafe = held(KEYS.right) - held(KEYS.left);
    const turn = held(KEYS.turnLeft) - held(KEYS.turnRight);

    if (forward || strafe || turn) {
      state.takeControl();
      pose.yaw += turn * TURN_SPEED * delta;
      const length = Math.hypot(forward, strafe) || 1;
      const step = (WALK_SPEED * delta) / length;
      const x = pose.x + (-Math.sin(pose.yaw) * forward + Math.cos(pose.yaw) * strafe) * step;
      const z = pose.z + (-Math.cos(pose.yaw) * forward - Math.sin(pose.yaw) * strafe) * step;
      if (state.layout) Object.assign(pose, clampToWalkable(state.layout, x, z, pose.x, pose.z));
    } else if (state.route) {
      followRoute(state.route, state.routeId, delta, route.current, state.arrive);
    }

    camera.position.set(pose.x, EYE_HEIGHT, pose.z);
    camera.rotation.set(pose.pitch, pose.yaw, 0, "YXZ");
  });

  return null;
}

function followRoute(
  waypoints: Waypoint[],
  routeId: number,
  delta: number,
  progress: { id: number; index: number },
  arrive: () => void,
) {
  if (progress.id !== routeId) {
    progress.id = routeId;
    progress.index = 0;
  }
  const target = waypoints[progress.index];
  const isLast = progress.index === waypoints.length - 1;
  const dx = target.x - pose.x;
  const dz = target.z - pose.z;
  const distance = Math.hypot(dx, dz);

  // Ease into the final stop instead of halting at full speed.
  const speed = GLIDE_SPEED * (isLast ? MathUtils.clamp(distance / 1.2, 0.2, 1) : 1);
  const step = Math.min(distance, speed * delta);
  if (distance > 1e-4) {
    pose.x += (dx / distance) * step;
    pose.z += (dz / distance) * step;
  }

  const settling = isLast && distance < SETTLE_DISTANCE;
  const yaw = settling && target.yaw !== undefined ? target.yaw : distance > 0.05 ? Math.atan2(-dx, -dz) : pose.yaw;
  const pitch = settling && target.pitch !== undefined ? target.pitch : 0;
  const ease = 1 - Math.exp(-6 * delta);
  pose.yaw += angleDelta(pose.yaw, yaw) * ease;
  pose.pitch += (pitch - pose.pitch) * ease;

  if (distance < 0.02) {
    if (!isLast) progress.index++;
    else if (target.yaw === undefined || Math.abs(angleDelta(pose.yaw, target.yaw)) < 0.01) arrive();
  }
}
