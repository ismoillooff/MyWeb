import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { DofPointsMaterial } from "./shaders/pointMaterial";
import * as easing from "maath/easing";

export function Particles({
  speed,
  aperture,
  focus,
  size = 256,
  noiseScale = 1.0,
  noiseIntensity = 0.5,
  timeScale = 0.5,
  pointSize = 2.0,
  opacity = 1.0,
  planeScale = 1.0,
  introspect = false,
  ...props
}: {
  speed: number;
  aperture: number;
  focus: number;
  size: number;
  noiseScale?: number;
  noiseIntensity?: number;
  timeScale?: number;
  pointSize?: number;
  opacity?: number;
  planeScale?: number;
  introspect?: boolean;
}) {
  const revealStartTime = useRef<number | null>(null);
  const revealDuration = 3.5;

  const material = useMemo(
    () => new DofPointsMaterial(size, planeScale),
    [size, planeScale]
  );

  useEffect(() => {
    return () => {
      material.uniforms.positions.value?.dispose?.();
      material.dispose();
    };
  }, [material]);

  // Each vertex stores its own UV into the positions texture
  const particles = useMemo(() => {
    const length = size * size;
    const data = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      const i3 = i * 3;
      data[i3 + 0] = (i % size) / size;
      data[i3 + 1] = i / size / size;
    }
    return data;
  }, [size]);

  useFrame((state, delta) => {
    const currentTime = state.clock.elapsedTime;

    if (revealStartTime.current === null) {
      revealStartTime.current = currentTime;
    }

    const revealElapsed = currentTime - revealStartTime.current;
    const revealProgress = Math.min(revealElapsed / revealDuration, 1.0);
    const easedProgress = 1 - Math.pow(1 - revealProgress, 3);

    const u = material.uniforms;
    u.uTime.value = currentTime;
    u.uFocus.value = focus;
    u.uBlur.value = aperture;
    u.uNoiseScale.value = noiseScale;
    u.uNoiseIntensity.value = noiseIntensity;
    u.uTimeScale.value = timeScale * speed;
    u.uPointSize.value = pointSize;
    u.uOpacity.value = opacity;
    u.uRevealFactor.value = easedProgress * 4.0;
    u.uRevealProgress.value = easedProgress;

    easing.damp(
      u.uTransition,
      "value",
      introspect ? 1.0 : 0.0,
      introspect ? 0.35 : 0.2,
      delta
    );
  });

  return (
    // @ts-ignore
    <points material={material} {...props}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
    </points>
  );
}
