import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as easing from "maath/easing";

/**
 * Subtle camera life: cursor-aware parallax drift + slow breathing sway.
 * Only translates the camera (~1% of scene scale) — orientation is never
 * touched, so the approved composition stays identical.
 */
export function CameraRig({ enabled }: { enabled: boolean }) {
  const basePos = useRef<THREE.Vector3 | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  useFrame((state, delta) => {
    if (!enabled) return;
    const cam = state.camera;
    if (!basePos.current) basePos.current = cam.position.clone();

    const breathe = Math.sin(state.clock.elapsedTime * 0.18) * 0.035;
    easing.damp3(
      cam.position,
      [
        basePos.current.x + pointer.current.x * 0.09,
        basePos.current.y + pointer.current.y * 0.06 + breathe,
        basePos.current.z,
      ],
      0.9,
      delta
    );
  });

  return null;
}
