import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { NeutralToneMapping, type PerspectiveCamera } from "three";
import type { Experience } from "@/content/types";
import { CAMERA_FOV, EYE_HEIGHT, fieldOfView, type GalleryLayout, type RoomId } from "./layout";
import { InterfaceRoom } from "./scene/InterfaceRoom";
import { Lobby } from "./scene/Lobby";
import { Player } from "./scene/Player";
import { SignalRoom } from "./scene/SignalRoom";
import { TrophyRoom } from "./scene/TrophyRoom";
import { pose } from "./store";

/** Widens the view on portrait screens as the window changes shape. */
function ResponsiveFov() {
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const aspect = useThree((state) => state.size.width / state.size.height);
  useEffect(() => {
    camera.fov = fieldOfView(aspect);
    camera.updateProjectionMatrix();
  }, [camera, aspect]);
  return null;
}

/** Mounts once everything above it has finished loading (fonts, textures). */
function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

export function GalleryScene({
  layout,
  experience,
  onReady,
}: {
  layout: GalleryLayout;
  experience: Experience[];
  onReady: () => void;
}) {
  // The bloom pass is the most expensive part of a frame; drop it on devices that struggle.
  const [effects, setEffects] = useState(true);
  const room = (id: RoomId) => layout.rooms.find((r) => r.id === id)!;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: CAMERA_FOV, near: 0.05, far: 120, position: [pose.x, EYE_HEIGHT, pose.z] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        // Keeps screenshots close to their true colours, unlike the default filmic curve.
        gl.toneMapping = NeutralToneMapping;
      }}
      style={{ touchAction: "none" }}
    >
      <color attach="background" args={["#1a120c"]} />
      <hemisphereLight args={["#fff4e6", "#3b2a1f", 0.9]} />
      <directionalLight position={[6, 14, 10]} intensity={0.6} />
      <Environment resolution={128} frames={1} environmentIntensity={0.5}>
        <Lightformer form="rect" intensity={2.5} position={[0, 6, -6]} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#ffd6a0" position={[-8, 3, 6]} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#9ad7ff" position={[8, 4, 0]} scale={3} />
      </Environment>

      <Suspense fallback={null}>
        <Lobby rooms={layout.rooms} experience={experience} />
        <InterfaceRoom room={room("interface")} />
        <SignalRoom room={room("signal")} />
        <TrophyRoom room={room("trophy")} />
        <SceneReady onReady={onReady} />
      </Suspense>

      <Player />
      <ResponsiveFov />
      <PerformanceMonitor onDecline={() => setEffects(false)} />
      {effects && (
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur luminanceThreshold={1} intensity={0.8} />
          <ToneMapping mode={ToneMappingMode.NEUTRAL} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
